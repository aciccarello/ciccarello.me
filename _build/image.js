import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { parse } from 'node-html-parser';

function isVideoSource(src) {
	return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src || '');
}

function getSmallestSrcFromSrcset(srcset) {
	if (!srcset) {
		return null;
	}

	const candidates = srcset
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean)
		.map((entry) => {
			const [url, descriptor] = entry.split(/\s+/);
			const width = Number.parseInt(
				(descriptor || '').replace('w', ''),
				10,
			);
			return {
				url,
				width: Number.isFinite(width) ? width : Number.MAX_SAFE_INTEGER,
			};
		})
		.filter((entry) => entry.url);

	if (!candidates.length) {
		return null;
	}

	candidates.sort((a, b) => a.width - b.width);
	return candidates[0].url;
}

function parseSrcsetCandidates(srcset) {
	if (!srcset) {
		return [];
	}

	return srcset
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean)
		.map((entry) => {
			const [url, descriptor] = entry.split(/\s+/);
			const width = Number.parseInt(
				(descriptor || '').replace('w', ''),
				10,
			);

			return {
				url,
				descriptor,
				width: Number.isFinite(width)
					? width
					: Number.MAX_SAFE_INTEGER,
			};
		})
		.filter((entry) => entry.url);
}

function stringifySrcsetCandidates(candidates) {
	return candidates
		.map((entry) =>
			entry.descriptor ? `${entry.url} ${entry.descriptor}` : entry.url,
		)
		.join(', ');
}

function appendStyle(existingStyle, newStyle) {
	if (!existingStyle) {
		return newStyle;
	}

	return `${existingStyle.trim().replace(/;?$/, ';')} ${newStyle}`;
}

function isLikelyTransparentImage(src) {
	return /\.(png|apng|gif|svg)(\?.*)?$/i.test(src || '');
}

export default function (eleventyConfig) {
	eleventyConfig.addFilter('isVideoSource', (src) => isVideoSource(src));

	// Keep non-image sources out of the image transform.
	eleventyConfig.htmlTransformer.addPosthtmlPlugin(
		'html',
		() => (tree) => {
			tree.match({ tag: 'img' }, (imgNode) => {
				const src = imgNode?.attrs?.src;
				if (isVideoSource(src)) {
					imgNode.attrs = {
						...imgNode.attrs,
						'eleventy:ignore': true,
					};
				}

				return imgNode;
			});

			return tree;
		},
		{ priority: -2 },
	);

	eleventyConfig.addTransform('lqip-placeholders', (content, outputPath) => {
		if (!outputPath || !outputPath.endsWith('.html')) {
			return content;
		}

		const root = parse(content, {
			comment: true,
			script: true,
			style: true,
		});
		let didUpdate = false;

		for (const pictureNode of root.querySelectorAll('picture')) {
			const imgNode = pictureNode.querySelector('img');
			if (!imgNode || imgNode.getAttribute('loading') === 'eager') {
				continue;
			}

			if (isLikelyTransparentImage(imgNode.getAttribute('src'))) {
				continue;
			}

			const sourceNode = pictureNode.querySelector('source[srcset]');
			const sourceCandidates = parseSrcsetCandidates(
				sourceNode?.getAttribute('srcset'),
			);
			if (!sourceCandidates.length) {
				continue;
			}

			sourceCandidates.sort((a, b) => a.width - b.width);
			const [smallestSource, ...remainingSourceCandidates] = sourceCandidates;
			const lqipSrc = smallestSource?.url;
			if (!lqipSrc) {
				continue;
			}

			if (sourceNode && remainingSourceCandidates.length) {
				sourceNode.setAttribute(
					'srcset',
					stringifySrcsetCandidates(remainingSourceCandidates),
				);
			}

			const imgSrcsetCandidates = parseSrcsetCandidates(
				imgNode.getAttribute('srcset'),
			);
			const remainingImgCandidates = imgSrcsetCandidates.filter(
				(entry) => entry.width > smallestSource.width,
			);

			if (remainingImgCandidates.length) {
				imgNode.setAttribute(
					'srcset',
					stringifySrcsetCandidates(remainingImgCandidates),
				);

				const currentSrc = imgNode.getAttribute('src');
				if (
					!currentSrc ||
					currentSrc === smallestSource.url ||
					imgSrcsetCandidates.some(
						(entry) =>
							entry.url === currentSrc &&
							entry.width <= smallestSource.width,
					)
				) {
					const [nextFallback] = remainingImgCandidates;
					if (nextFallback?.url) {
						imgNode.setAttribute('src', nextFallback.url);
					}
				}
			}

			const className = pictureNode.getAttribute('class') || '';
			if (!className.includes('lqip-picture')) {
				pictureNode.setAttribute(
					'class',
					`${className} lqip-picture`.trim(),
				);
			}

			pictureNode.setAttribute(
				'style',
				appendStyle(
					pictureNode.getAttribute('style'),
					`--lqip:url('${lqipSrc}');`,
				),
			);

			didUpdate = true;
		}

		return didUpdate ? root.toString() : content;
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		widths: [16, 512, 1024, 2048, 'auto'],
		formats: ['webp', 'jpeg', 'auto'],
		outputDir: './_site/assets/img/optimized/',
		urlPath: '/assets/img/optimized/',
		cacheOptions: {
			directory: '.cache/eleventy-img',
			removeUrlQueryParams: false,
		},
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				loading: 'lazy',
				decoding: 'async',
				sizes: 'auto, (max-width: 1024px) 100vw, 1024px',
			},
			pictureAttributes: {},
		},
	});
}

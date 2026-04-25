import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

function isVideoSource(src) {
	return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src || '');
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

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		widths: [512, 1024, 2048, 'auto'],
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

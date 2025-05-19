import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import rssPlugin from '@11ty/eleventy-plugin-rss';
import eleventySyntaxhighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyLightningCssPlugin from '@11tyrocks/eleventy-plugin-lightningcss';
import datePlugin from './_build/date.js';
import markdownPlugin from './_build/markdown.js';
import recipePlugin from './_build/recipe.js';
import tripsPlugin from './_build/trips.js';
import i18nPlugin from './_build/i18n.js';

const require = createRequire(import.meta.url);

/**
 * Primary Eleventy configration function
 *
 * @param   {import('@11ty/eleventy').UserConfig}  eleventyConfig  Eleventy config API
 *
 * @return  {object}                  Eleventy config object for site
 */
export default async function (eleventyConfig) {
	const staticFiles = [
		'admin/index.html',
		'assets/img',
		'assets/js',
		'assets/feed.xsl',
		'favicon.ico',
		'pinterest-60576.html',
		'mywotc6b2477c57f015eaa645.html',
		'BingSiteAuth.xml',
	].map((path) => [path, path]);
	const npmPackages = [
		['webmention.js/static/webmention', 'assets/js/webmention.js'],
		['decap-cms', 'assets/js/decap-cms.js'],
		['@zachleat/pagefind-search', 'assets/js/pagefind-search.js'],
	].map(([packagePath, dest]) => [require.resolve(packagePath), dest]);

	// addPassthroughCopy takes object mapping source -> dest
	eleventyConfig.addPassthroughCopy(
		Object.fromEntries([...staticFiles, ...npmPackages]),
	);

	/**
	 * Map of collection names to glob patterns
	 * @type {Record<string, string>}
	 */
	const collections = {
		articles: 'posts/blog/*.md',
		// recipes added in _build/recipe.js
		notes: 'posts/{notes,listens}/*.md',
		photos: 'posts/photos/*.md',
		links: 'posts/{links,replies}/*.md',
		reviews: 'posts/reviews/*.md',
		activities: 'posts/{eats}/*.md',
		posts: 'posts/**/*.md',
		publicaciones: 'es/posts/*/*.md',
		// trips added in _build/trips.js
	};
	Object.entries(collections).forEach(([collectionName, glob]) =>
		eleventyConfig.addCollection(collectionName, (collection) =>
			collection.getFilteredByGlob(glob),
		),
	);
	eleventyConfig.addCollection('mainPosts', (collection) =>
		collection
			.getFilteredByGlob(collections.posts)
			.filter((page) => !page.data.excludeFromMainFeed),
	);
	eleventyConfig.addCollection('testPosts', async (collection) => {
		let posts = JSON.parse(
			(
				await readFile(new URL('./_data/test.json', import.meta.url))
			).toString(),
		).posts;
		const postUrls = Object.values(posts);

		return collection
			.getAllSorted()
			.filter((page) => postUrls.includes(page.data.page.url));
	});
	eleventyConfig.addCollection('tagList', (collection) => {
		const tagCountMap = new Map();
		collection.getAll().forEach((page) => {
			if (page.data.tags) {
				page.data.tags
					.filter((tag) => !['post', 'all'].includes(tag))
					.forEach((tag) => {
						const currentCount = tagCountMap.get(tag) ?? 0;
						tagCountMap.set(tag, currentCount + 1);
					});
			}
		});
		return Array.from(tagCountMap)
			.sort(([aKey, aValue], [bKey, bValue]) => {
				// Sort by count, then alphabetically
				if (bValue !== aValue) {
					return bValue - aValue;
				}
				return aKey.localeCompare(bKey);
			})
			.map(([key]) => key);
	});
	eleventyConfig.addCollection('pageByUrl', (collection) => {
		return collection.getAll().reduce((containerMap, page) => {
			containerMap[page.url] = page;
			return containerMap;
		});
	});
	eleventyConfig.addPairedShortcode('json', (content) => {
		try {
			const contentMinusTabs = content.replace(/\t/g, '');
			return JSON.stringify(JSON.parse(contentMinusTabs));
		} catch (error) {
			console.warn('Unable to parse json', content);
			throw error;
		}
	});
	eleventyConfig.addFilter('addBaseUrl', (value) => {
		if (!value || value.startsWith('http')) {
			return value;
		}
		return 'https://www.ciccarello.me' + value;
	});
	eleventyConfig.addFilter('joinLines', (value) =>
		value.replace(/\n/gm, ' '),
	);
	eleventyConfig.addFilter('keys', (value) => {
		if (value) {
			return Object.keys(value);
		}
	}); // Helpful for debugging objects
	eleventyConfig.addFilter('sanitizeFeedContent', (content) =>
		content
			.replace(/object-position: \d+% \w+/gm, '')
			// WM sender gets confused by u-url on nested h-cite
			// Would also strip from text from feed but should be rare
			// See https://github.com/remy/wm/issues/62
			.replace(/u-url/gm, ''),
	);
	eleventyConfig.addFilter('extractDomain', (content) =>
		content.split('/').find((segment) => segment.includes('.')),
	);

	eleventyConfig.addPlugin(eleventySyntaxhighlightPlugin);
	eleventyConfig.addPlugin(eleventyLightningCssPlugin, {
		minify: false, // TODO: Enable based on env flags
		sourceMap: true,
	});
	eleventyConfig.addPlugin(i18nPlugin, {
		defaultLanguage: 'en-US',
		errorMode: 'allow-fallback',
	});
	eleventyConfig.addPlugin(datePlugin);
	eleventyConfig.addPlugin(markdownPlugin);
	eleventyConfig.addPlugin(recipePlugin);
	eleventyConfig.addPlugin(tripsPlugin);

	// Add RSS filters to liquid
	// See https://www.11ty.dev/docs/plugins/rss/#use-with-other-template-languages
	eleventyConfig.addPlugin(rssPlugin);
	eleventyConfig.addLiquidFilter(
		'htmlToAbsoluteUrls',
		rssPlugin.convertHtmlToAbsoluteUrls,
	);
	eleventyConfig.addLiquidFilter(
		'getNewestCollectionItemDate',
		rssPlugin.getNewestCollectionItemDate,
	);
	eleventyConfig.addLiquidFilter('dateToRfc3339', rssPlugin.dateToRfc3339);

	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0, // Fix liquid date filter to match server
	});
	eleventyConfig.setWatchThrottleWaitTime(100); // in milliseconds
	eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

	return {
		dir: {
			input: './', // Equivalent to Jekyll's source property
			output: './_site', // Equivalent to Jekyll's destination property

			// ⚠️ These values are both relative to your input directory.
			includes: '_includes',
			layouts: '_layouts',
		},
	};
}

/**
 * Primary Eleventy configration function
 *
 * @param   {object}  eleventyConfig  Eleventy config API
 *
 * @return  {object}                  Eleventy config object for site
 */
module.exports = function (eleventyConfig) {
	const staticFiles = [
		'admin/index.html',
		'assets',
		'favicon.ico',
		'styles.css',
		'pinterest-60576.html',
		'mywotc6b2477c57f015eaa645.html',
		'BingSiteAuth.xml',
	];
	staticFiles.forEach(eleventyConfig.addPassthroughCopy.bind(eleventyConfig));

	/**
	 * Map of collection names to glob patterns
	 * @type {Record<string, string>}
	 */
	const collections = {
		blog: '_posts/blog/*.md',
		recipes: '_posts/recipes/*.md',
		notes: '_posts/notes/*.md',
		photos: '_posts/photos/*.md',
		posts: '_posts/**/*.md',
	};
	Object.entries(collections).forEach(([collectionName, glob]) =>
		eleventyConfig.addCollection(collectionName, (collection) =>
			collection.getFilteredByGlob(glob)
		)
	);
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
		if (value.startsWith('http')) {
			return value;
		}
		return 'https://www.ciccarello.me' + value;
	});
	eleventyConfig.addFilter('joinLines', (value) =>
		value.replace(/\n/gm, ' ')
	);
	eleventyConfig.addFilter('keys', (value) => {
		if (value) {
			return Object.keys(value);
		}
	}); // Helpful for debugging objects
	eleventyConfig.addFilter('sanitizeFeedContent', (content) =>
		content.replace(/object-position: \d+% \w+/gm, '')
	);

	eleventyConfig.addPlugin(require('./_build/date'));
	eleventyConfig.addPlugin(require('./_build/markdown'));
	eleventyConfig.addPlugin(require('./_build/recipe'));
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0, // Fix liquid date filter to match server
	});
	eleventyConfig.setWatchThrottleWaitTime(100); // in milliseconds
	return {
		dir: {
			input: './', // Equivalent to Jekyll's source property
			output: './_site', // Equivalent to Jekyll's destination property

			// ⚠️ These values are both relative to your input directory.
			includes: '_includes',
			layouts: '_layouts',
		},
		passthroughFileCopy: true,
	};
};

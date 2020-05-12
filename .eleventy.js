const md = require('markdown-it')({
	linkify: true,
	html: true,
	typographer: true,
}).use(require('markdown-it-anchor'), {
	slugify: (s) =>
		require('slugify')(s, {
			remove: /[*+~,.()'"’!\?:@]/g,
			lower: true,
		}),
});
/**
 * Todo: remove when added in 11ty 0.11
 * @see https://github.com/11ty/eleventy/blob/21b7dbfa8cac9722082970619de21349da6b8d63/src/Filters/GetCollectionItem.js
 */
function getCollectionItem(collection, page, modifier = 0) {
	let j = 0;
	let index;
	for (let item of collection) {
		if (
			item.inputPath === page.inputPath &&
			item.outputPath === page.outputPath
		) {
			index = j;
			break;
		}
		j++;
	}

	if (index !== undefined && collection && collection.length) {
		if (index + modifier >= 0 && index + modifier < collection.length) {
			return collection[index + modifier];
		}
	}
}
/**
 * Converts UTC date to local date, ignoring time
 * @param date {string | date} UTC date
 */
const convertFromUTCDate = (date) => {
	const UTCDate = new Date(date);
	return new Date(
		UTCDate.getUTCFullYear(),
		UTCDate.getUTCMonth(),
		UTCDate.getUTCDate()
	);
};

module.exports = function (eleventyConfig) {
	// Copy the `assets` directory to the compiled site folder
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('favicon.ico');
	eleventyConfig.addPassthroughCopy('styles.css');
	eleventyConfig.addPassthroughCopy('pinterest-60576.html');
	eleventyConfig.addPassthroughCopy('mywotc6b2477c57f015eaa645.html');
	eleventyConfig.addPassthroughCopy('BingSiteAuth.xml');

	eleventyConfig.addCollection('blog', (collection) => {
		return collection.getFilteredByGlob('_posts/*.md');
	});
	eleventyConfig.addShortcode(
		'feed_meta',
		() =>
			'<link type="application/atom+xml" rel="alternate" href="http://localhost:4000/feed.xml" title="Anthony Ciccarello" />'
	);
	eleventyConfig.addPairedShortcode('json', (content) => {
		try {
			return JSON.stringify(JSON.parse(content));
		} catch (error) {
			console.warn('Unable to parse json', content);
			throw error;
		}
	});

	eleventyConfig.addFilter(
		'post_url',
		/** @param fileName {string} */ (collection, fileName) => {
			const post = collection.find((item) =>
				item.inputPath.includes(fileName)
			);
			if (post) {
				return post.url;
			} else {
				console.warn('post_url: no item found for', fileName);
			}
		}
	);
	eleventyConfig.addFilter('addBaseUrl', (value) => {
		if (value.startsWith('http')) {
			return value;
		}
		// TODO: remove this when done converting from jekyll
		// I think we are fine using the root URL for paths
		return 'http://localhost:4000' + value;
	});
	eleventyConfig.addFilter('fromUTC', convertFromUTCDate);
	eleventyConfig.addFilter('markdownify', (value) =>
		md.renderInline(value || '')
	);
	eleventyConfig.addFilter('joinLines', (value) =>
		value.replace(/\n/gm, ' ')
	);
	eleventyConfig.addFilter('keys', (value) => {
		if (value) {
			return Object.keys(value);
		}
	}); // Helpful for debugging objects
	// TODO: remove these four filters when added to eleventy
	eleventyConfig.addFilter('log', console.log);
	eleventyConfig.addFilter('getCollectionItem', (collection, page) =>
		getCollectionItem(collection, page)
	);
	eleventyConfig.addFilter('getPreviousCollectionItem', (collection, page) =>
		getCollectionItem(collection, page, -1)
	);
	eleventyConfig.addFilter('getNextCollectionItem', (collection, page) =>
		getCollectionItem(collection, page, 1)
	);
	eleventyConfig.addLiquidFilter(
		'rssDate',
		require('@11ty/eleventy-plugin-rss/src/dateToISO')
	);

	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.setLibrary('md', md);
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

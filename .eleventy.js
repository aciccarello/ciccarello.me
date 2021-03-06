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
const pluginRss = require('@11ty/eleventy-plugin-rss');
function yearsSince(date) {
	const start = new Date(date);
	const milliseconds = new Date().getTime() - start.getTime();
	const years = new Date(milliseconds).getFullYear() - 1970;
	return String(years);
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
	eleventyConfig.addPassthroughCopy('admin');
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('favicon.ico');
	eleventyConfig.addPassthroughCopy('styles.css');
	eleventyConfig.addPassthroughCopy('pinterest-60576.html');
	eleventyConfig.addPassthroughCopy('mywotc6b2477c57f015eaa645.html');
	eleventyConfig.addPassthroughCopy('BingSiteAuth.xml');

	eleventyConfig.addCollection('blog', (collection) =>
		collection.getFilteredByGlob('_posts/*.md')
	);
	eleventyConfig.addCollection('recipes', (collection) =>
		collection.getFilteredByGlob('_recipes/*.md')
	);

	eleventyConfig.addPairedShortcode('json', (content) => {
		try {
			const contentMinusTabs = content.replace(/\t/g, '');
			return JSON.stringify(JSON.parse(contentMinusTabs));
		} catch (error) {
			console.warn('Unable to parse json', content);
			throw error;
		}
	});
	eleventyConfig.addShortcode('buildTime', () => new Date().toDateString());
	eleventyConfig.addFilter('addBaseUrl', (value) => {
		if (value.startsWith('http')) {
			return value;
		}
		return 'https://www.ciccarello.me' + value;
	});
	eleventyConfig.addFilter('yearsSince', yearsSince);
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

	eleventyConfig.addLiquidFilter('dateToRfc3339', pluginRss.dateToRfc3339);
	eleventyConfig.addPlugin(pluginRss);
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

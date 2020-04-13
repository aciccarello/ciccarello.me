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
	eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });
	eleventyConfig.addShortcode('post_url', (value) => value);
	eleventyConfig.addShortcode(
		'feed_meta',
		() =>
			'<link type="application/atom+xml" rel="alternate" href="http://localhost:4000/feed.xml" title="Anthony Ciccarello" />'
	);
	eleventyConfig.addFilter('fromUTC', convertFromUTCDate);
	eleventyConfig.addFilter('debug', (value) => {
		console.log('Debug filter value: ', value);
		return value;
	});
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
	eleventyConfig.setLibrary(
		'md',
		require('markdown-it')({
			linkify: true,
			html: true,
			typographer: true,
		}).use(require('markdown-it-anchor'))
	);

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

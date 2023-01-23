/**
 * Allows setting up a separate markdown configuration (see recipe plugin).
 *
 * @return  {import('markdown-it')} markdown config instance
 */
function initializeMarkdown() {
	return require('markdown-it')({
		linkify: true,
		html: true,
		typographer: true,
	})
		.use(require('markdown-it-attrs'), {
			allowedAttributes: ['id', 'class'],
		})
		.use(require('markdown-it-image-figures'), {
			figcaption: true,
			copyAttrs: 'class',
		})
		.use(require('markdown-it-html5-media').html5Media)
		.use(require('markdown-it-anchor'), {
			// This only applies to anchors
			slugify: (s) =>
				require('slugify')(s, {
					remove: /[*+~,.()'"’!\?:@]/g,
					lower: true,
				}),
		});
}

/** Main markdownIt instance */
const md = initializeMarkdown();

/**
 * Custom plugin configuration for setting up markdown config
 *
 * @param   {object}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addFilter('markdownify', (value) =>
		md.renderInline(value || '')
	);
	eleventyConfig.addPairedShortcode('markdownify', (content) => {
		return md.render(content || '');
	});
	// Remove indents to avoid markdown converting to code blocks
	// TODO: Consider disabling this markdown option (assuming nothing else changes)
	eleventyConfig.addPairedShortcode('removeindents', (content) => {
		return content.replace(/^\s+/gm, '');
	});
};
module.exports.initializeMarkdown = initializeMarkdown;
module.exports.md = md;

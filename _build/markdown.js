import MarkdownIt from 'markdown-it';
import MarkdownItAttrs from 'markdown-it-attrs';
import { html5Media } from 'markdown-it-html5-media';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItImageFigures from 'markdown-it-image-figures';
import slugify from 'slugify';
/**
 * Allows setting up a separate markdown configuration (see recipe plugin).
 *
 * @return  {MarkdownIt} markdown config instance
 */
export function initializeMarkdown() {
	return MarkdownIt({
		linkify: true,
		html: true,
		typographer: true,
	})
		.use(MarkdownItAttrs, {
			allowedAttributes: ['id', 'class', 'rel'],
		})
		.use(MarkdownItImageFigures, {
			figcaption: true,
		})
		.use(html5Media)
		.use(MarkdownItAnchor, {
			// This only applies to anchors
			slugify: (s) =>
				slugify(s, {
					remove: /[*+~,.()'"’!\?:@]/g,
					lower: true,
				}),
		});
}

/** Main markdownIt instance */
export const md = initializeMarkdown();

/**
 * Custom plugin configuration for setting up markdown config
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addFilter('markdownify', (value) =>
		md.renderInline(value || ''),
	);
	eleventyConfig.addPairedShortcode('markdownify', (content) => {
		return md.render(content || '');
	});
	// Remove indents to avoid markdown converting to code blocks
	// TODO: Consider disabling this markdown option (assuming nothing else changes)
	eleventyConfig.addPairedShortcode('removeindents', (content) => {
		return content.replace(/^\s+/gm, '');
	});
}

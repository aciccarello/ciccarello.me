const { initializeMarkdown, md } = require('./markdown');

const cooklangMd = initializeMarkdown().use(require('markdown-it-cooklang'));

/**
 * Custom plugin configuration for recipe template helpers
 *
 * @param   {object}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
module.exports = function (eleventyConfig) {
	eleventyConfig.addPairedShortcode('recipe-ingredients', (content) => {
		let render = md.render('## Ingredients\n' + content);
		render = render.replaceAll(
			'<li>',
			'<li class="p-ingredient ingredient">'
		);
		return render;
	});
	eleventyConfig.addPairedShortcode('recipe-directions', (content) => {
		let render = md.render('## Directions\n' + content);
		render = render.replace(
			'<ol>',
			'<ol class="e-instructions instructions">'
		);
		return render;
	});
	eleventyConfig.addPairedShortcode('recipe-cooklang', (content) => {
		let render = cooklangMd.render(`## Ingredients

[[ingredients]]

## Directions
${content}`);
		render = render.replace(
			/<li>(?=[\s\S]*?<ol>)/gm, // Only modify list items before directions ordered list
			'<li class="p-ingredient ingredient">'
		);
		render = render.replace(
			'<ol>',
			'<ol class="e-instructions instructions">'
		);
		return render;
	});
};

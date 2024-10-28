import markdownItCooklang from 'markdown-it-cooklang';
import { initializeMarkdown, md } from './markdown.js';

const cooklangMd = initializeMarkdown().use(markdownItCooklang, {
	ingredients: {
		inlineDisplayAmount: true,
	},
});

/**
 * Custom plugin configuration for recipe template helpers
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.addPairedShortcode('recipe-ingredients', (content) => {
		let render = md.render('## Ingredients\n' + content);
		render = render.replaceAll(
			'<li>',
			'<li class="p-ingredient ingredient">',
		);
		return render;
	});
	eleventyConfig.addPairedShortcode('recipe-directions', (content) => {
		let render = md.render('## Directions\n' + content);
		render = render
			.replace('<ol>', '<ol class="e-instructions instructions">')
			.replaceAll('<li>', '<li class="p-instruction instruction">');
		return render;
	});
	eleventyConfig.addShortcode('recipe-temp', (temp, accuracy = 5) => {
		const tempF = Number(temp);
		if (Number.isNaN(tempF)) {
			throw new Error(`Recipe temp "${content}" not a number`);
		}
		let tempC = ((tempF - 32) * 5) / 9;
		tempC = accuracy * Math.round(tempC / accuracy);

		return `${tempF}°F (${tempC}°C)`;
	});
	eleventyConfig.addPairedShortcode('recipe-cooklang', (content) => {
		let render = cooklangMd.render(`## Ingredients

[[ingredients]]

## Directions
${content}`);
		render = render.replace(
			/<li>(?=[\s\S]*?<ol>)/gm, // Only modify list items before directions ordered list
			'<li class="p-ingredient ingredient">',
		);
		render = render
			.replace('<ol>', '<ol class="e-instructions instructions">')
			.replace(
				/(?![\s\S]*?<ol>)<li>/gm, // Only modify list items after directions ordered list
				'<li class="p-instruction instruction">',
			) // Yandex documented a class on each step. Not sure if this works...
			// See https://yandex.com/support/webmaster/hrecipe/general.html
			.replaceAll('class="amount"', 'class="amount p-value value"')
			.replaceAll('class="unit"', 'class="amount p-type type"');
		return render;
	});
}

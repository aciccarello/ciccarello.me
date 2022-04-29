const initializeMarkdown = () =>
	require('markdown-it')({
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
		.use(require('markdown-it-anchor'), {
			// This only applies to anchors
			slugify: (s) =>
				require('slugify')(s, {
					remove: /[*+~,.()'"’!\?:@]/g,
					lower: true,
				}),
		});
const md = initializeMarkdown();
const pluginRss = require('@11ty/eleventy-plugin-rss');
function yearsSince(date) {
	const start = new Date(date);
	const milliseconds = new Date().getTime() - start.getTime();
	const years = new Date(milliseconds).getFullYear() - 1970;
	return String(years);
}

const dateFormat = new Intl.DateTimeFormat([], { dateStyle: 'medium' });
const dateTimeFormat = new Intl.DateTimeFormat([], {
	dateStyle: 'medium',
	timeStyle: 'short',
});

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('admin/index.html');
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('favicon.ico');
	eleventyConfig.addPassthroughCopy('styles.css');
	eleventyConfig.addPassthroughCopy('pinterest-60576.html');
	eleventyConfig.addPassthroughCopy('mywotc6b2477c57f015eaa645.html');
	eleventyConfig.addPassthroughCopy('BingSiteAuth.xml');

	eleventyConfig.addCollection('blog', (collection) =>
		collection.getFilteredByGlob('_posts/blog/*.md')
	);
	eleventyConfig.addCollection('recipes', (collection) =>
		collection.getFilteredByGlob('_posts/recipes/*.md')
	);
	eleventyConfig.addCollection('notes', (collection) =>
		collection.getFilteredByGlob('_posts/notes/*.md')
	);
	eleventyConfig.addCollection('photos', (collection) =>
		collection.getFilteredByGlob('_posts/photos/*.md')
	);
	eleventyConfig.addCollection('posts', (collection) =>
		collection.getFilteredByGlob(['_posts/**/*.md'])
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
	const cooklangMd = initializeMarkdown().use(
		require('markdown-it-cooklang')
	);
	eleventyConfig.addPairedShortcode('markdownify', (content) => {
		return md.render(content || '');
	});
	// Remove indents to avoid markdown converting to code blocks
	eleventyConfig.addPairedShortcode('removeindents', (content) => {
		return content.replace(/^\s+/gm, '');
	});
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
	eleventyConfig.addGlobalData('buildTime', () => new Date());
	eleventyConfig.addFilter('addBaseUrl', (value) => {
		if (value.startsWith('http')) {
			return value;
		}
		return 'https://www.ciccarello.me' + value;
	});
	eleventyConfig.addFilter('yearsSince', yearsSince);
	eleventyConfig.addFilter('formatHumanDate', (dateInput, trimDate) => {
		const date = new Date(dateInput);
		if (trimDate || date.toISOString().endsWith('T00:00:00.000Z')) {
			return dateFormat.format(date);
		}
		return dateTimeFormat.format(date) + ' UTC';
	});
	eleventyConfig.addFilter('formatMachineDate', (date) => {
		const stringDate = pluginRss.dateToRfc3339(date);
		const [datePart, timePart] = stringDate.split('T');
		// If there is no time, use the simpler YYYY-MM-DD format
		return timePart === '00:00:00Z' ? datePart : stringDate;
	});
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

	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.setLiquidOptions({
		timezoneOffset: 0, // Fix liquid date filter to match server
	});
	eleventyConfig.setLibrary('md', md);
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

import htmlmin from 'html-minifier-terser';

export function isProductionBuild() {
	return Boolean(process.env.NETLIFY || process.env.NODE_ENV === 'production');
}

export default function (eleventyConfig) {
	if (isProductionBuild()) {
		eleventyConfig.addTransform('htmlmin', function (content) {
			// String conversion to handle `permalink: false`
			if ((this.page.outputPath || '').endsWith('.html')) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
				});

				return minified;
			}

			// If not an HTML output, return content as-is
			return content;
		});
		console.info('Production optimizations enabled');
	} else {
		eleventyConfig.setQuietMode(true);
		// The auth redirect won't work anyway so always point to local indiekit
		eleventyConfig.addGlobalData(
			'site.indiekitUrl',
			'http://localhost:3000',
		);
		console.info(
			'Production optimizations disabled. Set NETLIFY or NODE_ENV=production environment variable to enable.',
		);
	}
}

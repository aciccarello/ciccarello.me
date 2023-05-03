const testData = require('../../_data/test.json');
const baseUrl = 'http://localhost:8080';

/**
 * Pa11y accesibility testing configuration.
 * https://github.com/pa11y/pa11y-ci
 *
 * See axe docs for rule names when ignoring axe rules
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
module.exports = {
	// ! Axe is reporting manual check warnings as errors
	// See https://github.com/pa11y/pa11y/issues/633 and https://github.com/pa11y/pa11y/issues/623
	// defaults: { runners: ['axe'] },
	urls: [
		'/',
		'/search/',
		'/links/',
		{ url: '/resume/', ignore: ['link-in-text-block'] },
		'/posts/',
		'/photos/',
		'/foster/',
		'/colophon/',
		'/pay/',
		...Object.values(testData.posts),
	].map((path) => {
		if (typeof path === 'string') {
			return baseUrl + path;
		}
		return { ...path, url: baseUrl + path.url };
	}),
};

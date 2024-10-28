import { readFile } from 'node:fs/promises';
const baseUrl = 'http://localhost:8080';

// TODO: This doesn't work with ESM. Opened issues with pa11y-ci
// See https://github.com/pa11y/pa11y-ci/issues/249
// See https://github.com/pa11y/pa11y-ci/issues/250

// ! Axe is reporting manual check warnings as errors
// See https://github.com/pa11y/pa11y/issues/633 and https://github.com/pa11y/pa11y/issues/623
// export defaults = { runners: ['axe'] },

/**
 * Pa11y accesibility testing configuration.
 * https://github.com/pa11y/pa11y-ci
 *
 * See axe docs for rule names when ignoring axe rules
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
export const urls = (async () => {
	let posts = JSON.parse(
		(
			await readFile(new URL('../../_data/test.json', import.meta.url))
		).toString(),
	).posts;

	return [
		'/',
		'/search/',
		'/links/',
		{ url: '/resume/', ignore: ['link-in-text-block'] },
		'/posts/',
		'/photos/',
		'/foster/',
		'/colophon/',
		'/pay/',
		...Object.values(posts),
	].map((path) => {
		if (typeof path === 'string') {
			return baseUrl + path;
		}
		return { ...path, url: baseUrl + path.url };
	});
})();

export default {
	urls,
};

import { getLocaleUrlsMap } from '../i18n.js';

/**
 * Build the urlToInputPath shape Eleventy passes to the i18n plugin.
 * @param {Array<[string, string, number?]>} entries [url, inputPath, groupNumber]
 */
function urlToInputPath(entries) {
	return Object.fromEntries(
		entries.map(([url, inputPath, groupNumber = 0]) => [
			url,
			{ inputPath, groupNumber },
		]),
	);
}

describe('getLocaleUrlsMap', () => {
	it('pairs a page with its Spanish translation', () => {
		const map = getLocaleUrlsMap(
			urlToInputPath([
				[
					'/posts/2024/10/25/sitemaps/',
					'./posts/notes/2024-10-25-sitemaps.md',
				],
				[
					'/es/publicaciones/2024/10/25/sitemaps/',
					'./es/posts/notes/2024-10-25-sitemaps.md',
				],
			]),
		);

		expect(map['/posts/2024/10/25/sitemaps/'].map((e) => e.url)).toEqual([
			'/es/publicaciones/2024/10/25/sitemaps/',
		]);
		expect(
			map['/es/publicaciones/2024/10/25/sitemaps/'].map((e) => e.url),
		).toEqual(['/posts/2024/10/25/sitemaps/']);
	});

	it('does not treat paginated same-language pages as translations of each other', () => {
		// All book pages come from one paginated template, so they share an
		// input path and group number. They must not be listed as translations.
		const map = getLocaleUrlsMap(
			urlToInputPath([
				['/reads/awake-3cad1040/', './posts/reads/book.html'],
				['/reads/on-tyranny-d11ad497/', './posts/reads/book.html'],
				['/reads/the-peregrine-940a4840/', './posts/reads/book.html'],
			]),
		);

		expect(map['/reads/awake-3cad1040/']).toEqual([]);
		expect(map['/reads/on-tyranny-d11ad497/']).toEqual([]);
		expect(map['/reads/the-peregrine-940a4840/']).toEqual([]);
	});
});

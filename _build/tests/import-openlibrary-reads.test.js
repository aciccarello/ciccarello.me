import { describe, expect, it } from '@jest/globals';
import {
	addRatingToFrontmatter,
	buildPostContent,
	parseCsv,
	parseRatingsCsv,
	stars,
} from '../scripts/import-openlibrary-reads.js';

describe('parseCsv', () => {
	it('parses rows and handles quoted fields containing commas', () => {
		const text = 'A,B,C\n1,"two, and a half",3\n';
		expect(parseCsv(text)).toEqual([
			['A', 'B', 'C'],
			['1', 'two, and a half', '3'],
		]);
	});

	it('handles escaped quotes and CRLF line endings', () => {
		const text = 'A,B\r\n"say ""hi""",x\r\n';
		expect(parseCsv(text)).toEqual([
			['A', 'B'],
			['say "hi"', 'x'],
		]);
	});
});

describe('parseRatingsCsv', () => {
	const header = 'Work ID,Edition ID,Title,Author(s),Rating,Created On';

	it('maps olid uids to integer ratings', () => {
		const csv = `${header}\nOL40793W,OL698593M,The Divine Conspiracy,Dallas Willard,3,2026-03-16 00:39:19\n`;
		const ratings = parseRatingsCsv(csv);
		expect(ratings.get('olid:OL40793W')).toBe(3);
	});

	it('locates columns by header name regardless of order', () => {
		const csv = 'Rating,Work ID\n5,OL1W\n';
		expect(parseRatingsCsv(csv).get('olid:OL1W')).toBe(5);
	});

	it('throws when required columns are missing', () => {
		expect(() => parseRatingsCsv('Title,Rating\nx,5\n')).toThrow();
	});
});

describe('stars', () => {
	it('renders filled and empty stars to a scale of five', () => {
		expect(stars(5)).toBe('★★★★★');
		expect(stars(3)).toBe('★★★☆☆');
	});
});

describe('addRatingToFrontmatter', () => {
	it('inserts the rating after the progress line', () => {
		const post = '---\ntitle: A\nprogress: finished\n---\n\nbody';
		expect(addRatingToFrontmatter(post, 4)).toBe(
			'---\ntitle: A\nprogress: finished\nrating: 4\n---\n\nbody',
		);
	});

	it('appends the rating when there is no progress line', () => {
		const post = '---\ntitle: A\n---\n\nbody';
		expect(addRatingToFrontmatter(post, 4)).toBe(
			'---\ntitle: A\nrating: 4\n---\n\nbody',
		);
	});

	it('returns the input unchanged when there is no frontmatter', () => {
		expect(addRatingToFrontmatter('no frontmatter here', 4)).toBe(
			'no frontmatter here',
		);
	});
});

describe('buildPostContent', () => {
	const book = {
		name: 'Awake',
		authors: ['Jen Hatmaker'],
		uid: 'olid:OL44369939W',
		url: 'https://openlibrary.org/works/OL44369939W',
		photo: 'https://covers.openlibrary.org/b/id/15141815-M.jpg',
		date: '2025-11-12T04:11:28.000Z',
	};

	it('adds a rating field and stars in the title when rated', () => {
		const content = buildPostContent(
			book,
			'finished',
			'Finished Reading',
			4,
		);
		expect(content).toContain('rating: 4');
		expect(content).toContain(
			"title: 'Finished Reading Awake by Jen Hatmaker - ★★★★☆'",
		);
	});

	it('omits the rating when none is provided', () => {
		const content = buildPostContent(book, 'finished', 'Finished Reading');
		expect(content).not.toContain('rating:');
		expect(content).toContain(
			'title: Finished Reading Awake by Jen Hatmaker',
		);
	});

	it('excludes imported posts from the main feed', () => {
		const content = buildPostContent(book, 'finished', 'Finished Reading');
		expect(content).toContain('excludeFromMainFeed: true');
	});

	it('renders multiple authors as a YAML list', () => {
		const content = buildPostContent(
			{ ...book, authors: ['Robin Wall Kimmerer', 'David Muñoz Mateos'] },
			'want',
			'Want to Read',
		);
		expect(content).toContain(
			'  author:\n    - Robin Wall Kimmerer\n    - David Muñoz Mateos',
		);
	});
});

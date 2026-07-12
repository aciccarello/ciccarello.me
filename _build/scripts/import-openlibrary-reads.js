// @ts-check
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import slugify from 'slugify';

/**
 * Import books from the public OpenLibrary "My Books" API and create read posts.
 *
 * Fetches the three reading-log shelves for a user and creates a post in
 * posts/reads/ for each book that does not already have a post at the same
 * progress status. The OpenLibrary work ID is used as the read-of.uid.
 *
 * Ratings are not exposed by the shelf API, but OpenLibrary offers a CSV export
 * (My Books > Ratings > download). Pass its path as an optional argument to
 * include ratings in newly created posts and to backfill a rating onto the most
 * recent post of a book that has no rating yet.
 *
 * @see https://openlibrary.org/dev/docs/api/mybooks
 *
 * Run with:
 * ```bash
 * node _build/scripts/import-openlibrary-reads.js
 * node _build/scripts/import-openlibrary-reads.js ~/Downloads/OpenLibrary_Ratings.csv
 * # via npm:
 * npm run import:reads -- ~/Downloads/OpenLibrary_Ratings.csv
 * ```
 */

const USERNAME = 'a3chic9';
const READS_DIR = 'posts/reads';

/**
 * Map each OpenLibrary reading-log shelf to a site progress value.
 * Progress options: ['want', 'started', 'finished', 'stopped'].
 * OpenLibrary has no shelf for 'stopped', so it is never imported.
 * @type {Array<{shelf: string, progress: string, verb: string}>}
 */
const SHELVES = [
	{ shelf: 'want-to-read', progress: 'want', verb: 'Want to Read' },
	{
		shelf: 'currently-reading',
		progress: 'started',
		verb: 'Started Reading',
	},
	{ shelf: 'already-read', progress: 'finished', verb: 'Finished Reading' },
];

async function main() {
	const csvPath = getCsvArg();
	const ratings = csvPath
		? parseRatingsCsv(await readFile(csvPath, 'utf8'))
		: new Map();

	console.log('Importing OpenLibrary reads for', USERNAME);
	if (csvPath) {
		console.log(`Loaded ${ratings.size} rating(s) from ${csvPath}`);
	} else {
		console.log(
			'No ratings CSV provided; Download from https://openlibrary.org/account/import and',
			'pass file path as the first argument to include ratings in new posts and backfill missing ratings.',
		);
	}

	const books = await getExistingBooks();
	console.log(`Found ${books.size} existing book(s) with posts`);

	let created = 0;
	let skipped = 0;

	for (const { shelf, progress, verb } of SHELVES) {
		const entries = await fetchShelf(shelf);
		console.log(`Shelf ${shelf}: ${entries.length} book(s)`);

		for (const entry of entries) {
			const book = normalizeEntry(entry);
			if (!book) {
				console.warn('Skipping entry without a work key', entry?.work);
				continue;
			}

			if (books.get(book.uid)?.progressSet.has(progress)) {
				skipped++;
				continue;
			}

			const rating = ratings.get(book.uid);
			const path = join(
				READS_DIR,
				`${book.fileDate}-${progress}-${generateTitleSlug(book.name)}.md`,
			);
			await writeFile(
				path,
				buildPostContent(book, progress, verb, rating),
				'utf8',
			);
			created++;
			console.log('Created', path);

			// Track so later shelves/updates in this run stay consistent
			recordPost(
				books,
				book.uid,
				progress,
				book.date,
				path,
				rating != null,
			);
		}
	}

	// Backfill: books that have posts but no rating anywhere get the rating
	// added to their most recent post.
	let updated = 0;
	for (const [uid, rating] of ratings) {
		const record = books.get(uid);
		if (!record || record.hasRating) continue;

		const latest = record.posts.reduce((newest, post) =>
			new Date(post.date) > new Date(newest.date) ? post : newest,
		);
		await updatePostRating(latest.path, rating);
		record.hasRating = true;
		updated++;
		console.log('Added rating to', latest.path);
	}

	console.log(
		`Done. Created ${created}, updated ${updated}, skipped ${skipped} existing.`,
	);
}

/**
 * The first positional CLI argument: an optional ratings CSV path.
 *
 * @returns {string | undefined}
 */
function getCsvArg() {
	const scriptArg = process.argv.findIndex((arg) =>
		arg.includes('import-openlibrary-reads.js'),
	);
	return process.argv
		.slice(scriptArg + 1)
		.find((arg) => !arg.startsWith('-'));
}

/**
 * Fetch a single reading-log shelf as JSON.
 *
 * @param {string} shelf Shelf slug (e.g. 'already-read')
 * @returns {Promise<Array<any>>} reading_log_entries for the shelf
 */
async function fetchShelf(shelf) {
	const url = `https://openlibrary.org/people/${USERNAME}/books/${shelf}.json`;
	const response = await fetch(url).catch((error) => {
		console.error('Unable to fetch shelf', url, error.message);
		process.exit(1);
	});
	if (!response.ok) {
		console.error('Unable to fetch shelf', url, response.status);
		process.exit(1);
	}
	const data = await response.json();
	return data?.reading_log_entries ?? [];
}

/**
 * Normalize a reading-log entry into the fields needed for a post.
 *
 * @param {any} entry A single reading_log_entries item
 * @returns {{name: string, authors: string[], uid: string, url: string,
 *   photo: string | undefined, date: string, fileDate: string} | null}
 */
function normalizeEntry(entry) {
	const work = entry?.work ?? {};
	const workId = work.key?.split('/works/')[1];
	if (!workId) return null;

	const { date, fileDate } = parseLoggedDate(entry.logged_date);

	return {
		name: work.title ?? 'Untitled',
		authors: Array.isArray(work.author_names) ? work.author_names : [],
		uid: `olid:${workId}`,
		url: `https://openlibrary.org/works/${workId}`,
		photo: work.cover_id
			? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
			: undefined,
		date,
		fileDate,
	};
}

/**
 * @typedef {object} BookRecord
 * @property {Set<string>} progressSet Progress values already posted for the book
 * @property {Array<{path: string, date: string}>} posts Existing post files
 * @property {boolean} hasRating Whether any post for the book has a rating
 */

/**
 * Build a map of book uid => record of its existing posts, so we can skip
 * duplicate progress statuses and know whether a rating already exists. A post
 * with no explicit progress is treated as 'finished' to match the reads
 * collection default.
 *
 * @returns {Promise<Map<string, BookRecord>>}
 */
async function getExistingBooks() {
	const files = (await readdir(READS_DIR)).filter((name) =>
		name.endsWith('.md'),
	);
	const books = new Map();

	for (const file of files) {
		const path = join(READS_DIR, file);
		const frontmatter = (await readFile(path, 'utf8')).match(
			/^---\n([\s\S]*?)\n---/,
		)?.[1];
		if (!frontmatter) continue;

		const uid = frontmatter.match(/^\s*uid:\s*(\S+)/m)?.[1];
		if (!uid) continue;

		const progress =
			frontmatter.match(/^progress:\s*(\S+)/m)?.[1] ?? 'finished';
		const date = frontmatter.match(/^date:\s*(\S+)/m)?.[1] ?? '';
		const hasRating = /^rating:\s*\S/m.test(frontmatter);

		recordPost(books, uid, progress, date, path, hasRating);
	}

	return books;
}

/**
 * Add a post to the book records map, creating the record if needed.
 *
 * @param {Map<string, BookRecord>} books
 * @param {string} uid
 * @param {string} progress
 * @param {string} date
 * @param {string} path
 * @param {boolean} hasRating
 */
function recordPost(books, uid, progress, date, path, hasRating) {
	let record = books.get(uid);
	if (!record) {
		record = { progressSet: new Set(), posts: [], hasRating: false };
		books.set(uid, record);
	}
	record.progressSet.add(progress);
	record.posts.push({ path, date });
	if (hasRating) record.hasRating = true;
}

/**
 * Build the full markdown file contents for a new read post.
 *
 * @param {{name: string, authors: string[], uid: string, url: string,
 *   photo: string | undefined, date: string}} book
 * @param {string} progress Site progress value
 * @param {string} verb Human-readable verb for the title
 * @param {number} [rating] Optional 1-5 rating
 * @returns {string}
 */
export function buildPostContent(book, progress, verb, rating) {
	const authorText = book.authors.join(', ');
	const slug = `${progress}-${generateTitleSlug(book.name)}`;
	const title = [
		verb,
		book.name,
		authorText && `by ${authorText}`,
		rating != null && `- ${stars(rating)}`,
	]
		.filter(Boolean)
		.join(' ');

	const readOfLines = [
		'  type: cite',
		`  name: ${yamlScalar(book.name)}`,
		book.photo && `  photo: ${book.photo}`,
		formatAuthor(book.authors),
		`  uid: ${book.uid}`,
		`  url: ${book.url}`,
	].filter(Boolean);

	return [
		'---',
		`date: ${book.date}`,
		`title: ${yamlScalar(title)}`,
		`slug: ${slug}`,
		'excludeFromMainFeed: true',
		'read-of:',
		...readOfLines,
		`progress: ${progress}`,
		rating != null && `rating: ${rating}`,
		'---',
		'',
	]
		.filter(Boolean)
		.join('\n');
}

/**
 * Add a rating to an existing post's frontmatter, in place. Inserts after the
 * progress line when present, otherwise at the end of the frontmatter block.
 *
 * @param {string} path
 * @param {number} rating
 */
async function updatePostRating(path, rating) {
	const contents = await readFile(path, 'utf8');
	const updated = addRatingToFrontmatter(contents, rating);
	if (updated === contents) {
		console.warn('Could not add rating (no frontmatter?)', path);
		return;
	}
	await writeFile(path, updated, 'utf8');
}

/**
 * Pure helper: return file contents with a rating added to the frontmatter.
 * Returns the input unchanged if there is no frontmatter block.
 *
 * @param {string} contents
 * @param {number} rating
 * @returns {string}
 */
export function addRatingToFrontmatter(contents, rating) {
	const match = contents.match(/^(---\n)([\s\S]*?)(\n---)/);
	if (!match) return contents;

	const [full, open, body, close] = match;
	const ratingLine = `rating: ${rating}`;
	const newBody = /^progress:.*$/m.test(body)
		? body.replace(/^(progress:.*)$/m, `$1\n${ratingLine}`)
		: `${body}\n${ratingLine}`;

	return open + newBody + close + contents.slice(full.length);
}

/**
 * Parse an OpenLibrary ratings CSV export into a map of uid => rating.
 * Columns are located by header name so column order can change.
 *
 * @param {string} text Raw CSV file contents
 * @returns {Map<string, number>} `olid:<workId>` => 1-5 rating
 */
export function parseRatingsCsv(text) {
	const rows = parseCsv(text);
	const header = rows.shift() ?? [];
	const workIdCol = header.indexOf('Work ID');
	const ratingCol = header.indexOf('Rating');
	if (workIdCol === -1 || ratingCol === -1) {
		throw new Error(
			'Ratings CSV is missing a "Work ID" or "Rating" column',
		);
	}

	const ratings = new Map();
	for (const row of rows) {
		const workId = row[workIdCol]?.trim();
		const rating = parseInt(row[ratingCol], 10);
		if (workId && Number.isInteger(rating)) {
			ratings.set(`olid:${workId}`, rating);
		}
	}
	return ratings;
}

/**
 * Minimal RFC-4180 CSV parser: handles quoted fields, escaped quotes ("") and
 * both LF and CRLF line endings.
 *
 * @param {string} text
 * @returns {string[][]} rows of fields
 */
export function parseCsv(text) {
	const rows = [];
	let row = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (inQuotes) {
			if (char === '"' && text[i + 1] === '"') {
				field += '"';
				i++;
			} else if (char === '"') {
				inQuotes = false;
			} else {
				field += char;
			}
		} else if (char === '"') {
			inQuotes = true;
		} else if (char === ',') {
			row.push(field);
			field = '';
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && text[i + 1] === '\n') i++;
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
		} else {
			field += char;
		}
	}
	if (field !== '' || row.length > 0) {
		row.push(field);
		rows.push(row);
	}

	// Drop fully blank rows (e.g. a trailing newline)
	return rows.filter((r) => r.some((cell) => cell !== ''));
}

/**
 * Render a 1-5 rating as filled/empty stars, matching the book card display.
 *
 * @param {number} rating
 * @returns {string}
 */
export function stars(rating) {
	return '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));
}

/**
 * Format the read-of.author field, allowing a single string or a YAML list.
 *
 * @param {string[]} authors
 * @returns {string} The `author:` frontmatter block (may span multiple lines)
 */
function formatAuthor(authors) {
	if (authors.length === 0) return '';
	if (authors.length === 1) return `  author: ${yamlScalar(authors[0])}`;
	return ['  author:', ...authors.map((a) => `    - ${yamlScalar(a)}`)].join(
		'\n',
	);
}

/**
 * Produce a readable slug from a book title, dropping subtitles the same way
 * the book-level slug does.
 *
 * @param {string} name
 * @returns {string}
 */
function generateTitleSlug(name) {
	const normalized = name
		.split(':')[0]
		.split('|')[0]
		.split('(')[0]
		.split('-')[0]
		.split('—')[0]
		.trim()
		.slice(0, 40)
		.toLocaleLowerCase();
	return slugify(normalized);
}

/**
 * Parse an OpenLibrary logged_date ("YYYY/MM/DD, HH:MM:SS") into an ISO string
 * and a YYYY-MM-DD file prefix. Falls back to now if it can't be parsed.
 *
 * @param {string | undefined} loggedDate
 * @returns {{date: string, fileDate: string}}
 */
function parseLoggedDate(loggedDate) {
	const match = loggedDate?.match(
		/(\d{4})\/(\d{2})\/(\d{2}),\s*(\d{2}):(\d{2}):(\d{2})/,
	);
	if (!match) {
		const iso = new Date().toISOString();
		return { date: iso, fileDate: iso.slice(0, 10) };
	}
	const [, year, month, day, hour, minute, second] = match;
	return {
		date: `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
		fileDate: `${year}-${month}-${day}`,
	};
}

/**
 * Quote a YAML scalar when it contains characters that would otherwise change
 * its meaning (colons, leading indicators, quotes, etc.).
 *
 * @param {string} value
 * @returns {string}
 */
function yamlScalar(value) {
	if (/[:#\-?*&!|>'"%@`{}[\],]|^\s|\s$/.test(value)) {
		return `'${value.replace(/'/g, "''")}'`;
	}
	return value;
}

// Only run when executed directly, so tests can import the pure helpers above.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main();
}

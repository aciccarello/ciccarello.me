import { readFile, rename, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

/**
 * Script for updating the date in a file
 *
 * Run by passing in file path
 * ```bash
 * node _build/scripts/update-date.js posts/blog/2023-01-25-birding-in-2023.md
 * ```
 */
async function main() {
	const path = process.argv[2];

	if (!path) {
		throw new Error('Missing file path argument.');
	}

	const now = new Date();
	const isoTimestamp = now.toISOString();
	const isoDatePrefix = isoTimestamp.slice(0, 10);

	const fileContents = await readFile(path, 'utf8');
	const updatedFileContents = fileContents.replace(
		/^date:\s*.*/m,
		`date: ${isoTimestamp}`,
	);
	await writeFile(path, updatedFileContents, 'utf8');
	console.log('Updated', path);

	const filename = basename(path);
	const newFilename = filename.replace(
		/^\d{4}-\d{2}-\d{2}(?=-)/,
		isoDatePrefix,
	);

	if (newFilename === filename) {
		return;
	}

	const newPath = join(dirname(path), newFilename);

	await rename(path, newPath).catch((error) => {
		console.error(`Failed to rename ${path} -> ${newPath}:`, error);
		throw error;
	});
	console.log('Updated and renamed', `${path} -> ${newPath}`);
}

main();

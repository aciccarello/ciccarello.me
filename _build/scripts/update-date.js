import { readFile, rm, rename, writeFile } from 'node:fs/promises';
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
	const originalPath = process.argv[2];

	if (!originalPath) {
		throw new Error('Missing file path argument.');
	}

	const now = new Date();
	const isoTimestamp = now.toISOString();
	const isoDatePrefix = isoTimestamp.slice(0, 10);

	const fileContents = await readFile(originalPath, 'utf8');
	const updatedFileContents = fileContents.replace(
		/^date:\s*.*/m,
		`date: ${isoTimestamp}`,
	);

	const filename = basename(originalPath);
	const newFilename = filename.replace(
		/^\d{4}-\d{2}-\d{2}(?=-)/,
		isoDatePrefix,
	);

	const newPath = join(dirname(originalPath), newFilename);
	await writeFile(newPath, updatedFileContents, 'utf8');
	console.log('Saved', newPath);

	if (newFilename !== filename) {
		await rm(originalPath).catch((error) => {
			console.error(`Failed to remove ${originalPath}:`, error);
			throw error;
		});
		console.log('Removed', originalPath);
	}
}

main();

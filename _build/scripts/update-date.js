import { readFile, writeFile } from 'node:fs/promises';

/**
 * Script for updating the date in a file
 *
 * Run by passing in file path
 * ```bash
 * node _build/scripts/update-date.js _posts/blog/2023-01-25-birding-in-2023.md
 * ```
 */
async function main() {
	const scriptArg = process.argv.findIndex((arg) =>
		arg.includes('update-date.js'),
	);
	const [path] = process.argv.slice(scriptArg + 1);

	const fileContents = await readFile(path, 'utf8');
	const updatedFileContents = fileContents.replace(
		/^date:\s*(\d\S*)/m,
		`date: ${new Date().toISOString()}`,
	);
	await writeFile(path, updatedFileContents, 'utf8');
	console.log('Updated', path);
}

main();

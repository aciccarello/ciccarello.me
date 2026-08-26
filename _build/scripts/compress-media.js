// @ts-check

/**
 * Script for compressing photos and videos. Reads files from raw-media folder, compresses, and renames them.
 *
 * Run by passing in the desired URL.
 * ```bash
 * node _build/scripts/compress-media.js prefix-for-names
 * ```
 */
async function main() {
	const { default: slugify } = await import('slugify');
	const { promises: fs } = await import('node:fs');

	const scriptArg = process.argv.findIndex((arg) =>
		arg.includes('compress-media.js'),
	);
	let [prefixForNames] = process.argv.slice(scriptArg + 1);

	// Normalize prefix to start with year. Use month as default if no prefix is provided.
	if (!prefixForNames) {
		prefixForNames = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}-`;
	}
	if (!prefixForNames.match(/^\d{4}-/)) {
		prefixForNames = `${new Date().getFullYear()}-${prefixForNames}`;
	}
	if (!prefixForNames.endsWith('-')) {
		prefixForNames += '-';
	}

	const { default: path } = await import('path');
	const rawMediaFolder = path.normalize(`${import.meta.dirname}/raw-media`);
	const compressedMediaFolder = path.normalize(
		`${import.meta.dirname}/../../assets/img`,
	);

	const files = await fs.readdir(rawMediaFolder);
	const headerFiles = [];
	const nonHeaderFiles = [];
	console.log('Files found in raw media folder:', files);

	for (const file of files) {
		const filePath = `${rawMediaFolder}/${file}`;
		const fileExtension = file.split('.').pop();
		const fileNameWithoutExtension = file.replace(`.${fileExtension}`, '');
		const newFileName = `${prefixForNames}${slugify(fileNameWithoutExtension)}.${fileExtension}`;
		const newFilePath = `${compressedMediaFolder}/${newFileName}`;

		console.log(`Compressing ${filePath} to ${newFilePath}`);
		if (isFeatureImage(filePath)) {
			headerFiles.push(newFileName);
		} else {
			nonHeaderFiles.push(newFileName);
		}

		if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
			await compressImage(filePath, newFilePath);
		} else if (fileExtension === 'mp4') {
			await compressVideo(filePath, newFilePath);
		}
	}

	console.log('File compression complete.');
	console.log('Use the following for your post front matter:');
	for (const file of headerFiles) {
		console.log(`
image: /assets/media/${file}
image_alt: "Alt text"
image_caption: "Optional displayed caption"
`);
	}
	for (const file of nonHeaderFiles) {
		let className = '{.u-photo}';
		if (isWideImage(file)) {
			className = '{.u-photo .post-image--wide}';
		}
		console.log(`![Alt text](/assets/img/${file})${className}`);
	}
}

/**
 *
 * @param {string} sourcePath Path to raw image
 * @param {string} outputPath Path to image output
 * @returns
 */
async function compressImage(sourcePath, outputPath) {
	const { default: sharp } = await import('sharp');
	const { promises: fs } = await import('node:fs');

	try {
		const imageData = await fs.readFile(sourcePath);
		let width = 1200;
		if (isWideImage(sourcePath)) {
			width = 2048;
		}

		await sharp(imageData)
			.resize({
				width,
			})
			.jpeg({
				quality: 50,
				mozjpeg: true,
			})
			.toFile(outputPath);

		console.log('Wrote image to ', outputPath);
	} catch (err) {
		if (
			err &&
			typeof err === 'object' &&
			'code' in err &&
			err.code === 'EEXIST'
		) {
			console.warn(outputPath + ' already exists');
			return;
		}

		throw err;
	}
}
/**
 * Uses ffmpeg to compress video files
 *
 * @param {string} sourcePath Path to raw video
 * @param {string} outputPath Path to video output
 * @returns
 */
async function compressVideo(sourcePath, outputPath) {
	const { exec } = await import('child_process');
	const { promisify } = await import('util');
	const execAsync = promisify(exec);

	try {
		// Max resolution of 720p, with a CRF of 28 for decent quality and compression
		await execAsync(
			`ffmpeg -i "${sourcePath}" -vcodec libx264 -crf 28 -vf "scale='min(720,iw)':-1,fps=30" -map_metadata -1 "${outputPath}"`,
		);
		console.log('Wrote video to ', outputPath);
	} catch (err) {
		console.error('Error compressing video:', err);
		throw err;
	}
}

/**
 * Determine if the image is the featured or header image.
 *
 * @param {string} filePath path to file
 * @returns true if file name indicates it should be wide
 */
function isFeatureImage(filePath) {
	return filePath.includes('featured') || filePath.includes('header');
}
/**
 * Determine rendering size of image based on file name.
 * If the file name includes "wide", "featured", or "header", it will be considered a wide image.
 *
 * @param {string} filePath path to file
 * @returns true if file name indicates it should be wide
 */
function isWideImage(filePath) {
	return filePath.includes('wide') || isFeatureImage(filePath);
}

main();

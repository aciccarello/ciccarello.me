// @ts-check
require('dotenv').config();
// This doesn't have to be a logged in session
// Any session will work to avoid a redirect chain on ebird.org
// Should have "_ga" and other cookies
const CookieString = process.env.EMBED_COOKIE ?? '';

/**
 * Script for generating a embed preview. Downloads an image thumbnail and outputs base code to the console.
 * Currently optimized for ebird.org.
 *
 * Run by passing in the desired URL.
 * ```bash
 * node _build/scripts/generate-embed-link.js https://ebird.org/species/sctfly/
 * ```
 */
async function main() {
	const { default: fetch } = await import('node-fetch');
	const { parse } = await import('node-html-parser');
	const { default: slugify } = await import('slugify');

	const scriptArg = process.argv.findIndex((arg) =>
		arg.includes('generate-embed-link.js')
	);
	const [url, chosenTitle] = process.argv.slice(scriptArg + 1);

	const response = await fetch(url, {
		headers: { Cookie: CookieString },
	}).catch((error) => {
		let { message } = error;
		if (error.message.includes('maximum redirect')) {
			message = 'Website Cookie expired. Please update.';
		}
		console.error('Unable to fetch url', url, message);
		process.exit(1);
	});

	const html = await response.text();
	console.log('Page loaded', url, html.substring(0, 500));

	const root = parse(html);
	const title =
		chosenTitle ??
		root.querySelector('title')?.innerText.replace(' - eBird', '');
	const description = root
		.querySelector('meta[name=description]')
		?.getAttribute('content');
	const imageUrl = root
		.querySelector('meta[property="og:image"]')
		?.getAttribute('content');
	const placeholderAltText = root
		.querySelector('meta[property="og:image:alt"]')
		?.getAttribute('content');

	const newFileName = `embed-thumbnail-${slugify(title.toLowerCase())}.jpg`;

	console.log(
		'Information parsed',
		title,
		imageUrl,
		placeholderAltText,
		description,
		newFileName
	);

	downloadImage(imageUrl, newFileName);

	const content = `
{% include "embed-link.html"
    title: "${title}"
    url: "${url}"
    description: "${description?.substring(0, 180).trim()}…"
    img: "/assets/img/${newFileName}"
    alt: "${placeholderAltText}"
    objectPosition: "50% center"
%}
`;
	console.log(content);
}

async function downloadImage(imageUrl, fileName) {
	const sharp = require('sharp');
	const path = require('path');
	const fileLocation = path.normalize(
		`${__dirname}/../../assets/img/${fileName}`
	);

	try {
		// Download file to buffer
		const { default: fetch } = await import('node-fetch');
		const response = await fetch(imageUrl, {
			headers: { CookieString },
		});

		const imageData = await response.arrayBuffer();

		await sharp(imageData)
			.resize({
				height: 250,
			})
			.jpeg({
				quality: 75,
				mozjpeg: true,
			})
			.toFile(fileLocation);

		console.log('Wrote thumbnail image to ', fileLocation);
	} catch (err) {
		if (err && err.code === 'EEXIST') {
			console.warn(fileLocation + ' already exists');
			return;
		}

		throw err;
	}
}

main();

const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const baseUrl = 'http://localhost:8080';

const posts = JSON.parse(
	readFileSync(resolve(__dirname, '../../_data/test.json'), 'utf8'),
).posts;

const urls = [
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

module.exports = {
	urls,
};

import slugify from 'slugify';

/** @typedef {import("./types").PostObject} PostObject */

/**
 * Custom plugin configuration for read posts
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.addFilter('bookSlug', (readOf) => {
		if (!readOf?.uid || !readOf?.name) return '';
		return generateBookSlug(readOf.name, readOf.uid);
	});

	eleventyConfig.addCollection('readBooks', (collectionApi) =>
		getReadBooks(collectionApi),
	);

	eleventyConfig.addCollection('reads', (collectionApi) => {
		const allSubjects = getReadBooks(collectionApi);

		// Add properties to group by progress on reads collection in addition to all reads
		allSubjects.want = [];
		allSubjects.started = [];
		allSubjects.finished = [];
		allSubjects.stopped = [];

		return allSubjects.reduce((postsByProgress, bookPost) => {
			postsByProgress[bookPost.progress ?? 'finished'].push(bookPost);
			return postsByProgress;
		}, allSubjects);
	});
}

/**
 * Build a normalized list of books with child read posts.
 *
 * @param {any} collectionApi
 * @returns {Array<object>}
 */
function getReadBooks(collectionApi) {
	// Implemented as a custom collection to combine potentially multiple reads into one per book
	/** @type {PostObject[]} All posts in the reads folder */
	const readPosts = collectionApi.getFilteredByGlob('posts/reads/*.md');

	const subjectToPostList = readPosts
		.reduce((allReads, post) => {
			const subjectId = post.data['read-of']?.uid;
			if (subjectId) {
				const bookPostList = allReads.get(subjectId) ?? [];
				allReads.set(subjectId, [...bookPostList, post]);
			} else {
				console.warn(
					`Read post ${post.url} is missing a read-of.uid property`,
				);
			}
			return allReads;
		}, /** @type {Map<string, PostObject[]>} */ (new Map()))
		.entries();
	return Array.from(subjectToPostList).map(([, posts]) => {
		const bookPost = {
			'read-of': {},
			posts,
			templateContent: '',
		};

		posts
			.sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
			.forEach((post) => {
				const { data } = post;
				const nextPostReadOf = data['read-of'] ?? {};
				// Copy over any top level properties we want to the book level
				bookPost['read-of'] = {
					...bookPost['read-of'],
					...nextPostReadOf,
				};
				// Use the date of the first post as the book post date
				if (!bookPost.date) {
					bookPost.date = data.date;
				}
				bookPost.lastUpdated = data.date;

				// Progress options ['want', 'started', 'finished', 'stopped']
				bookPost.progress = data.progress || bookPost.progress;

				if (data.rating != null) {
					bookPost.rating = data.rating;
				}
				if (
					!bookPost.slug &&
					nextPostReadOf.uid &&
					nextPostReadOf.name
				) {
					bookPost.slug = generateBookSlug(
						nextPostReadOf.name,
						nextPostReadOf.uid,
					);
				}
			});

		return bookPost;
	});
}

/**
 * Generates a slug for a book based on its name and unique ID.
 * The goal is a human-readable but unique slug even if books have the same title.
 * @param {string} name
 * @param {string} uid
 * @returns {string}
 */
export function generateBookSlug(name, uid) {
	// Avoid any subtitles in the slug
	// Limit to first 40 characters; will add 9 more for hash
	const normalizedName = name
		.split(':')[0]
		.split('|')[0]
		.split('(')[0]
		.split('-')[0]
		.split('—')[0]
		.trim()
		.slice(0, 40)
		.toLocaleLowerCase();
	// Start with name for readability but include hash for uniqueness
	return `${slugify(normalizedName)}-${fnv1aHash(uid)}`;
}

function fnv1aHash(str) {
	let hash = 0x811c9dc5;
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193);
	}
	return (hash >>> 0).toString(16).slice(0, 8);
}

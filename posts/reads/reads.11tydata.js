import { generateBookSlug } from '../../_build/reads.js';

export default {
	layout: 'read',
	type: 'read',
	collectionName: 'reads',
	dateFormat: 'day',
	excludeFromMainFeed: false,
	eleventyComputed: {
		back_button(data) {
			if (!data.page?.inputPath?.endsWith('.md')) return data.back_button;
			const readOf = data['read-of'];
			if (!readOf?.uid || !readOf?.name) return undefined;
			return `/reads/${generateBookSlug(readOf.name, readOf.uid)}/`;
		},
	},
};

/**
 * File can be used by the micropub api to know what categories have been used
 */
class TagsList {
	data() {
		return {
			permalink: 'posts/tags/index.json',
			eleventyExcludeFromCollections: true,
		};
	}

	render({ collections }) {
		return JSON.stringify(collections.tagList);
	}
}

module.exports = TagsList;

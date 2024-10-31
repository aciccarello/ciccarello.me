export default {
	permalink:
		"/posts/{{ page.date | date: '%Y/%m/%d' }}/{{ slug | default : title | slugify}}/",
	author: {
		name: 'Anthony Ciccarello',
		typeArticle: 'the',
		type: 'author',
	},
	lang: 'en',
	defaultTitle: '',
	back_button: '../../../..',
	layout: 'note',
	eleventyComputed: {
		type: ({ type, layout }) => type || layout,
		// Post kind data should override this if it's not this simple
		typePlural: ({ type, typePlural }) => typePlural || type + 's',
		lastUpdated:
			/** @type {(data: {date: Date, updates?: {date: string}[]}) => Date} */ (
				(data) =>
					!data.updates
						? data.date
						: data.updates
								.map(({ date }) => new Date(date))
								.concat(data.date)
								.sort((a, b) => a - b)
								.at(-1)
			),
		responseData: (data) => {
			const like = data['like-of'];
			const bookmark = data['bookmark-of'];
			const reply = data['in-reply-to'];
			const url = reply || like || bookmark;
			if (url) {
				const original = data.references?.find(
					({ referenceIdUrl, url: entryUrl }) =>
						url === (referenceIdUrl || entryUrl),
				);
				const referenceData = { ...original };
				let className = 'h-cite';
				let actionDescription;
				if (like) {
					actionDescription = 'Liked';
					className += ' u-like-of';
				}
				if (bookmark) {
					actionDescription = 'Bookmarked';
					className += ' u-bookmark-of';
				}
				// Not using else if because reactji could also use like-of
				// TODO: handle Reactji better https://indieweb.org/reacji
				// ! Logic would be wrong if reply and like are different URLs
				if (reply) {
					actionDescription = 'Replying to';
					className += ' u-in-reply-to';
				}
				let nameTrimmed =
					referenceData.name?.length > 100
						? referenceData.name.slice(0, 100) + '…'
						: referenceData.name;
				let postDescription = 'a post';
				const referencePostType = referenceData['post-type'];
				if (nameTrimmed) {
					postDescription = `“<cite>${nameTrimmed}</cite>”`;
				} else if (referencePostType) {
					// Post type is currently manually set
					// Would like to see it added by micropub server
					// ! Not 100% grammatically correct as "an" goes after vowel sounds
					const prefix = /^[aeiou]/.test(referencePostType)
						? 'an '
						: 'a ';
					postDescription = prefix + referencePostType;
				}

				if (typeof referenceData.author === 'string') {
					referenceData.author = { name: referenceData.author };
				}
				const plaintextSummary = `${actionDescription} ${postDescription.replace(
					/<\/*cite>/g,
					'',
				)} ${
					referenceData.author?.name
						? `by ${referenceData.author.name}`
						: ''
				}`;

				return {
					url,
					...referenceData,
					actionDescription,
					postDescription,
					plaintextSummary,
					nameTrimmed,
					class: className,
				};
			}
		},
	},
};

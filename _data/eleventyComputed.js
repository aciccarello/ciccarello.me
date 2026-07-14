import slugify from 'slugify';

export default {
	viewTransitionName: ({ page }) =>
		slugify(page.url || '').replace("'", '-') ?? 'no-link',
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
};

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/**
 * Custom plugin configuration for recipe template helpers
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		[require.resolve('leaflet').replace(/\/dist\/.*/, '/dist/')]:
			'assets/js/leaflet/',
	});
	eleventyConfig.addCollection('trips', (collectionApi) => {
		const dedupe = (arr) => Array.from(new Set(arr));

		// Implemented as a custom collection rather than computed data
		// because we need to get the related post data as well
		return collectionApi
			.getFilteredByGlob('_posts/trips/*.md')
			.map((trip) => {
				const { tags, date } = trip.data;
				// Defaults to only looking at that year's content
				// But also accept start/endDate properties to refine
				const startDate = trip.data.postsStartDate
					? new Date(trip.data.postsStartDate)
					: new Date(date.getFullYear(), 0, 1);
				const endDate = trip.data.postsEndDate
					? new Date(trip.data.postsEndDate)
					: new Date(date.getFullYear() + 1, 0, 1);
				const tagsToFind = tags.filter((tag) => tag !== 'travel');
				const relatedPosts = dedupe(
					tagsToFind
						.map((t) => collectionApi.getFilteredByTag(t))
						.flat(),
				).filter(
					(post) => post.date > startDate && post.date < endDate,
				);
				// Combine the top level trip locations with child posts
				const combinedLocations = relatedPosts
					.map(({ data }) => data.locations ?? [])
					.flat()
					.toSorted((a, b) => a.date - b.date);
				trip.data.locations = combinedLocations;
				trip.data.relatedPosts = relatedPosts;
				relatedPosts.forEach(({ data }) => (data.trip = trip));
				return trip;
			});
	});
	eleventyConfig.addFilter('jsonifyLocations', (locationData) =>
		// Used by map include for the client side map rendering
		JSON.stringify(
			locationData.map(({ lat, long, title, icon, zoom, date }) => ({
				location: [lat, long],
				title,
				icon,
				zoom,
				date,
			})),
		),
	);
}

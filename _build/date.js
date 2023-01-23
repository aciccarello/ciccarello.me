const pluginRss = require('@11ty/eleventy-plugin-rss');

function yearsSince(date) {
	const start = new Date(date);
	const milliseconds = new Date().getTime() - start.getTime();
	const years = new Date(milliseconds).getFullYear() - 1970;
	return String(years);
}

const dateFormat = new Intl.DateTimeFormat([], { dateStyle: 'medium' });
const dateTimeFormat = new Intl.DateTimeFormat([], {
	dateStyle: 'medium',
	timeStyle: 'short',
});

/**
 * Custom plugin configuration for handling dates
 *
 * @param   {object}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData('buildTime', () => new Date());
	eleventyConfig.addFilter('yearsSince', yearsSince);
	eleventyConfig.addFilter('formatHumanDate', (dateInput, trimDate) => {
		const date = new Date(dateInput);
		if (trimDate || date.toISOString().endsWith('T00:00:00.000Z')) {
			return dateFormat.format(date);
		}
		return dateTimeFormat.format(date) + ' UTC';
	});
	eleventyConfig.addFilter('formatMachineDate', (date) => {
		const stringDate = pluginRss.dateToRfc3339(date);
		const [datePart, timePart] = stringDate.split('T');
		// If there is no time, use the simpler YYYY-MM-DD format
		return timePart === '00:00:00Z' ? datePart : stringDate;
	});
};

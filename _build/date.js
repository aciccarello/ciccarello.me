import { dateToRfc3339 } from '@11ty/eleventy-plugin-rss';

function yearsSince(date, endInput) {
	let includeMonths = false;
	let end;
	if (endInput) {
		// Resume wants months
		includeMonths = true;
		end = new Date(endInput);
	} else {
		end = new Date();
	}

	const start = new Date(date);
	const milliseconds = end.getTime() - start.getTime();
	const duration = new Date(milliseconds);
	const years = duration.getFullYear() - 1970;
	let months = duration.getMonth(); // Intentionally 0 indexed
	const days = duration.getDate();

	if (includeMonths) {
		if (days > 15) {
			months++;
		}
		const monthText =
			months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
		const yearText =
			years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
		return [yearText, monthText].filter(Boolean).join(' ');
	}

	// Round up at 10 months
	return String(months > 9 ? years : years + 1);
}

function generateFormats(locale) {
	return {
		dateFormat: new Intl.DateTimeFormat([locale], { dateStyle: 'medium' }),
		monthFormat: new Intl.DateTimeFormat([locale], {
			year: 'numeric',
			month: 'long',
		}),
		dateTimeFormat: new Intl.DateTimeFormat([locale], {
			dateStyle: 'medium',
			timeStyle: 'short',
		}),
	};
}

const formatters = {
	en: generateFormats('en-US'),
	es: generateFormats('es'),
};
formatters['en-US'] = formatters.en;

/**
 * Custom plugin configuration for handling dates
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData('buildTime', () => new Date());
	eleventyConfig.addFilter('yearsSince', yearsSince);
	eleventyConfig.addFilter('formatHumanDate', function (dateInput, accuracy) {
		const locale = this.page.lang || 'en-US';
		const { dateFormat, monthFormat, dateTimeFormat } = formatters[locale];
		const date = new Date(dateInput);
		if (accuracy === 'month') {
			return monthFormat.format(date);
		}
		if (
			accuracy === 'day' ||
			date.toISOString().endsWith('T00:00:00.000Z')
		) {
			return dateFormat.format(date);
		}
		return dateTimeFormat.format(date) + ' UTC';
	});
	eleventyConfig.addFilter('formatMachineDate', (date, accuracy) => {
		const stringDate = dateToRfc3339(new Date(date));
		const [datePart, timePart] = stringDate.split('T');
		if (accuracy === 'month') {
			return datePart.substring(0, 7);
		}
		if (accuracy === 'day' || timePart === '00:00:00Z') {
			return datePart;
		}
		return stringDate;
	});
}

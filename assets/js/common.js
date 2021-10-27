/** Don't trust the times before this date */
const timeMattersSince = new Date('2021-10-10');
const dateFormat = new Intl.DateTimeFormat([], { dateStyle: 'medium' });
const dateTimeFormat = new Intl.DateTimeFormat([], {
	dateStyle: 'medium',
	timeStyle: 'short',
});

(function convertDatesToLocal() {
	// Check for document for possible server side use
	globalThis.document &&
		document.querySelectorAll('time[datetime]').forEach((element) => {
			const date = new Date(element.dateTime);
			// Don't change old dates and dates with no UTC time
			if (
				date > timeMattersSince &&
				!date.toISOString().endsWith('T00:00:00.000Z')
			) {
				const isDateTime = element.innerHTML.includes(':');
				const newText = isDateTime
					? formatDateTimeString(date)
					: formatDateString(date);
				element.innerHTML = newText;
			}
		});
})();

/**
 * Format a date object to a date string for rendering
 *
 * @param   {Date}  date  Date to render
 */
export function formatDateString(date) {
	return dateFormat.format(date);
}

/**
 * Format a date object to a date and time string for rendering
 *
 * @param   {Date}  date  Date to render
 */
export function formatDateTimeString(date) {
	return dateTimeFormat.format(date);
}

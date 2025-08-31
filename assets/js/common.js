/** Don't trust the times before this date */
const timeMattersSince = new Date('2021-10-10');
const locale = globalThis.document.querySelector('html').lang;
const dateFormat = new Intl.DateTimeFormat([locale], { dateStyle: 'medium' });
const dateTimeFormat = new Intl.DateTimeFormat([locale], {
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

(function showTranslations() {
	const translationAlert =
		globalThis.document.querySelector('.translation-alert');
	if (translationAlert) {
		const altLang = translationAlert
			.querySelector('[lang]')
			?.getAttribute('lang')
			.split('-')[0];
		if (navigator.languages?.some((lang) => lang.startsWith(altLang))) {
			translationAlert.style = 'display: block';
		}
	}
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

document.addEventListener('DOMContentLoaded', () => {
	initializeLightbox();
});

function initializeLightbox() {
	const images = Array.from(
		document.querySelectorAll('img:not(a img):not([src*="gravatar.com"])'),
	);

	if (images.length > 1) {
		import('./lightbox.js').then((module) => {
			const lightbox = module.createLightbox();
			module.addEventListeners(lightbox, images);
		});
	}
}

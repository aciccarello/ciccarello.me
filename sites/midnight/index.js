const gistUrl = 'https://api.github.com/gists/052851f67f7a66f12ad8020410e2761c';
const timeZone = 'America/Los_Angeles';

export function calendarDay(value) {
	const parts = new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(new Date(value));
	const values = Object.fromEntries(
		parts
			.filter(({ type }) => type !== 'literal')
			.map(({ type, value: partValue }) => [type, partValue]),
	);
	return `${values.year}-${values.month}-${values.day}`;
}

export function daysSince(updatedAt, now = new Date()) {
	const start = Date.parse(`${calendarDay(updatedAt)}T00:00:00Z`);
	const end = Date.parse(`${calendarDay(now)}T00:00:00Z`);
	return Math.max(0, Math.round((end - start) / 86_400_000));
}

export function formatUpdatedAt(updatedAt) {
	return new Intl.DateTimeFormat('en-US', {
		timeZone,
		dateStyle: 'long',
		timeStyle: 'short',
	}).format(new Date(updatedAt));
}

export async function load(doc = document, fetcher = fetch) {
	const count = doc.getElementById('day-count');
	const status = doc.getElementById('status');
	const updatedAt = doc.getElementById('updated-at');

	try {
		const response = await fetcher(gistUrl);
		if (!response.ok) {
			throw new Error('Unable to fetch incident log');
		}

		const data = await response.json();
		if (
			!data ||
			typeof data.updated_at !== 'string' ||
			Number.isNaN(Date.parse(data.updated_at))
		) {
			throw new Error('Incident log has no valid timestamp');
		}

		count.textContent = daysSince(data.updated_at).toString();
		updatedAt.textContent = `Last recorded: ${formatUpdatedAt(data.updated_at)}`;
		status.textContent = data.files?.['reason.md']?.content ?? '';
	} catch (error) {
		status.textContent = 'Unable to load the counter.';
		console.error(error);
	}
}

if (typeof document !== 'undefined') {
	load();
}

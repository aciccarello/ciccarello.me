// @ts-check
require('dotenv').config();
// This doesn't have to be a logged in session
// Any session will work to avoid a redirect chain on ebird.org
// Should have "_ga" and other cookies
const CookieString = process.env.EMBED_COOKIE ?? '';

const CHECKLISTS_URL = 'https://ebird.org/mychecklists/';
const SPECIES_URL = 'https://ebird.org/lifelist/';

/**
 * @typedef Context
 * @property year {string}
 * @property previousYear {string}
 * @property region {string}
 */

/** @typedef {import('node-html-parser').HTMLElement} HTMLElement */

/**
 * Script for getting ebird stats
 *
 * - Annual stats: new birds, annual total birds/checklists
 * - Stats by region
 *
    New Species: 2
    Year Species: 17
    Total Species: 17
    Year Checklists: 3
 *
 * Run by passing in the year and optionally the region
 * ```bash
 * node _build/scripts/get-ebird-stats.js 2022 US-CA
 * ```
 */
async function main() {
	const scriptArg = process.argv.findIndex((arg) =>
		arg.includes('get-ebird-stats.js')
	);
	const defaultYear = String(new Date().getFullYear() - 1);
	const [year = defaultYear, region = ''] = process.argv.slice(scriptArg + 1);
	const previousYear = String(parseInt(year) - 1);
	if (previousYear === 'NaN') {
		console.error('Problem parsing year', year);
		process.exit(1);
	}
	console.log('Processing', { year, region });

	/** @type {Context} */
	const context = { year, previousYear, region };

	const species = await countSpecies(context);
	const checklists = await countChecklists(context);

	console.log('Information parsed', species, checklists);

	console.log(`
### ${region || 'World'} Stats
- New Species: ${species.newSpecies} (${species.newRegionLifers} Lifers)
- Year Species: ${species.yearSpeciesTotal}
- Total Species: ${species.totalSpecies}
- Year Checklists: ${checklists.yearChecklists}
- Total Checklists: ${checklists.totalChecklists}

#### Reference Data
- [Species](${species.yearSpeciesUrl})
- [Checklists](${checklists.yearChecklistsUrl})
- Previous year new species: ${species.previousYearNewSpecies}
- Previous year checklists: ${checklists.previousYearChecklists}
`);
}

/**
 * Get total for a particular url
 * @param {HTMLElement} document
 * @return  {number | undefined} total parsed from page
 */
function getTotal(document) {
	return parseInt(document.querySelector('#total')?.innerText || '-1');
}

/**
 * Get year and total species counts for a region
 *
 * @param   {Context} context Context object with year/region info
 */
async function countSpecies({ year, previousYear, region }) {
	// Can't get total from #total element because there could be newer species
	const speciesListDocument = await fetchHtml(SPECIES_URL + region);
	const dates = speciesListDocument.querySelectorAll(
		'#nativeNatProv .Observation-meta-date a'
	);

	// Find first element that matches the year
	const matchingSpeciesElementIndex = dates.findIndex((element) =>
		element.innerText.includes(year)
	);

	// Numbers use CSS counter so get by position in array instead
	const totalSpecies = dates.length - matchingSpeciesElementIndex;
	const newSpecies = dates.filter((element) =>
		element.innerHTML.includes(year)
	).length;
	const previousYearNewSpecies = dates.filter((element) =>
		element.innerHTML.includes(previousYear)
	).length;

	const yearSpeciesUrl = SPECIES_URL + region + `?year=${year}&time=year`;
	// Get total for current year
	const yearSpeciesTotal = await fetchHtml(yearSpeciesUrl).then(getTotal);
	// Get total for previous year
	const previousYearSpeciesTotal = await fetchHtml(
		yearSpeciesUrl.replace(year, previousYear)
	).then(getTotal);

	// Get new lifers
	const lifersDocument = await fetchHtml(SPECIES_URL);
	const yearLifers = lifersDocument
		.querySelectorAll('#nativeNatProv .Observation-meta-date a')
		.filter((element) => element.innerText.includes(year));
	const newRegionLifers = yearLifers.filter((element) =>
		element
			.closest('li')
			.querySelector('.Observation-meta-location a:last-of-type')
			?.innerText.includes(region)
	).length;

	return {
		totalSpecies,
		newSpecies,
		newRegionLifers,
		previousYearNewSpecies,
		yearSpeciesTotal,
		previousYearSpeciesTotal,
		yearSpeciesUrl,
	};
}

/**
 * Get year and total checklist counts for a region
 *
 * Checklists page is paginated. Assumes Less than 100 checklists since last of year.
 *
 * @param   {Context}  context
 */
async function countChecklists({ year, previousYear, region }) {
	// Can't get total from #total element because there could be newer checklists
	const allChecklistsDocument = await fetchHtml(CHECKLISTS_URL + region);
	// Find first element that matches the year
	const dates = allChecklistsDocument.querySelectorAll(
		'#place-species-observed-results .ResultsStats-title'
	);

	const matchingChecklistElement = dates.find((element) =>
		element.innerText.includes(year)
	);
	// Sibling to title should contain the number followed by a period
	const totalChecklistsText =
		matchingChecklistElement?.previousElementSibling?.innerText || '-1';
	const totalChecklists = parseInt(totalChecklistsText.replace('.', ''));

	const yearChecklistsUrl = CHECKLISTS_URL + region + `?year=${year}`;
	const yearChecklists = await fetchHtml(yearChecklistsUrl).then(getTotal);
	const previousYearChecklists = await fetchHtml(
		yearChecklistsUrl.replace(year, previousYear)
	).then(getTotal);

	return {
		yearChecklists,
		totalChecklists,
		previousYearChecklists,
		yearChecklistsUrl,
	};
}

/**
 * Fetch a page and parse it's DOM tree
 *
 * @param   {string}  url  full URL
 */
async function fetchHtml(url) {
	const { default: fetch } = await import('node-fetch');
	const { parse } = await import('node-html-parser');

	const response = await fetch(url, {
		headers: { Cookie: CookieString },
	}).catch((error) => {
		let { message } = error;
		if (error.message.includes('maximum redirect')) {
			message = 'Website Cookie expired. Please update.';
		}
		console.error('Unable to fetch url', url, message);
		process.exit(1);
	});

	const html = await response.text();
	console.log('Page loaded', url);

	return parse(html);
}

main();

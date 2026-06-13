// @ts-check
/**
 * Script to process an eBird data export CSV and produce a JSON summary
 * for use in Liquid templates.
 *
 * Usage:
 *   node _build/scripts/process-ebird-csv.js <path-to-MyEBirdData.csv>
 *
 * Output:
 *   _data/ebird.json
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../../_data/ebird.json');

// ---------------------------------------------------------------------------
// CSV parsing
// ---------------------------------------------------------------------------

/**
 * Parse a CSV string into an array of objects using the first row as headers.
 * Handles double-quoted fields (including embedded commas and escaped quotes).
 *
 * @param {string} text
 * @returns {Record<string, string>[]}
 */
function parseCsv(text) {
	const lines = text.replace(/\r\n?/g, '\n').split('\n');
	const headers = splitCsvRow(lines[0]);
	/** @type {Record<string, string>[]} */
	const rows = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;
		const values = splitCsvRow(line);
		/** @type {Record<string, string>} */
		const row = {};
		headers.forEach((h, idx) => {
			row[h] = values[idx] ?? '';
		});
		rows.push(row);
	}
	return rows;
}

/**
 * Split a single CSV row into fields, respecting double-quoted values.
 *
 * @param {string} line
 * @returns {string[]}
 */
function splitCsvRow(line) {
	const fields = [];
	let current = '';
	let inQuotes = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (inQuotes) {
			if (ch === '"') {
				// Check for escaped quote ("")
				if (line[i + 1] === '"') {
					current += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				current += ch;
			}
		} else {
			if (ch === '"') {
				inQuotes = true;
			} else if (ch === ',') {
				fields.push(current);
				current = '';
			} else {
				current += ch;
			}
		}
	}
	fields.push(current);
	return fields;
}

// ---------------------------------------------------------------------------
// Region helpers
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} ISO 3166-1 alpha-2 -> country name */
const COUNTRY_NAMES = {
	CA: 'Canada',
	CR: 'Costa Rica',
	FR: 'France',
	GT: 'Guatemala',
	IT: 'Italy',
	LR: 'Liberia',
	MX: 'Mexico',
	NL: 'Netherlands',
	PE: 'Peru',
	SN: 'Senegal',
	SV: 'El Salvador',
	US: 'United States',
	VA: 'Vatican City',
	XK: 'Kosovo',
};

/** @type {Record<string, string>} US state code -> state name */
const US_STATE_NAMES = {
	'US-AL': 'Alabama',
	'US-AK': 'Alaska',
	'US-AZ': 'Arizona',
	'US-AR': 'Arkansas',
	'US-CA': 'California',
	'US-CO': 'Colorado',
	'US-CT': 'Connecticut',
	'US-DE': 'Delaware',
	'US-FL': 'Florida',
	'US-GA': 'Georgia',
	'US-HI': 'Hawaii',
	'US-ID': 'Idaho',
	'US-IL': 'Illinois',
	'US-IN': 'Indiana',
	'US-IA': 'Iowa',
	'US-KS': 'Kansas',
	'US-KY': 'Kentucky',
	'US-LA': 'Louisiana',
	'US-ME': 'Maine',
	'US-MD': 'Maryland',
	'US-MA': 'Massachusetts',
	'US-MI': 'Michigan',
	'US-MN': 'Minnesota',
	'US-MS': 'Mississippi',
	'US-MO': 'Missouri',
	'US-MT': 'Montana',
	'US-NE': 'Nebraska',
	'US-NV': 'Nevada',
	'US-NH': 'New Hampshire',
	'US-NJ': 'New Jersey',
	'US-NM': 'New Mexico',
	'US-NY': 'New York',
	'US-NC': 'North Carolina',
	'US-ND': 'North Dakota',
	'US-OH': 'Ohio',
	'US-OK': 'Oklahoma',
	'US-OR': 'Oregon',
	'US-PA': 'Pennsylvania',
	'US-RI': 'Rhode Island',
	'US-SC': 'South Carolina',
	'US-SD': 'South Dakota',
	'US-TN': 'Tennessee',
	'US-TX': 'Texas',
	'US-UT': 'Utah',
	'US-VT': 'Vermont',
	'US-VA': 'Virginia',
	'US-WA': 'Washington',
	'US-WV': 'West Virginia',
	'US-WI': 'Wisconsin',
	'US-WY': 'Wyoming',
};

/**
 * Given an eBird State/Province code (e.g. "US-CA", "MX-OAX", "CR-P"),
 * return the country code (e.g. "US", "MX", "CR").
 *
 * @param {string} stateProvince
 * @returns {string}
 */
function countryCode(stateProvince) {
	return stateProvince.split('-')[0];
}

/**
 * Return the set of region codes we want to track for a given observation.
 * - Always includes the country code.
 * - For US observations, also includes the full "US-XX" state code.
 *
 * @param {string} stateProvince  e.g. "US-CA"
 * @returns {string[]}
 */
function regionCodesFor(stateProvince) {
	const country = countryCode(stateProvince);
	if (country === 'US' && stateProvince.includes('-')) {
		return [country, stateProvince];
	}
	return [country];
}

/**
 * Keep only species-level taxa using scientific-name shape.
 * Excludes subspecies/forms/groups/hybrids/domestic types that inflate counts.
 *
 * @param {string} scientificName
 * @returns {boolean}
 */
function isSpeciesLevelTaxon(scientificName) {
	const parts = scientificName.trim().split(/\s+/);
	if (parts.length !== 2) return false;
	const [genus, species] = parts;
	if (!/^[A-Z][A-Za-z-]+$/.test(genus)) return false;
	if (!/^[a-z-]+$/.test(species)) return false;
	return true;
}

/**
 * Parse ML Catalog Numbers field into individual numeric IDs.
 *
 * @param {string} value
 * @returns {string[]}
 */
function parseMediaIds(value) {
	if (!value) return [];
	return value
		.trim()
		.split(/\s+/)
		.filter((id) => /^\d+$/.test(id));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		console.error(
			'Usage: node _build/scripts/process-ebird-csv.js <path-to-MyEBirdData.csv>',
		);
		process.exit(1);
	}

	const csvPath = resolve(args[0]);
	console.log(`Reading: ${csvPath}`);
	const text = readFileSync(csvPath, 'utf8');
	const rows = parseCsv(text);
	console.log(`Parsed ${rows.length} observation rows`);

	const currentYear = new Date().getFullYear();

	// -------------------------------------------------------------------------
	// Accumulators
	// -------------------------------------------------------------------------

	/**
	 * @typedef {{
	 *   commonName: string,
	 *   scientificName: string,
	 *   taxonomicOrder: number,
	 *   observationCount: number,
	 *   totalCount: number,
	 *   mlCatalogNumber: string,
	 *   firstSighting: { date: string, region: string, checklistId: string },
	 *   lastSighting:  { date: string, region: string, checklistId: string },
	 * }} LifeListEntry
	 */
	/** @type {Map<string, LifeListEntry>} keyed by scientific name */
	const lifeListMap = new Map();

	/** @type {Map<number, Set<string>>} year -> set of scientific names */
	const yearlySpecies = new Map();

	/**
	 * @typedef {{
	 *   code: string,
	 *   allTimeSpecies: Set<string>,
	 *   byYear: Map<number, Set<string>>,
	 *   totalDurationMin: number,
	 *   totalDistanceKm: number,
	 *   byYearDuration: Map<number, { durationMin: number, distanceKm: number }>,
	 * }} RegionAccumulator
	 */
	/** @type {Map<string, RegionAccumulator>} */
	const regionMap = new Map();

	/** @type {Map<string, { stateProvince: string, year: number, durationMin: number, distanceKm: number }>} */
	const submissionMap = new Map();

	/** @type {Map<string, Set<string>>} date (YYYY-MM-DD) -> set of scientific names */
	const dailySpecies = new Map();

	/**
	 * @typedef {{
	 *   id: string,
	 *   date: string,
	 *   commonName: string,
	 *   scientificName: string,
	 *   region: string,
	 * }} MediaEntry
	 */
	/** @type {Map<string, MediaEntry>} keyed by media id */
	const mediaMap = new Map();

	// -------------------------------------------------------------------------
	// Process each row
	// -------------------------------------------------------------------------

	for (const row of rows) {
		const submissionId = row['Submission ID'];
		const scientificName = row['Scientific Name'];
		const commonName = row['Common Name'];
		const taxonomicOrder = parseFloat(row['Taxonomic Order']) || 0;
		const stateProvince = row['State/Province'];
		const date = row['Date']; // "YYYY-MM-DD"
		const countStr = row['Count'];
		const individualCount = parseInt(countStr) || 0;
		const mlCatalogNumbers = row['ML Catalog Numbers'];
		const durationMin = parseFloat(row['Duration (Min)']) || 0;
		const distanceKm = parseFloat(row['Distance Traveled (km)']) || 0;
		const year = parseInt(date.split('-')[0]);

		if (!scientificName || !date) continue;

		// Skip slash species (e.g. "Cackling/Canada Goose") and unidentified ("sp.")
		if (commonName.includes('/') || commonName.includes('sp.')) continue;
		if (!isSpeciesLevelTaxon(scientificName)) continue;

		// -- Capture media IDs for most recent embeds --
		for (const id of parseMediaIds(mlCatalogNumbers)) {
			const existingMedia = mediaMap.get(id);
			if (!existingMedia || date > existingMedia.date) {
				mediaMap.set(id, {
					id,
					date,
					commonName,
					scientificName,
					region: stateProvince,
				});
			}
		}

		// -- Track unique submissions for checklist-level stats --
		if (!submissionMap.has(submissionId)) {
			submissionMap.set(submissionId, {
				stateProvince,
				year,
				durationMin,
				distanceKm,
			});
		}

		// -- Life list --
		const mlCatalogNumber = mlCatalogNumbers.split(' ')[0] || '';
		const existing = lifeListMap.get(scientificName);
		if (!existing) {
			lifeListMap.set(scientificName, {
				commonName,
				scientificName,
				taxonomicOrder,
				observationCount: 1,
				totalCount: individualCount,
				mlCatalogNumber,
				firstSighting: {
					date,
					region: stateProvince,
					checklistId: submissionId,
				},
				lastSighting: {
					date,
					region: stateProvince,
					checklistId: submissionId,
				},
			});
		} else {
			existing.observationCount += 1;
			existing.totalCount += individualCount;
			if (!existing.mlCatalogNumber && mlCatalogNumber) {
				existing.mlCatalogNumber = mlCatalogNumber;
			}
			if (date < existing.firstSighting.date) {
				existing.firstSighting = {
					date,
					region: stateProvince,
					checklistId: submissionId,
				};
			}
			if (date > existing.lastSighting.date) {
				existing.lastSighting = {
					date,
					region: stateProvince,
					checklistId: submissionId,
				};
			}
		}

		// -- Yearly species counts (global) --
		if (!yearlySpecies.has(year)) {
			yearlySpecies.set(year, new Set());
		}
		yearlySpecies.get(year).add(scientificName);

		// -- Daily species counts --
		if (!dailySpecies.has(date)) {
			dailySpecies.set(date, new Set());
		}
		dailySpecies.get(date).add(scientificName);

		// -- Region accumulation (species sets) --
		for (const regionCode of regionCodesFor(stateProvince)) {
			if (!regionMap.has(regionCode)) {
				regionMap.set(regionCode, {
					code: regionCode,
					allTimeSpecies: new Set(),
					byYear: new Map(),
					totalDurationMin: 0,
					totalDistanceKm: 0,
					byYearDuration: new Map(),
				});
			}
			const region = regionMap.get(regionCode);
			region.allTimeSpecies.add(scientificName);
			if (!region.byYear.has(year)) {
				region.byYear.set(year, new Set());
			}
			region.byYear.get(year).add(scientificName);
		}
	}

	// -- Add checklist duration/distance totals to regions and build yearly totals --
	/** @type {Map<number, { durationMin: number, distanceKm: number }>} */
	const yearlyDuration = new Map();
	for (const {
		stateProvince,
		year,
		durationMin,
		distanceKm,
	} of submissionMap.values()) {
		// Per-year global totals
		if (!yearlyDuration.has(year)) {
			yearlyDuration.set(year, { durationMin: 0, distanceKm: 0 });
		}
		const yd = yearlyDuration.get(year);
		yd.durationMin += durationMin;
		yd.distanceKm += distanceKm;

		// Per-region totals (all-time and by year)
		for (const regionCode of regionCodesFor(stateProvince)) {
			const region = regionMap.get(regionCode);
			if (region) {
				region.totalDurationMin += durationMin;
				region.totalDistanceKm += distanceKm;
				if (!region.byYearDuration.has(year)) {
					region.byYearDuration.set(year, {
						durationMin: 0,
						distanceKm: 0,
					});
				}
				const ryd = region.byYearDuration.get(year);
				ryd.durationMin += durationMin;
				ryd.distanceKm += distanceKm;
			}
		}
	}

	// -------------------------------------------------------------------------
	// Serialize
	// -------------------------------------------------------------------------

	// Life list sorted by first sighting date descending (most recently added species first)
	const lifeList = Array.from(lifeListMap.values()).sort((a, b) =>
		b.firstSighting.date.localeCompare(a.firstSighting.date),
	);

	// Per-year big day: earliest date with the highest distinct species count
	/** @type {Map<number, { date: string, speciesCount: number }>} */
	const yearlyBigDay = new Map();
	for (const [date, species] of dailySpecies.entries()) {
		const year = parseInt(date.split('-')[0]);
		const count = species.size;
		const current = yearlyBigDay.get(year);
		if (
			!current ||
			count > current.speciesCount ||
			(count === current.speciesCount && date < current.date)
		) {
			yearlyBigDay.set(year, { date, speciesCount: count });
		}
	}

	// Yearly stats as an array sorted by year descending (most recent first)
	// Year 1900 is a placeholder eBird uses for undated historical observations — exclude it
	const yearlyStats = [...yearlySpecies.entries()]
		.filter(([year]) => year !== 1900)
		.sort(([a], [b]) => b - a)
		.map(([year, species]) => {
			const dur = yearlyDuration.get(year) ?? {
				durationMin: 0,
				distanceKm: 0,
			};
			return {
				year: String(year),
				speciesCount: species.size,
				durationMin: Math.round(dur.durationMin),
				distanceKm: Math.round(dur.distanceKm * 10) / 10,
				bigDay: yearlyBigDay.get(year) ?? null,
			};
		});

	const recentMedia = Array.from(mediaMap.values())
		.sort((a, b) => {
			if (a.date !== b.date) return b.date.localeCompare(a.date);
			return b.id.localeCompare(a.id);
		})
		.map((entry) => ({
			...entry,
			embedUrl: `https://macaulaylibrary.org/asset/${entry.id}/embed`,
		}));

	/**
	 * Serialize one region accumulator to a plain object.
	 * byYear becomes an array sorted by year descending.
	 *
	 * @param {string} code
	 * @param {string} name
	 * @param {RegionAccumulator} acc
	 */
	const serializeRegion = (code, name, acc) => {
		const byYear = [...acc.byYear.entries()]
			.sort(([a], [b]) => b - a)
			.map(([year, species]) => ({
				year: String(year),
				count: species.size,
			}));

		const speciesList = Array.from(acc.allTimeSpecies)
			.map((sciName) => lifeListMap.get(sciName))
			.filter(Boolean)
			.sort((a, b) => a.taxonomicOrder - b.taxonomicOrder)
			.map(({ commonName, scientificName, taxonomicOrder }) => ({
				commonName,
				scientificName,
				taxonomicOrder,
			}));

		const curYearDur = acc.byYearDuration.get(currentYear) ?? {
			durationMin: 0,
			distanceKm: 0,
		};
		return {
			code,
			name,
			allTimeCount: acc.allTimeSpecies.size,
			allTimeDurationMin: Math.round(acc.totalDurationMin),
			allTimeDistanceKm: Math.round(acc.totalDistanceKm * 10) / 10,
			currentYearCount: acc.byYear.get(currentYear)?.size ?? 0,
			currentYearDurationMin: Math.round(curYearDur.durationMin),
			currentYearDistanceKm: Math.round(curYearDur.distanceKm * 10) / 10,
			byYear,
			species: speciesList,
		};
	};

	// Split into countries and US states; skip malformed codes like "US-"
	const countries = [];
	const usStates = [];
	for (const [code, acc] of regionMap.entries()) {
		if (code.startsWith('US-')) {
			const name = US_STATE_NAMES[code];
			if (!name) continue; // skip "US-" or unknown sub-regions
			usStates.push(serializeRegion(code, name, acc));
		} else {
			const name = COUNTRY_NAMES[code] ?? code;
			countries.push(serializeRegion(code, name, acc));
		}
	}
	// Sort by all-time species count descending
	countries.sort((a, b) => b.allTimeCount - a.allTimeCount);
	usStates.sort((a, b) => b.allTimeCount - a.allTimeCount);

	// -------------------------------------------------------------------------
	// Write output
	// -------------------------------------------------------------------------

	const output = {
		processedAt: new Date().toISOString(),
		totalSpecies: lifeListMap.size,
		lifeList,
		recentMedia,
		yearlyStats,
		countries,
		usStates,
	};

	writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
	console.log(`Written: ${OUTPUT_PATH}`);
	console.log(
		`  ${lifeListMap.size} species | ${countries.length} countries | ${usStates.length} US states | ${yearlyStats.length} years`,
	);
}

main();

/**
 * Replacement for official i18n plugin
 *
 * @see https://www.11ty.dev/docs/plugins/i18n/
 */

class LangUtils {
	static getLanguageCodeFromInputPath(filepath) {
		return (filepath || '').includes('/es/') ? 'es' : 'en-US';
	}

	static getLanguageCodeFromUrl(url) {
		return (url || '').includes('/es/') ? 'es' : 'en-US';
	}

	static swapLanguageCodeNoCheck(str, langCode) {
		return str.replace('/es/', '/');
	}
}

/**
 *
 * @param {string} inputPath
 * @param {*} extensionMap
 * @returns
 */
function normalizeInputPath(inputPath, extensionMap) {
	if (extensionMap) {
		return extensionMap.removeTemplateExtension(inputPath);
	}
	return inputPath;
}

/**
 * Input: {
 *   '/test/': './test/stubs-i18n/test.liquid',
 *   '/es/test/': './test/stubs-i18n/es/test.njk',
 *   '/non-lang-file/': './test/stubs-i18n/non-lang-file.njk'
 * }
 *
 * Output: {
 *   '/test/': [ { url: '/test/' }, { url: '/es/test/' } ],
 *   '/es/test/': [ { url: '/test/' }, { url: '/en/test/' } ]
 * }
 * @param urlToInputPath {Record<string, string>}
 * @returns {Record<string, {url: string}[]>}
 */
function getLocaleUrlsMap(urlToInputPath, extensionMap, options = {}) {
	let filemap = {};

	for (let url in urlToInputPath) {
		// Group number comes from Pagination.js
		let { inputPath: originalFilepath, groupNumber } = urlToInputPath[url];
		let filepath = normalizeInputPath(originalFilepath, extensionMap);
		let replaced =
			LangUtils.swapLanguageCodeNoCheck(filepath, '__11ty_i18n') +
			`_group:${groupNumber}`;

		if (!filemap[replaced]) {
			filemap[replaced] = [];
		}

		let langCode = LangUtils.getLanguageCodeFromInputPath(originalFilepath);

		filemap[replaced].push({
			url,
			lang: langCode,
			label: langCode == 'es' ? 'Español' : 'English',
		});
	}

	// Default sorted by lang code
	for (let key in filemap) {
		filemap[key].sort(function (a, b) {
			if (a.lang < b.lang) {
				return -1;
			}
			if (a.lang > b.lang) {
				return 1;
			}
			return 0;
		});
	}

	// map of input paths => array of localized urls
	let urlMap = {};
	for (let filepath in filemap) {
		for (let entry of filemap[filepath]) {
			let url = entry.url;
			if (!urlMap[url]) {
				urlMap[url] = filemap[filepath].filter((entry) => {
					if (
						entry.url.includes('/page/') ||
						entry.url.includes('/tags/')
					) {
						return false;
					}
					if (entry.lang) {
						return true;
					}
					return entry.url !== url;
				});
			}
		}
	}
	return urlMap;
}

/**
 * Replacement for official i18n plugin
 *
 * @see https://www.11ty.dev/docs/plugins/i18n/
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig, opts = {}) {
	let options = {
		defaultLanguage: '',
		errorMode: 'strict', // allow-fallback, never
		...opts,
		filters: {
			url: 'locale_url',
			links: 'locale_links',
			...opts?.filters,
		},
	};

	let extensionMap;
	eleventyConfig.on('eleventy.extensionmap', (map) => {
		extensionMap = map;
	});

	let contentMaps = {};
	eleventyConfig.on(
		'eleventy.contentMap',
		function ({ urlToInputPath, inputPathToUrl }) {
			contentMaps.inputPathToUrl = inputPathToUrl;
			contentMaps.urlToInputPath = urlToInputPath;

			contentMaps.localeUrlsMap = getLocaleUrlsMap(
				urlToInputPath,
				extensionMap,
				options,
			);
		},
	);
	eleventyConfig.addFilter('locale_url', function (url, langCodeOverride) {
		let langCode =
			langCodeOverride ||
			LangUtils.getLanguageCodeFromUrl(this.page?.url) ||
			options.defaultLanguage;

		// Already has a language code on it and has a relevant url with the target language code
		if (
			contentMaps.localeUrlsMap[url] ||
			(!url.endsWith('/') && contentMaps.localeUrlsMap[`${url}/`])
		) {
			for (let existingUrlObj of contentMaps.localeUrlsMap[url] ||
				contentMaps.localeUrlsMap[`${url}/`]) {
				if (
					langCode.includes('en') &&
					url.includes('/es/') &&
					!existingUrlObj.url.includes('/es/')
				) {
					return existingUrlObj.url;
				}
				if (existingUrlObj.url?.includes(`/${langCode}/`)) {
					return existingUrlObj.url;
				}
			}
		}

		// Needs the language code prepended to the URL
		let prependedLangCodeUrl = `/${langCode}${url}`;
		if (
			contentMaps.localeUrlsMap[prependedLangCodeUrl] ||
			(!prependedLangCodeUrl.endsWith('/') &&
				contentMaps.localeUrlsMap[`${prependedLangCodeUrl}/`])
		) {
			return prependedLangCodeUrl;
		}

		if (
			contentMaps.urlToInputPath[url] ||
			(!url.endsWith('/') && contentMaps.urlToInputPath[`${url}/`])
		) {
			// this is not a localized file (independent of a language code)
			if (options.errorMode === 'strict') {
				throw new Error(
					`Localized file for URL ${prependedLangCodeUrl} was not found in your project. A non-localized version does exist—are you sure you meant to use the \`${options.filters.url}\` filter for this? You can bypass this error using the \`errorMode\` option in the I18N plugin (current value: "${options.errorMode}").`,
				);
			}
		} else if (options.errorMode === 'allow-fallback') {
			// You’re linking to a localized file that doesn’t exist!
			throw new Error(
				`Localized file for URL ${prependedLangCodeUrl} was not found in your project! You will need to add it if you want to link to it using the \`${options.filters.url}\` filter. You can bypass this error using the \`errorMode\` option in the I18N plugin (current value: "${options.errorMode}").`,
			);
		}

		return url;
	});

	eleventyConfig.addFilter('locale_links', (urlOverride) => {
		let url = urlOverride || this.page?.url;
		return (contentMaps.localeUrlsMap[url] || []).filter((entry) => {
			return entry.url !== url;
		});
	});

	eleventyConfig.addGlobalData('eleventyComputed.page.lang', () => {
		return (data) => {
			return data.lang;
		};
	});
}

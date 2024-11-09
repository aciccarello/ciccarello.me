import { readFile } from 'node:fs/promises';

// @ts-check
/**
 * This file generates the Netlify CMS config file
 * See the class below for the core configuration.
 */

/**
 * @typedef {Object} Field - A field definition for netlify cms
 * @property {string} name - identifier for the field
 * @property {string} label - a number property of SpecialType
 * @property {string} widget - a number property of SpecialType
 * @property {string} [hint] - helper text directly below a widget. Useful for including instructions. Accepts markdown for bold, italic, strikethrough, and links.
 * @property {string} [date_format] - moment format for displayed date only, for datetime widgets
 * @property {string} [time_format] - moment format for displayed time only, for datetime widgets
 * @property {boolean} [picker_utc] - whether to use UTC for dates, for datetime widgets
 * @property {boolean} [required] - whether the field is required or not
 * @property {boolean} [allow_multiple] - ??
 * @property {boolean} [multiple] - ??
 * @property {boolean} [allow_add] - wether to allow adding values, for widgets with multiple=true
 */

/**
 * @typedef {Object} Collection - A collection definition for netlify cms
 * @property {string} name - identifier for the collection
 * @property {string} label - Text label for the collection
 * @property {string} [label_singular] - Text label for an individual element of the collection
 * @property {string} folder - where to store files for these items
 * @property {boolean} create - whether to allow creating new elements
 * @property {string} slug - filename template string
 * @property {string} [preview_path] - public url template string
 * @property {{preview: boolean}} [editor] - editor pannel config
 * @property {Field[]} fields - fields to show on collection items
 * @property {{label: string, field: string, pattern: any}[]} [view_filters] - filtering options
 * @property {{label: string, field: string, pattern: any}[]} [view_groups] - grouping options
 */

/**
 * Identity function. Coerces string/number literals to value-as-type.
 * @template {string | number} T
 * @param {T} v
 * @return {T}
 */
function asConst(v) {
	return v;
}

/**
 * Map field templates to a values
 * @template {Partial<Field> & Pick<Field, 'name'>} T
 * @param {T} field
 * @return {Field}
 */
function addFieldDefaults(field) {
	return {
		label: toTitleCase(field.name),
		widget: 'string',
		...field,
	};
}

/**
 * Map field templates to a values
 * @template {Array<Partial<Field> & Pick<Field, 'name'>>} T
 * @param {T} fieldsArray
 * @return {Record<T[number]['name'], Field>}
 */
function generateFieldMap(fieldsArray) {
	const defaultedFields = fieldsArray.map(addFieldDefaults);
	const map = defaultedFields.reduce(
		(fieldMap, field) => ({
			...fieldMap,
			[field.name]: field,
		}),
		/** @type {Record<T[number]['name'], Field>} */ ({}),
	);
	return map;
}

/**
 * Map of fields, updated with default values
 */
const fields = generateFieldMap([
	{
		label: 'Title',
		name: asConst('title'),
	},
	{
		name: asConst('subtitle'),
		required: false,
	},
	{
		label: 'Publish Date',
		name: asConst('date'),
		widget: 'datetime',
		date_format: 'YYYY-MM-DD',
		time_format: 'HH:mm:ss[Z]',
		picker_utc: true,
	},
	{
		name: asConst('slug'),
		widget: 'id',
		hint: 'This is used to create the url',
	},
	{
		label: 'Canonical URL',
		name: asConst('canonical_url'),
		required: false,
	},
	{
		name: asConst('permalink'),
		required: false,
	},
	{
		widget: 'list',
		name: asConst('tags'),
		multiple: true,
		allow_add: true,
		required: false,
	},
	{
		label: 'Main image',
		name: asConst('image'),
		widget: 'image',
		required: false,
		allow_multiple: false,
	},
	{
		label: 'Alt Text',
		name: asConst('image_alt'),
		required: false,
	},
	{
		name: asConst('image_caption'),
		required: false,
	},
	{
		name: asConst('body'),
		widget: 'markdown',
	},
	{
		widget: 'list',
		name: asConst('syndication'),
		multiple: true,
		allow_add: true,
		required: false,
	},
	{
		name: asConst('bookmark-of'),
		required: false,
	},
	{
		name: asConst('like-of'),
		required: false,
	},
	{
		name: asConst('in-reply-to'),
		required: false,
	},
	{
		name: asConst('excludeFromMainFeed'),
		label: 'Exclude from main feed',
		widget: 'boolean',
		required: false,
		default: undefined,
	},
	{
		name: asConst('eleventyExcludeFromCollections'),
		label: 'Hidd from collections',
		widget: 'boolean',
		required: false,
		default: undefined,
	},
	{
		name: asConst('eleventyExcludeFromCollectionsReason'),
		label: 'Unlisted reason, to be used with eleventyExcludeFromCollections',
		widget: 'select',
		required: false,
		options: ['', 'draft', 'hidden', 'deleted', 'testing'],
	},
	{
		name: asConst('updates'),
		widget: 'list',
		required: false,
		fields: [
			{
				name: 'date',
				widget: 'datetime',
				required: true,
				date_format: 'YYYY-MM-DD',
				time_format: 'HH:mm:ss[Z]',
				picker_utc: true,
			},
			{ name: 'description', widget: 'string', required: true },
		],
	},
	{
		name: asConst('references'),
		widget: 'list',
		required: false,
		fields: [
			{ name: 'url', widget: 'string', required: true },
			{
				label: 'Reference URL',
				name: 'referenceIdUrl',
				hint: 'URL to match with like/reply/bookmark property. Primarily for micropub generated posts which might generate a reference object with a different `url` property.',
				widget: 'string',
				required: false,
			},
			{ name: 'name', widget: 'string', required: false },
			{ name: 'content', widget: 'text', required: false },
			{
				name: 'published',
				widget: 'datetime',
				required: false,
				default: '', // Default and format are required to allow empty input
				date_format: 'YYYY-MM-DD',
				time_format: 'HH:mm:ss[Z]',
				picker_utc: true,
			},
			{ name: 'post-type', widget: 'string', required: false },
			{
				name: 'author',
				widget: 'object',
				required: false,
				fields: [
					{ name: 'url', widget: 'string', required: false },
					{ name: 'name', widget: 'string', required: false },
					{ name: 'photo', widget: 'string', required: false },
				],
			},
			{
				name: 'photo',
				widget: 'object',
				required: false,
				fields: [
					{ name: 'value', widget: 'string', required: false },
					{ name: 'alt', widget: 'text', required: false },
				],
			},
		],
	},
]);

/**
 * Converts a underscore or space separated string to Title Case
 *
 * @param   {string}  input  String to convert to Title Case
 *
 * @return  {string}         input converted to Title Case
 */
function toTitleCase(input) {
	return input
		.split(/[ _]/g)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Add default fields to a collection
 * @template {Partial<Collection> & Pick<Collection, 'name'>} T
 * @param {T} collection
 * @return {Collection}
 */
function addDefaultsToCollection(collection) {
	const label = collection.label ?? toTitleCase(collection.name);
	const hasField = (nameToFind) =>
		Boolean(
			collection.fields &&
				collection.fields.find(({ name }) => name === nameToFind),
		);
	const titleDependentProps = hasField('title')
		? {
				preview_path: 'posts/{{year}}/{{month}}/{{day}}/{{title}}',
			}
		: {
				identifier_field: 'slug',
				preview_path:
					'posts/{{year}}/{{month}}/{{day}}/{{fields.slug}}',
				summary: '{{body}}',
			};
	const view_filters = hasField('eleventyExcludeFromCollections')
		? [
				...(collection.view_filters || []),
				{
					label: 'Drafts',
					field: 'eleventyExcludeFromCollections',
					pattern: 'draft',
				},
			]
		: collection.view_filters;
	/** @type {Collection} */
	const defaultedCollection = {
		// Default values
		label,
		label_singular: label.replace(/ies$/, 'y').replace(/s$/, ''),
		folder: `posts/${collection.name}`,
		create: true,
		slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
		...titleDependentProps,
		editor: {
			preview: false,
		},
		fields: [], // TODO: Default fields
		...collection,
		view_filters,
	};
	return defaultedCollection;
}

/**
 * Decap CMS Admin Config
 */
export default class CmsConfig {
	/**
	 * 11ty page metadata
	 *
	 * @return  {Object}  Eleventy config
	 */
	data() {
		return {
			permalink: 'admin/config.yml',
			eleventyExcludeFromCollections: true,
		};
	}

	/**
	 * Actual string output for this file
	 *
	 * @return  {string}  file contents
	 */
	async render() {
		let featuredTags = JSON.parse(
			(
				await readFile(
					new URL('../posts/tags/tags.json', import.meta.url),
				)
			).toString(),
		).featured;
		/**
		 * Netlify Build variable
		 * @see https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
		 *
		 * @var {string}
		 */
		const branch = process.env.BRANCH || 'localhost';

		const config = {
			backend: {
				branch,
				squash_merges: true,
				name: 'github',
				repo: 'aciccarello/ciccarello.me',
			},
			site_url:
				branch === 'main'
					? 'https://www.ciccarello.me'
					: branch === 'dev'
						? 'https://dev.ciccarello.me'
						: 'http://localhost:8080',
			media_folder: 'assets/img',
			public_folder: '/assets/img',
			local_backend: true,
			slug: {
				encoding: 'unicode',
				clean_accents: true,
			},
			collections: [
				addDefaultsToCollection({
					name: 'blog',
					label: 'Articles',
					preview_path: 'blog/{{year}}/{{month}}/{{day}}/{{title}}',
					fields: [
						fields.title,
						fields.subtitle,
						fields.date,
						fields.canonical_url,
						fields.permalink,
						fields.tags,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						fields.body,
						fields.syndication,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				addDefaultsToCollection({
					name: 'recipes',
					preview_path:
						'recipes/{{year}}/{{month}}/{{day}}/{{title}}',
					fields: [
						fields.title,
						fields.subtitle,
						fields.date,
						fields.canonical_url,
						fields.permalink,
						fields.tags,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						{
							...fields.body,
							default:
								'## Summary\n- Prep Time\n- Cook Time\n- Servings\n\n{% recipe-ingredients %}\n-\n{% endrecipe-ingredients %}\n\n{% recipe-directions %}\n1.\n{% endrecipe-directions %}',
						},
						fields.syndication,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				addDefaultsToCollection({
					name: 'photos',
					fields: [
						fields.slug,
						fields.date,
						fields.tags,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						fields.body,
						fields.syndication,
						fields.canonical_url,
						fields.permalink,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				addDefaultsToCollection({
					name: 'notes',
					editor: {
						preview: false,
					},
					fields: [
						fields.date,
						fields.tags,
						fields.body,
						fields.slug,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						fields.syndication,
						fields.canonical_url,
						fields.permalink,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				addDefaultsToCollection({
					name: 'replies',
					editor: {
						preview: false,
					},
					fields: [
						fields.date,
						{ ...fields['in-reply-to'], required: true },
						fields.body,
						fields.slug,
						fields.references,
						fields.tags,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						fields.syndication,
						fields.permalink,
						fields.excludeFromMainFeed,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				addDefaultsToCollection({
					name: 'links',
					summary:
						"{{like-of | ternary('Like of ', '')}}{{like-of}}{{bookmark-of | ternary('Bookmark of ', '') }}{{bookmark-of}}",
					editor: {
						preview: false,
					},
					fields: [
						fields.date,
						fields.slug,
						fields['like-of'],
						fields['bookmark-of'],
						fields['in-reply-to'],
						fields.references,
						fields.tags,
						fields.image,
						fields.image_alt,
						fields.image_caption,
						{ ...fields.body, required: false, minimal: true },
						fields.syndication,
						fields.permalink,
						fields.excludeFromMainFeed,
						fields.eleventyExcludeFromCollections,
						fields.eleventyExcludeFromCollectionsReason,
						fields.updates,
					],
				}),
				{
					label: 'Settings',
					name: 'settings',
					editor: {
						preview: false,
					},
					files: [
						{
							label: 'Site',
							name: 'items',
							file: '_data/site.json',
							fields: [
								{
									label: 'Title',
									name: 'title',
									widget: 'string',
								},
								{
									label: 'Nav Items',
									name: 'header_pages',
									widget: 'list',
								},
								{
									label: 'Description',
									name: 'description',
									widget: 'text',
								},
							],
						},
						{
							label: 'Featured Links',
							name: 'links',
							file: '_data/links.json',
							preview_path: 'links',
							fields: [
								{
									label: 'Links Page Description',
									name: 'description',
									widget: 'string',
								},
								{
									label: 'Links',
									name: 'featured',
									widget: 'list',
									fields: [
										{
											label: 'Title',
											name: 'title',
											widget: 'string',
										},
										{
											label: 'URL',
											name: 'url',
											widget: 'string',
										},
									],
								},
								{
									label: 'Homepage',
									label_singular: 'group',
									name: 'homepage',
									widget: 'list',
									fields: [
										{
											label: 'Group Name',
											name: 'name',
											widget: 'string',
										},
										{
											label: 'Links',
											name: 'links',
											widget: 'list',
											fields: [
												{
													label: 'Title',
													name: 'title',
													widget: 'string',
												},
												{
													label: 'URL',
													name: 'url',
													widget: 'string',
												},
												{
													label: 'description',
													name: 'description',
													widget: 'string',
												},
												{
													label: 'Icon',
													name: 'icon',
													widget: 'string',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Tags',
							name: 'tags',
							file: 'posts/tags/tags.json',
							preview_path: 'tags',
							fields: [
								{
									label: 'Featured',
									name: 'featured',
									widget: 'list',
									multiple: true,
									allow_add: true,
								},
								{
									label: 'Descriptions',
									summary:
										'Text for tag pages. Add to the tags.json featured tags to add page.',
									name: 'descriptions',
									widget: 'object',
									fields: featuredTags.map((name) => ({
										name,
										label: toTitleCase(name),
										widget: 'string',
									})),
								},
							],
						},
					],
				},
				{
					label: 'Pages',
					name: 'pages',
					files: [
						...[
							{ file: 'colophon.md' },
							{ file: 'foster.liquid', label: 'Foster Care' },
							{ file: 'privacy.md' },
							{ file: 'subscribe.md' },
							{ file: 'referrals.md' },
							{ file: 'drafts.md' },
							{ file: 'search.md' },
						].map(({ file, ...other }) => {
							const [preview_path] = file.split('.');

							return {
								file,
								preview_path,
								name: preview_path,
								label: toTitleCase(preview_path),
								fields: [fields.title, fields.body],
								...other,
							};
						}),
					],
				},
			],
		};
		return JSON.stringify(config, null, '\t');
	}
}

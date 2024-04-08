---
title: How I imported my old tweets to my website
subtitle: "A journey, not a tutorial"
slug: twitter-import
date: 2024-04-07T22:25:30.913Z
tags:
  - site changes
  - technology
image: /assets/img/blue-tit-featured.jpg
image_alt: Small, round, blue and yellow songbird on a platform with a messy arrangement of birdseed.
image_caption: Blue tit. Photo by <a href="https://unsplash.com/@ameefairbankbrown?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Amee Fairbank-Brown</a> on <a href="https://unsplash.com/photos/yellow-white-and-blue-bird-on-brown-wooden-table-s98hEljDHNk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
eleventyExcludeFromCollections: draft
---

A while back, I [stopped using Twitter](/blog/2023/10/23/rethinking-social-media/).
Then when things started to get rocky at the company, I decided to export my data.
For a long time, that export sat on my computer's hard drive, but I recently got around to importing all those tweets into my site.
Honestly, most of them aren't worth saving, but it feels good to have them all collected on a site I control and without the rotating shenanigans that make the site unusable like tweet threads being broken if not logged in.
However, importing those posts into my site was not easy.

I'm going to describe my process here for others to draw from, but it's highly customized to my website.
There are also some other options you can consider if you are looking for a simpler export like the [tweetback project](https://github.com/tweetback/tweetback).

## Downloading Photos

My first attempt to generate markdown files was to use the [twitter-archive-parser](https://github.com/timhutton/twitter-archive-parser) Python script.
It is a pretty full-featured script that includes downloading images and generating markdown files.
However, I didn't like the file-per-month format.
If you know Python well, that tool is probably a more feature complete starting point than what I put together.
However, I didn't trust myself to write lots of Python, so I decided to stick with a language I was more familiar with: JavaScript.
The script was still helpful for gathering photos though.
The archive apparently has smaller files than the original, so the script downloads the larger version and puts all those files into a folder.

## Getting referenced tweet data

For both retweets and replies, the tweet list only shows a link.
So to get the tweet content, I used the twitter oembed API to generate a JSON file with that data.
There were quite a lot of tweets that were unavailable either because they were deleted or private so I also generated a list of failed requests.

```javascript
// Ran this separate from the main tweet generation file to avoid hitting the twitter api repeatedly
const { writeFile } = require('node:fs/promises');
/** List of twitter URLs to look up. Its a multiline string because I copied it from console output */
const references = `
https://twitter.com/MLB/status/1052781542337105920
`; // [EDIT THIS VARIABLE]

const tweets = [];
const errors = [];
Promise.all(
	references
		.split('\n')
		.map(async (url) => {
			if (url) {
				try {
					const response = await fetch(
						'https://publish.twitter.com/oembed?omit_script=true&url=' +
							url,
						{ headers: { Accept: 'application/json' } },
					);
					if (response.ok) {
						const json = await response.json();
						tweets.push(json);
					} else {
						console.error(
							'Problem fetching tweet',
							url,
							response.statusText,
						);
						errors.push(await response.text());
					}
          // I don't remember why I added this delay 🤔
					await new Promise((resolve) => setTimeout(resolve, 280));
				} catch (e) {
					console.error('Error fetching tweet', url, e);
				}
				console.log('Fetched', url);
			}
		}),
).then(() => {
	console.log('Writing file');
	writeFile('./referenced-tweets.json', JSON.stringify(tweets));
	writeFile('./reference-errors.json', JSON.stringify(errors));
});
```

## Adding alt text to media

With the tweets generated for the last time, I could now replace the alt text with something useful.
I could search for the TODO value in my codebase and write something for all those images.

## Sending mentions for tweet threads

Once the tweet archive was live, the links were set up to go up the tweet thread chain, but not see the replies.
So I ran this script to add the next response.
Ideally, I would add all the responses, but I'm not sure that would look great with my current webmention rendering.
The `send-webmentions.sh` file that the script generates runs a curl request to my webmention endpoint.

```bash
curl -i -d source=https://www.ciccarello.me/posts/2020/08/01/1289706912389292032/ -d target=https://www.ciccarello.me/posts/2020/08/01/1289684794662559745/ https://webmention.io/www.ciccarello.me/webmention
```

## The whole script

This script does require that the '@tweetback/canonical' npm package be installed.

```javascript

const { writeFile, copyFile } = require('node:fs/promises');

// Example of the tweet data for reference, but the actual content is pulled from the file
let tweetData = [
	{
		tweet: {
			edit_info: {
				initial: {
					editTweetIds: ['1254822726440587264'],
					editableUntil: '2020-04-27T17:50:26.119Z',
					editsRemaining: '5',
					isEditEligible: true,
				},
			},
			retweeted: false,
			source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
			entities: {
				hashtags: [],
				symbols: [],
				user_mentions: [],
				urls: [
					{
						url: 'https://t.co/tyTd1Uj4xi',
						expanded_url:
							'https://twitter.com/ForbesLindesay/status/1254788389942915075',
						display_url: 'twitter.com/ForbesLindesay…',
						indices: ['255', '278'],
					},
				],
			},
			display_text_range: ['0', '278'],
			favorite_count: '2',
			id_str: '1254822726440587264',
			truncated: false,
			retweet_count: '0',
			id: '1254822726440587264',
			possibly_sensitive: false,
			created_at: 'Mon Apr 27 17:20:26 +0000 2020',
			favorited: false,
			full_text:
				'I really respect the responsibility this library author took to write this up. Switching to es6 imports is going to require a lot of education of the node community so this is really helpful to see. Also, fixing things in under 3 hours is impressive. 👏👏👏 https://t.co/tyTd1Uj4xi',
			lang: 'en',
		},
	},
];

// Change window to globalThis in the tweets.js file
// Could probably change the file to use module.exports instead
const tweetFilePath = '/path/to/twitter-archive/data/tweets.js';
globalThis.YTD = { tweets: {} };
require(tweetFilePath);
tweetData = globalThis.YTD.tweets.part0; 

/**
 * A map of all the tweet IDs to script to their reason for skipping (for review reasons mainly)
 */
const tweetsToSkip = {
	1151656785842987010: 'instagram',
};
/** Map of URLs to data from the twitter oembed API (using file generated separately) */
const referencedTweets = require('../../referenced-tweets.json').reduce(
	(refMap, reference) => {
		refMap.set(reference.url, reference);
		return refMap;
	},
	new Map(),
);

/** Keep track of tweet threads for sending webmentions later */
const selfReplyPaths = [];

/** List of tweets with re-tweets removed */
const filteredTweets = tweetData.filter(
	({ tweet }) => !tweet.full_text.startsWith('RT '),
);

/** Array of promises for tweet post file creation */
const postCreationPromises = filteredTweets
	.map(async ({ tweet }, tweetIndex) => {
    // Library to look up twitter urls for people who have moved elsewhere
		const { transform: transformTweetUrl } = await import('@tweetback/canonical');
		if (tweetsToSkip[Number(tweet.id)]) {
			// Skip tweet
      // Didn't do this in the filter so we can more easily pull the text
			return;
		}
		const datePublished = new Date(tweet.created_at);
		/** The type folder to put the file in (for my internal folder structure */
		let type = 'notes';

		let tweetText = tweet.full_text;
		let hasEmbed = false;

		// Link user mentions
		// Need to map to a set to prevent duplicate mentions from getting replaced twice
		new Set(
			tweet.entities.user_mentions.map(({ screen_name }) => screen_name),
		).forEach((screen_name) => {
			tweetText = tweetText.replaceAll(
				'@' + screen_name,
				`[@${screen_name}](https://twitter.com/${screen_name})`,
			);
		});

		// Link hashtags
		tweet.entities.hashtags.forEach(({ text }) => {
			tweetText = tweetText.replaceAll(
				'#' + text,
				`[#${text}](/posts/tags/${text})`,
			);
		});

		// Replace t.co URLs
		tweet.entities.urls.forEach(({ url, expanded_url, display_url }) => {
			if (expanded_url.includes('twitter.com')) {
				const normalizedUrl = expanded_url.split('?')[0];
				if (referencedTweets.has(normalizedUrl)) {
					tweetText = tweetText.replace(
						url,
						referencedTweets.get(normalizedUrl).html,
					);
					hasEmbed = true;
				} else {
					const updatedUrl = transformTweetUrl(expanded_url);
					if (updatedUrl !== expanded_url) {
						console.log(
							'Found new canonical URL',
							updatedUrl,
							'for',
							expanded_url,
						);
					}
					tweetText = tweetText.replace(
						url,
						`[${display_url}](${updatedUrl})`,
					);
				}
			} else {
				tweetText = tweetText.replace(
					url,
					`[${display_url}](${expanded_url})`,
				);
			}
		});

		if (hasEmbed) {
      // Add script to see quote tweet content using Twitter's script
			tweetText += `
<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>`;
		}

		// Link Photos
		let featuredImage = '';
		let imageBody = '';
		let imageUrlToReplace = '';
		await Promise.all(
			tweet.extended_entities?.media?.map(
				async ({ url, media_url, video_info }, index) => {
					const fileName = media_url.split('/').at(-1);
					let newFileName;

					if (video_info) {
						for (const videoVariant of video_info.variants) {
							const { url: videoUrl } = videoVariant;
							try {
								newFileName = await copyMedia(
									videoUrl,
									tweet.id,
								);
								break;
							} catch (e) {
								// Retrying another file name
								console.log(
									'Failed to find video file for url',
									videoUrl,
								);
							}
						}
						if (!newFileName) {
							console.warn('Could not find video for', tweet.id);
						}
						// All my videos can be shown as notes since they are mostly gifs
						type = 'notes';
					} else {
						newFileName = await copyMedia(media_url, tweet.id);
					}
					if (index === 0) {
						// type = 'photos';
						// I'm categorizing all my photos as notes for now since I don't want them in the gallery
						imageUrlToReplace = url;
						featuredImage = `
image: ${newFileName}
image_alt: TODO Alt text`;
					} else {
						imageBody += `

![TODO Alt text](${newFileName})`;
					}
				},
			) ?? [],
		);
		if (imageUrlToReplace) {
			if (imageBody) console.log('Multiple images on', tweet.id);
			tweetText = tweetText.replace(imageUrlToReplace, imageBody);
		}

		// Reply context
		const replyScreenName = tweet.in_reply_to_screen_name ?? '_';
		const mentionedUserName =
			tweet.entities.user_mentions.find(
				({ screen_name }) => screen_name === replyScreenName,
			)?.name ?? replyScreenName;
		const replyMetadata = {};
		if (tweet.in_reply_to_status_id) {
			replyMetadata.url = `https://twitter.com/${replyScreenName}/status/${tweet.in_reply_to_status_id}`;
		}
		if (tweet.in_reply_to_screen_name) {
			type = 'replies';
			replyMetadata.author = {
				name: mentionedUserName,
				url: `https://twitter.com/${tweet.in_reply_to_screen_name}`,
			};
		}
		if (tweet.in_reply_to_screen_name == 'ajciccarello') {
      // Replies to myself should reference my website post, not the original tweet
			// Even though it is a reply, threads should be categorized together
			type = 'notes';
			replyMetadata.author = {
				name: 'Anthony Ciccarello',
				url: 'https://www.ciccarello.me',
			};
			let previousTweet;
      // Check the last 40 tweets for the tweet we are replying to
			for (let i = 1; i < 40; i++) {
				const { tweet: tweetToCheck } =
					filteredTweets[tweetIndex + i] ?? {};
				if (tweetToCheck?.id === tweet.in_reply_to_status_id) {
					previousTweet = tweetToCheck;
					break;
				}
			}
			if (previousTweet) {
				const previousDate = new Date(previousTweet.created_at);
				// Point to the skipped post if that was consolidated
				const postId =
					tweetsToSkip[Number(tweet.in_reply_to_status_id)] ??
					tweet.in_reply_to_status_id;
				replyMetadata.url = createPostUrl(previousDate, postId);
				// Copy previous message in thread but drop any shortend urls
				replyMetadata.content = previousTweet.full_text
					.replaceAll('\n', ' ')
					.replace(/https:\/\/t.co\/\w+/, '');
				selfReplyPaths.push([
					createPostUrl(datePublished, tweet.id),
					replyMetadata.url,
				]);
			} else {
				console.warn(
					`Could not find own reply ID ${tweet.in_reply_to_status_id} from tweet ${tweet.id}`,
				);
			}
		}
		if (
			!replyMetadata.content &&
			replyMetadata.url?.includes('twitter.com') &&
			referencedTweets.has(replyMetadata.url)
		) {
			/** @type {string} */
			const tweetEmbed = referencedTweets.get(replyMetadata.url).html;
			replyMetadata.content = /<p.*?>(.*)<\/p>/.exec(tweetEmbed)[1];
		}
		let replyYaml = '';
		if (replyMetadata.url) {
			replyYaml = `
in-reply-to: ${replyMetadata.url}
references:
  - url: ${replyMetadata.url}
    post-type: tweet`;
			if (replyMetadata.content) {
				replyYaml += `
    content: >
        ${replyMetadata.content}`;
			}
			if (replyMetadata.author) {
				replyYaml += `
    author:
      name: ${replyMetadata.author.name}
      url: ${replyMetadata.author.url}`;
			}
		}

		// Markdown file content
		const fileOutput = `---
slug: '${tweet.id}'
date: ${datePublished.toISOString()}${replyYaml}${featuredImage}${
			tweet.entities.hashtags?.length > 0
				? `
tags:
`
				: ''
		}${tweet.entities.hashtags.map(({ text }) => `  - ${text}`).join('\n')}
syndication:
 - https://twitter.com/ajciccarello/status/${tweet.id}
---

${tweetText}
`;

		const path = `./_posts/${type}/${datePublished.toISOString().split('T')[0]}-tweet-${tweet.id}.md`;
		await writeFile(path, fileOutput);
	})
	.map((promise) => promise.catch(console.error));

// Once all the posts are created, generate a curl script for sending webmentions
Promise.allSettled(postCreationPromises).then(async () => {
	const pathPrefix = 'https://www.ciccarello.me';
	const fileOutput = selfReplyPaths
		.map(
			([source, target]) =>
				`curl -i -d source=${pathPrefix + source} -d target=${pathPrefix + target} https://webmention.io/www.ciccarello.me/webmention`,
		)
		.join('\n');

	const path = `./send-webmentions.sh`;
	await writeFile(path, fileOutput);
});

/** Copies media files to correct location */
async function copyMedia(media_url, tweetId) {
	const fileName = media_url.split('?')[0].split('/').at(-1);
	const newFileName = `/assets/img/tweet-${tweetId}-${fileName}`;

	await copyFile(
		`./python-output-folder/tweet-media/${tweetId}-${fileName}`,
		'.' + newFileName,
	);

	return newFileName;
}

/**
 * Generates a root relative path for tweet posts as shown on my site.
 * @param {Date} postDate
 * @param {number | string} postId
 * @returns {string}
 */
function createPostUrl(postDate, postId) {
	const datePath = postDate.toISOString().split('T')[0].replace(/-/g, '/');
	return `/posts/${datePath}/${postId}/`;
}

```

---
title: How I imported my old tweets to my website
subtitle: "A journey, not a tutorial"
slug: twitter-import
date: 2024-04-07T22:25:30.913Z
tags:
  - site changes
  - technology
image: /assets/img/2024-computer-bookshelf.jpg
image_alt: Stacks of technology books representing building on top of other people's work.
eleventyExcludeFromCollections: draft
---

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
## Sending mentions for tweet threads

Once the tweet archive was live, the links were set up to go up the tweet thread chain, but not see the replies.
So I ran this script to add the next response.
Ideally, I would add all the responses, but I'm not sure that would look great with my current webmention rendering.
The `send-webmentions.sh` file that the script generates runs a curl request to my webmention endpoint.

```bash
curl -i -d source=https://www.ciccarello.me/posts/2020/08/01/1289706912389292032/ -d target=https://www.ciccarello.me/posts/2020/08/01/1289684794662559745/ https://webmention.io/www.ciccarello.me/webmention
```

## The whole script

```javascript

```

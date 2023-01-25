---
title: How I converted my Instagram export to Markdown
date: 2023-01-25T08:38:22.912Z
permalink: /drafts/instagram-import/
tags:
  - site changes
  - IndieWeb
  - technology
eleventyExcludeFromCollections: draft
---
After I started posting photos to my site, I wanted to import all of the photos I had previously posted to Instagram.
Instagram does have an export option, however I found the export data lacking. Firstly, it does not include the alt-text for images, even if those were defined.
Secondly, the export does not provide the original URL for the post, which I wanted to include in the copy I posted to my site.

To fix this issue and to generate the markdown files I would use in my site's build, I created the below script.
This script includes a function to run within the browser to gather alt text and post URLs.
The resulting function is then copied to the script file before generating the markdown files.

Since it has been a while since [I completed my migration](/posts/2022/06/10/instagram-photos-import/), I can't guarantee that this script will work for everyone.
Even with this script, I still needed to do some manual adjustments and add alt-text to some of my posts.
However, for those looking to export it may provide a few hints or tips you can use.

{% raw -%}

```javascript
// Code Snippet License: MIT
/**
 * Utility to get instagram data
 * License: MIT
 *
 * ## Steps
 * 1. Request export of Instagram data
 * 2. Open your profile page on instagram, make sure all data is loaded by scrolling to the bottom
 * 3. Copy & run `scrapeImages()` in the browser dev tools and save results to `scrapedData` variable
 * 4. Run `node ./[relative_path]/this-file.js` in the root of the export folder
 * 5. Copy contents of compiled_posts to website source folders
 * 6. Fix alt text where altTextNeedsReview: true
 */

/**
 * Function to run in the browser to get image alt text and href links
 */
async function scrapeImages() {
 function findPostImages() {
  return (
   Array.from(document.querySelectorAll('img'))
    .map((img) => {
     let maxDepth = 5;
     let parentLink = img.parentElement;
     let isMultiPhoto = false;
     while (
      parentLink &&
      parentLink.tagName !== 'A' &&
      parentLink.parentElement &&
      maxDepth-- > 0
     ) {
      parentLink = parentLink.parentElement;
      if (
       parentLink &&
       parentLink.querySelector('[aria-label="Carousel"]')
      ) {
       isMultiPhoto = true;
      }
     }
     return {
      alt: img.alt,
      src: img.src,
      href: parentLink.href,
      isMultiPhoto,
     };
    })
    // Remove non post images
    .filter(({ href }) => href && href.includes('/p/'))
  );
 }
 function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
 }
 function lastItem(arr) {
  return arr[arr.length - 1];
 }

 // Need to start at the start of the page
 document.body.firstElementChild.scrollIntoView();
 await sleep(500);

 // Get all photos even with virtual scrolling
 /** @type {HTMLImageElement[]} */
 const images = findPostImages();
 let foundLastImage = false;
 let loopCount = 0;
 while (images.length && !foundLastImage && loopCount++ < 8) {
  lastItem(
   Array.from(document.querySelectorAll('a[href^="/p/"]'))
  ).scrollIntoView();
  await sleep(2500);

  const newImages = findPostImages();
  const previousLastImage = lastItem(images);
  const lastImageIndex = newImages.findIndex(
   ({ href }) => href === previousLastImage.href
  );
  foundLastImage = lastImageIndex === newImages.length - 1;
  images.push(...newImages.slice(lastImageIndex + 1));

  console.log('new Images', {
   'images.length': images.length,
   'newImages.length': newImages.length,
   lastImageIndex,
   foundLastImage,
  });
 }

 return images;
}

/** Enter data from above script */
const scrapedData = [
 // Scraped data will look like the following
 {
  alt: 'Snapped this pic of a female hummingbird in flight. 😁🐥🌹',
  src: 'https://instagram.fsan1-1.fna.fbcdn.net/v/long-url',
  href: 'https://www.instagram.com/p/B71Z42Ll3pI/',
  isMultiPhoto: false,
 },
];

const exportFolder = process.cwd();

// Open content/posts_1.json
/**
 * @typedef PostExportMedia
 * @property {string} uri
 * @property {number} creation_timestamp
 * @property {string} [title]
 * @property {object} [media_metadata]
 * @property {object} [media_metadata.photo_metadata]
 * @property {{latitude: number, longitude: number}[]} [media_metadata.photo_metadata.exif_data]
 * @property {object} [media_metadata.video_metadata]
 * @property {{latitude: number, longitude: number}[]} [media_metadata.video_metadata.exif_data]
 */

/**
 * @typedef PostExport
 * @property {PostExportMedia[]} media
 * @property {string} [title] Text for multiphoto posts
 * @property {number} [creation_timestamp] creation time for multiphoto posts
 */

/** @type {PostExport[]} */
const exportedPosts = require(exportFolder + '/content/posts_1.json');

function getPhotoId(uri) {
 const matches = /\w+_n/.exec(uri);
 if (matches && matches.length) {
  return matches[0];
 }
}

/**
 * Match posts with scraped data by image name
 * @param {PostExport} postExport
 * @param {typeof scrapedData[0]} scrapedPost
 * @returns {boolean} if posts are the same
 */
function postsMatch(postExport, scrapedPost) {
 const scrapedPhotoId = getPhotoId(scrapedPost.src);
 const exportPhotoId = getPhotoId(postExport.media[0].uri);
 if (exportPhotoId) {
  return scrapedPhotoId === exportPhotoId;
 }
}

/**
 * Match posts with scraped data by text
 * @param {PostExport} postExport
 * @param {typeof scrapedData[0]} scrapedPost
 * @returns {boolean} if posts are the same
 */
function postTextsMatch(postExport, scrapedPost) {
 return (
  (postExport.title || postExport.media[0].title).substring(0, 15) ===
  scrapedPost.alt.substring(0, 15)
 );
}

const combinedData = scrapedData.map((scrapedPost) => {
 let exportedData = exportedPosts.find((exportedPost) =>
  postsMatch(exportedPost, scrapedPost)
 );
 if (!exportedData) {
  exportedData = exportedPosts.find((exportedPost) =>
   postTextsMatch(exportedPost, scrapedPost)
  );
 }
 if (!exportedData) {
  console.warn('Could not match post', scrapedPost.alt.substring(0, 15));
  return {
   WARNING: 'Post not matched',
   ...scrapedData,
  };
 }

 const text = exportedData.title || exportedData.media[0].title;
 const creation_timestamp =
  exportedData.creation_timestamp ||
  exportedData.media[0].creation_timestamp;
 const content = text
  .replaceAll(/@(\w+)/g, '[$&](https://www.instagram.com/$1/)')
  .replaceAll(/#(\w+)/g, '[$&](/posts/tags/$1)');
 const media = exportedData.media.map((exportedMedia, index) => ({
  original: exportedMedia.uri,
  src: `/assets/img/instagram_${exportedMedia.uri.match(/[\w\.]+$/)[0]}${
   /\./.test(exportedMedia.uri) ? '' : '.mp4'
  }`,
  // Copy alt text for first item but make sure it's not multiline or contains quotes
  alt:
   index === 0
    ? scrapedPost.alt.match(/.*/)[0].replaceAll(`"`, `'`)
    : undefined,
  altTextNeedsReview:
   index > 0 || postTextsMatch(exportedData, scrapedPost),
 }));

 return {
  thumbnailUrl: scrapedPost.src,
  href: scrapedPost.href,
  media,
  content,
  date: new Date(creation_timestamp * 1000).toISOString(),
  slug: scrapedPost.href.match(/\/p\/([\w-]+)/)[1],
  tags: (text.match(/#\w+/g) || []).map((tag) => tag.substring(1)),
 };
});
// Map inputs to object with
//  - Image name
//  - Image alt text
//  - Additional images (TODO: alt text??)
//  - Post timestamp
//  - Post content (tags and mentions parsed, escape characters fixed?)
//  - Tag list
//  - Instagram Url
//  - Instagram post ID (to be used as slug)
// Generate markdown files with contents
// Copy images

(async function writeFiles() {
 const { writeFile, copyFile } = require('fs/promises');
 await writeFile(
  exportFolder + '/intermediate-compiled-data.json',
  JSON.stringify(combinedData, null, '\t')
 );
 console.log('/intermediate-compiled-data.json file written');

 Promise.all(
  combinedData.map(async (post) => {
   for (const media of post.media) {
    await copyFile(
     exportFolder + '/' + media.original,
     __dirname + media.src
    );
   }
   const file = `---
slug: ${post.slug}${
    post.slug.includes('_')
     ? `
redirectFrom: ${post.date.split('T')[0].replaceAll('-', '/')}/posts/${
       post.slug
       }`
     : ''
   }
date: ${post.date}${
    post.tags.length
     ? `
tags: ${post.tags
       .map(
        (tag) => `
  - ${tag}`
       )
       .join('')}`
     : ''
   }
image: ${post.media[0].src}
image_alt: "${post.media[0].alt || ''}"${
    post.media.some(({ altTextNeedsReview }) => altTextNeedsReview)
     ? `
alt_needs_review: true`
     : ''
   }
syndication:
 - ${post.href}
---

${decodeURIComponent(escape(post.content))}
${post.media
 .slice(1)
 .map(
  (media) => `
![${media.alt || ''}](${media.src})`
 )
 .join('\n')}
`;
   const filename = `/_posts/photos/${
    post.date.split('T')[0]
   }-instagram-${post.slug}.md`;
   await writeFile(__dirname + filename, file);
   console.log('Wrote file: ', filename);
  })
 );
})();
```

{% endraw -%}

---
title: Ideas for improving Metaformats
permalink: '/drafts/metaformats/'
date: 2022-11-29
tags:
  - IndieWeb
  - Technology
eleventyExcludeFromCollections: draft
---

## Why metaformats

I first became interested in the [metaformats spec](https://microformats.org/wiki/metaformats) when I wanted to generate link previews on my site when bookmarking or replying to pages.
Metaformats is an extension to the microformats2 parsing algorithm that provides a fallback for sites that don't support microformats.
It works by parsing the meta tags as if they were microformats properties.
This is great, because it makes microformats useful as the vocabulary for parsing, even if a page doesn't use microformats itself.
The challenge is in how to interpret meta tags, which are not consistently used and sometime cater to SEO or social media site engagement rather than accurately representing the content.

## Deviations from the spec

I began work on [implementing metaformats for the Node.js microformats-parser](https://github.com/microformats/microformats-parser/pull/229) library.
However I quickly began to question whether the spec was the best approach.
Because metaformats is an experimental extension, the library maintainer and I decided to take some liberties interpreting the spec.
So far this has seemed to work fine, but ultimately I'd like to see multiple, consistent implementations so I'd like to discuss some possible spec changes.

### Only parse as a fallback

The first question we addressed was when to use metaformats.
The current spec only skips metaformats parsing if there are no root classes on the `html` element.
However, if a root class is any where in the document body, that would often lead to multiple `h-entry`s in a document, confusing any downstream microformats logic.

I suggest only parsing microformats if there are no microformats found on the page.
This avoids the "multiple entries" problem and fits with the goal of metaformats being a fallback definition.
This design could potentially have issues if sites have incomplete microformats, such as those from a Wordpress template.
If this is common, a quality heuristic such as check that an `h-entry` has properties, could be defined to weed out bad microformats but I wasn't sure what to check for.

### Imply h-entry on all pages

When I implemented metaformats parsing, I used h-entry as a fallback root class for all pages that aren't a more specific type (like an `og:type` of "profile").
While the spec will usually use h-entry, it does require some Open Graph Protocol or Twitter card tags to parse anything.
The need for these checks is partly impacted by the next item: using additional fallback tags.

### Add additional fallback options

The meta elements checked by the metaformats spec are limited to [Twitter cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup) (like `[name="twitter:description"]`) and [Open Graph Protocol](https://ogp.me/).
However there are common parts of the HTML document `<head>` like the `<title>` element and common meta tags like `[name="description"]` that are even more common than Open Graph Protocol that could be used.
Some of these may suffer from SEO keyword stuffing, but they are better than having no value.

### Parsing order

It could be my misunderstanding, but the spec was not clear about how order impacts parsing.
I think the the intention is that the tags are looked at together, so if both are found, only the Open Graph Protocol `og:title` is parsed, not the `twitter:title`.
My approach was to collect all meta tags into a map before trying to determine which one to use.
This removes the issue of order where possible.
However, I did learn that the Open Graph Protocol depends on order in some cases, like the next issue of media tags.

### Handle variations of media tags

The media tags seemed like one of the more harry parts of metaformats parsing.
The Open Graph Protocol says that `og:image` `og:image:url` and `og:image:secure_url` are all valid ways to define an image URL and gives examples where `og:image:secure_url` is used alongside the other.
It also explains that some tags (specifically `og:image`) can have multiple values and should be parsed as an array in these cases, which means it would be invalid to only use the first or last image.
Lastly, the alt text properties are tied to the last image defined.

The spec currently only recognizes the `og:image` as a `u-photo` and therefor misses both alt-text and situations where a site might not use `og:image` but does use `og:image:secure_url` (citation needed).

### Parse images as u-featured

The spec says to parse `meta[property="og:image"]` tags (and the Twitter card alternative) as `u-photo` properties.
However, the [post-type-discovery](https://indieweb.org/post-type-discovery) algorithm says that the presence of a "photo" property implies that it is a photo post.
In the case of a Flicker photo page, this is accurate.
However, a large part of the internet includes `og:image` to improve the display of links to their site on social media.
For example, GitHub generates images for pages on its' site, even though you wouldn't consider a GitHub issue a photo post.

As an alternative, I suggest that these image properties be parsed as `u-featured` properties instead.
This will be more in-line with the use of the meta tags.
This is also how the [OpenGraph to Microformats2](https://opengraph-mf2.tanna.dev/) package implemented it's parsing.

While writing this post, I realized that for some root classes (like `h-card`), `u-photo` might still be preferable in some cases.

## The implementation

- Attempt to parse microformats
- If none found, iterate all children of the `<head>`, parsing the
- After all

## More analysis needed

To settle on a metaformats algorithm that works with a broad portion of the internet, more analysis of meta tag usage is needed.
Looking at the details of how sites implement metadata has given me lots of question.
The definition of the Open Graph Protocol left a lot of room for interpretation, but the most common use of OGP for social media only revolves around a few properties.
A more complex algorithm could provide a more accurate representation of sites but with questionable value more possibilities for misinterpretation.
A simpler algorithm might work well enough for a simpler use case.

Some questions for further analysis:

- Do we need to include Twitter Cards? How often are they used without the related open graph protocol tags? If they are both used, how do they differ in value?
- How often do sites use `name` and `property` attributes on the same meta tag and are they ever describing different properties? (e.g. `<meta name="og:title" property="twitter:description" content="Why not both?" />`)
- How usable are some of the more generic metadata properties (`<title>`, `description`, `author` etc)? Are they worthwhile fallbacks?
- What variations on media tags are actually used in the wild (multiple photos, secure urls with different paths, alt text, different tag names)?
- What other metadata formats are actually used and do they provide additional value? How would you even interpret JSON-LD metadata?
- How are authors used in meta tags? Do sites define multiple authors?
- How are canonical urls usually defined? Do `og:url` and `link[rel=canonical]` ever differ?
- What `h-card`-like properties are used?
- If metaformats are used primarily for link previews, does it make sense to focus parsing around `h-cite` properties like `publication`

I hope to do further analysis of some common sites to answer some of these questions.
My goal would be to provide some clarity on how meta tags are actually being used so parsing works well outside of the microformats internet bubble.
What use cases do you see for metaformats?

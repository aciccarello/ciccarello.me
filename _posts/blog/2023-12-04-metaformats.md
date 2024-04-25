---
title: Ideas for improving metaformats parsing
date: 2023-12-04T08:01:04.634Z
tags:
  - IndieWeb
  - technology
image: /assets/img/code-html-ide.jpg
image_alt: "Photo of HTML computer code"
image_caption: Photo by <a href="https://unsplash.com/@pankajpatel">Pankaj Patel</a> on <a href="https://unsplash.com/photos/computer-source-code-screengrab-bYiw48KLbmw">Unsplash</a>
syndication:
  - https://news.indieweb.org/en/www.ciccarello.me/blog/2023/12/04/ideas-for-improving-metaformats-parsing/
---

## Why metaformats

I first became interested in the [metaformats spec](https://microformats.org/wiki/metaformats) when I wanted to generate link previews on my site when bookmarking or replying to pages.
Metaformats is an extension to the microformats2 parsing algorithm that provides a fallback for sites that don't support microformats.
It works by translating the meta tags into microformats properties.
This is great, because it makes microformats useful as the vocabulary for parsing, even if a page doesn't use microformats itself.
The challenge is in how to interpret meta tags, which are not consistently used and often cater to SEO or social media site engagement rather than accurately representing the content.

## Deviations from the spec

When I began work on [implementing metaformats for the JavaScript microformats-parser](https://github.com/microformats/microformats-parser/pull/229) library,
I quickly began to question whether the spec was taking the best approach.
Because metaformats is an experimental extension, the library maintainer and I decided to take some liberties interpreting the spec.
So far this has seemed to work fine, but ultimately I'd like to see multiple, consistent implementations so I'd like to discuss some possible spec changes.

It's also worth noting that the spec is a living document and subject to change.
For reference, most of my initial work was done based off of an [April 2022 revision](https://microformats.org/wiki/index.php?title=metaformats&oldid=70513).

### Only parse as a fallback

The first question we addressed was when to parse for metaformats.
When implemented, the spec only skipped metaformats parsing if there were no root classes on the `html` element.
However, adding metaformats to a page with microformats could lead to multiple `h-entry`s in a document, confusing any downstream microformats logic.
There's a [more recent proposal](https://github.com/microformats/metaformats/issues/2#issuecomment-1836962415) to parse metaformats as a separate property from the true microformats on the page.

I suggest only parsing meta tags if there are no microformats found on the page.
This avoids the "multiple entries" problem from the original spec and fits with the goal of metaformats being a fallback definition.
This design could potentially have issues if sites have incomplete microformats, such as those from a Wordpress template.
If this issue is common, a quality heuristic such as check that an `h-entry` has properties, could be defined to weed out bad microformats but I wasn't sure what to check for.

### Add additional fallback options

The meta elements checked by the metaformats spec are limited to [Twitter cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup) (like `[name="twitter:description"]`) and [Open Graph Protocol](https://ogp.me/).
However there are common parts of the HTML document `<head>` like the `<title>` element and common meta tags like `[name="description"]` that are even more common than Open Graph Protocol that [could be used](https://github.com/microformats/metaformats/issues/1).
Some of these may suffer from SEO keyword stuffing, but they are better than having no value.

### Imply h-entry on all pages

When I implemented metaformats parsing, I used `h-entry` as a fallback root class for all pages that aren't a more specific type (like an `og:type` of "profile").
While the spec will usually use h-entry, it does require some Open Graph Protocol or Twitter card exist tags to parse anything.
With additional fallback tags like the `<title>` element, this logic seemed overly complex.
The spec could be simplified to use `h-entry` by default if a more suitable type isn't found and then check for no properties for the rare case that no relevant meta tags are used.

### Clarify impact of parsing order

It could be my misunderstanding, but the spec was not clear about how order impacts parsing.
I think the the intention is that the tags are looked at together, so if both are found, only the Open Graph Protocol `og:title` is parsed, not the `twitter:title`.
My approach was to collect all meta tags into a map before trying to determine which one to use.
This removes the issue of order where possible.
However, I did learn that the Open Graph Protocol depends on order in some cases, such as complex properties that can be defined multiple times (array types) or with media tags.

### Handle variations of media tags

The media tags seemed like one of the more hairy parts of metaformats parsing mainly because of how flexibly the Open Graph Protocol defines them.
The OGP says that `og:image`, `og:image:url`, and `og:image:secure_url` are all valid ways to define an image URL and gives examples where `og:image:secure_url` is used alongside the other.
Images can also have alt text via the `og:image:alt` property.
I've created a [spec GitHub issue](https://github.com/microformats/metaformats/issues/4) specifically to add alt text parsing.
Further complicating things, tags like `og:image` can be defined multiple time to create a list of object definitions, so a sub-property like alt text needs to be tieds to the last `og:image`, not any image.

The spec currently only recognizes the `og:image` as a `u-photo` and therefor misses both alt-text and situations where a site might only use `og:image:secure_url` but does use the simpler `og:image` (not sure if this is common).
The implementation I used only deduplicated by URL, but many sites like [Wikimedia](https://en.wikipedia.org/wiki/File:TR_Pamukkale_Laodicea_asv2020-02_img11.jpg) appear to have multiple `og:image` for the same photo, but with different sizes which the current parser would consider different images.

This area in particular warrants further investigation so see what patterns are actually in use across websites.

### Parse images as u-featured

The spec says to parse `meta[property="og:image"]` tags (and the Twitter card alternative) as `u-photo` properties.
However, the [post-type-discovery](https://indieweb.org/post-type-discovery) algorithm says that the presence of a "photo" property implies that it is a photo post.
However, a large part of the internet includes `og:image` to improve the display of links to their site on social media.
For example, GitHub generates images for pages on its' site, even though you wouldn't consider a GitHub issue a photo post.

As an alternative, I suggest that these image properties be parsed as `u-featured` properties instead.
This will be more in-line with the use of the meta tags.
This is also how the [OpenGraph to Microformats2](https://opengraph-mf2.tanna.dev/) package implemented it's parsing.

While writing this post, I realized that for root classes other than `h-entry` (particularly `h-card`) parsing as `u-photo` might still be preferable.

## The implementation

With the above context described, here is a simplified description of how the javascript metaformats parser was implemented. This is written more as illustrative pseudocode than spec so there are some details left out. To see the exact code, check out the [microformats-parser PR](https://github.com/microformats/microformats-parser/pull/229).

1. Attempt to parse microformats as normal
1. If items are found end, if not, parse the metaformats as follows
1. Find the `<head>` element and parse all it's children into an object mapping key/value pairs as follows
    1. If it is a `<meta>` tag with a `content` attribute, store the content value as the value with the following key
        1. If it has a `property` attribute (as used by Open Graph Protocol), use that as the key
        1. (And/or) If it has a `name` attribute, use that as the key
        1. If the key starts with `(og|twitter):(image|video|audio)`
            1. If the key ends with `alt`, look for a value matching the prefix (e.g. `og:image`) and change that value to an object of the form `{value: existingValue, alt: contentOfAltTag }`
            1. Else if the key ends with `url`, simplify the key to just the prefix (e.g. `og:image:secure_url` becomes `og:image`)
        1. If a value exists for that key and the new value is different (also checking for image object form), then store both values in an array.
    1. If it is a `<title>` element, store it with a unique key and use it's inner value as the value
    1. If it is a `<link>` element with a `canonical` attribute, store it with a unique key and use it's `href` attribute value as the value
1. Determine the root class as follows
    1. If the `og:type` is "profile", then use `h-card`
    1. If the `og:type` is "music" or "video", then use `h-cite`
    1. _Note that there's a [suggestion to infer `h-card`](https://github.com/microformats/metaformats/issues/3) if URL is the root of the domain_
    1. Else use `h-entry`
1. Parse the properties as follows
    1. Set `name` to the first value found for the keys: `og:title`, `twitter:title`, the inner text of the `<title>` element
    1. Set `summary` to the first value found for the keys: `og:description`, `twitter:description`, or `description`
    1. Set `featured` to the first value found for the keys `og:image` or `twitter:image`
        - _Note: `featured` should probably be `photo` for anything other than `h-entry`_
    1. Set `video` to the first value found for `og:video` or `twitter:video`
    1. Set `audio` to the first value found for `og:audio` or `twitter:audio`
    1. Set `published` to the first value found for `og:published_time` or `date`
    1. Set `updated` to the first value found for `og:modified_time`
    1. Set `author` to the first value found for `article:author` or `author`
    1. Set `url` to the first value found for `og:url` or the value of the canonical link tag
    1. Set `publication` to the first value found for `og:site_name` or `publisher`
    1. If the inferred type is `h-card`
        1. Set `given-name` to the value found for `profile:first_name
        1. Set `family-name` to the value found for `profile:last_name
        1. _Note: `profile:username` might be worth parsing as `p-nickname`. It's used on mastodon profiles_
1. If any properties are found, return the object as the parsed microformats item


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
- What variations on media tags are actually used in the wild (multiple photos, videos, audio, secure urls with different paths, alt text, different tag names)?
- What other metadata formats are actually used and do they provide additional value? How would you even interpret JSON-LD metadata?
- How are authors used in meta tags? Do sites define multiple authors?
- How are canonical urls usually defined? Do `og:url` and `link[rel=canonical]` ever differ?
- If metaformats are used primarily for link previews, does it make sense to focus parsing around `h-cite` properties like `publication`

I hope to do further analysis of some common sites to answer some of these questions.
My goal would be to provide some clarity on how meta tags are actually being used so parsing works well outside of the microformats internet bubble.
I'd also like to hear what use cases do others see for metaformats.
What else is missing?

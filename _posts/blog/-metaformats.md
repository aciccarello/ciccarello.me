---
title: Metaformats
permalink: '/drafts/metaformats/'
date: 2022-11-29
tags:
  - IndieWeb
  - Technology
eleventyExcludeFromCollections: draft
---

- [Current Spec](https://microformats.org/wiki/metaformats)
- [Node.js microformats-parser Pull Request](https://github.com/microformats/microformats-parser/pull/229)

## Why metaformats is useful

- Provides a fallback for sites that don't support microformats
- Useful for link previews

## Deviations from the spec

### Only parse as a fallback

- Only parse metaformats if no microformats found

### Imply h-entry on all pages

- Imply h-entry on all pages if not using a more specific og:type

### Parse images as u-featured

- Return featured rather than photo on og:image to avoid implying a photo post
- There's presiedence for this in the opengraph-mf2 implementation

### Handle variations of media tags

- More complex parsing of media tags to avoid duplicates, handle some variation in property name, and include alt text

## Add additional fallback options

- Handle more fallback options like page title

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

- How often are twitter cards used without open graph tags, and how do they differ in value?
- How usable are some of the more generic metadata properties (`<title>`, `description`, etc)
- What other metadata formats are actually used and do they provide additional value?
- Is JSON-LD usable
- What variations on media tags are actually used in the wild (multiple photos, alt text, different tag names)?
- How often to people use `name` and `property` attributes on the same meta tag and are they ever describing different properties?
- How are authors used in meta tags?
- How are canonical urls usually defined (`og:url` vs `link[rel=canonical]`)?
- What `h-card`-like properties are used?
- If metaformats are used primarily for link previews, does it make sense to focus parsing around `h-cite` properties like `publication`

What use cases do you see for metaformats?

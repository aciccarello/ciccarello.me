### Anthony Ciccarello's personal profile website

[![Netlify Status](https://api.netlify.com/api/v1/badges/af8cd9bd-b0a4-417f-bfa1-d11e6d8ed0f7/deploy-status)](https://app.netlify.com/sites/mystifying-brahmagupta-67e639/deploys)

This repo hosts my personal website on [ciccarello.me](https://www.ciccarello.me). Read about the technology used to build this site in [colophon.md](colophon.md).

# Running this site locally

To install the project dependencies, install [Node.js](https://nodejs.org/) and within the project directory run `npm install`.

To run the build with a local build server use the `npm start` command. If you need debugging output run the following.

```bash
DEBUG=Eleventy* npm start
```

# Page Properties

- noindex: mark as `noindex` to robots
- excludeFromSitemap: Don't show in sitemap.xml and mark as `noindex` to robots
- excludeFromMainFeed: Appears in all feeds except the main feed. Used for less important activities like replies and likes.
- eleventyExcludeFromCollections: same as excludeFromSitemap plus don't show in feeds.
- eleventyExcludeFromCollectionsReason: Used with above property
  - If set to "draft", page will show a warning.
  - If set to "deleted", page will show a warning, include a 410 http-equiv meta tag, and remove the content

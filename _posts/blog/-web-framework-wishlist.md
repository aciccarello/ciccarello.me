---
title: Web Framework Wishlist
date: 2023-09-29
permalink: /drafts/web-framework-wishlist/
tags:
  - technology
  - JavaScript
eleventyExcludeFromCollections: true
eleventyExcludeFromCollectionsReason: draft
---

After listening to [Full Stack Radio episode with Rich Harris](https://fullstackradio.com/143) I started thinking about what I'd love to see from a web framework.

## Categories

- Build tooling
- Mental model
- Data model
- Network model
-

## Features

- Progressive enhancement
  - Works without js (form submission)
  - JS client side rendering
  - Service worker rendering
  - Render consistently automatically
  - Option for static rendering
- Simplify development & build process
  - No preprocessors required (jsx or TS)
  - Bundles per route
- Routing
  - Same throughout app
  - Avoid history API if possible (full page load)
  - Pre-fetching pages
- Data model
  - State management built-in
  - Avoid hydrating entire app
  - Backend assumes rest API for consistency
  - Loading state
  - Offline support/eventual consistency
- Forms
  - Same form validation back end and front
  - Form data submission works
- Web component support
- html streaming

## Meta Frameworks to look at

Originally from [Kent C. Dodds on Hanselminutes](https://hanselminutes.com/878/the-webs-next-transition-with-kent-c-dodds)

- [Remix](https://remix.run/)
- [Solid Start](https://start.solidjs.com/)
- [Svelte Kit](https://kit.svelte.dev/)
- [swtl](https://kit.svelte.dev/)
- [Enhance](https://enhance.dev/)

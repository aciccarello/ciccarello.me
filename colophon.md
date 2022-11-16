---
title: 'Colophon'
layout: page
---

<style>
    img.badge { height: 15px; width: auto; }
</style>

## About this Site

This site is intended to serve as my personal home on the web. I write about many different topics that interest me for fun. It's part profile, part public journal, part playground.

In many ways it serves as an excuse to push myself and try different technologies.
In this case using a static site is an intentional exercise to help me think more about the layout and styles I use.
At the same time I hope to improve the performance of the site and experimenting with optimizations.

I started the site mainly to serve as a professional profile that I could point to instead of updating my bio on every site with a profile page.
The scope has expanded over time as I migrated blog content after I became unhappy with the Medium.com reader experience.

In 2021 I began experimenting more with [IndieWeb](https://indieweb.org/) concepts and added other kinds of posts as I became more unhappy with the impact of traditional social media sites. In March 2022 I added [support for notes](/posts/2022/03/30/first-note/). In June 2022, I [backfilled photos](/posts/2022/06/10/instagram-photos-import/) I had previously posted on Instagram. In September 2022 I [started supporting receiving webmention](/posts/2022/09/09/displaying-webmentions) responses.

## Technology

[![Indieweb](https://svgshare.com/i/5Hh.svg){.badge}](https://indieweb.org/)
[![Webmention](https://svgshare.com/i/BAX.svg){.badge}](https://indieweb.org/Webmention)
[![Microformats](https://svgshare.com/i/BBx.svg){.badge}](http://microformats.org/)
[![Atom](https://web.badges.world/badges/feeds/atom.png){.badge}](/feed.xml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/af8cd9bd-b0a4-417f-bfa1-d11e6d8ed0f7/deploy-status){.badge}](https://app.netlify.com/sites/mystifying-brahmagupta-67e639/deploys)

The code for this website is on [GitHub](https://github.com/aciccarello/ciccarello.me) and deployed to [Netlify](https://www.netlify.com/). The build is processed using [Eleventy](11ty.dev) a static site generator for node. This site was originally hosted on GitHub pages with a Jekyll build when it was launched at the end of 2017.

The styles of this site are a combination of hand-written styles and [Material Components for the Web](https://material.io/components/). See the [style guide](/style-guide) for more details on theming.
The site uses the [Roboto font](https://fonts.google.com/specimen/Roboto#glyphs) (self hosted). Included are some SVG icons from [Material Design Icons](https://material.io/tools/icons/?style=baseline).
Other icons (like logos) are made by [Pixel perfect](https://icon54.com/) from [www.flaticon.com](https://www.flaticon.com/)

Webmention receiving is handled by [webmention.io](https://webmention.io/) while rendering responses is done client-side with code modified from [webmention.js](https://github.com/PlaidWeb/webmention.js). Since webmentions only work with responses posted online, forms linked to [Comment Parade](https://commentpara.de) provide people without their own site a way to reply. Webmentions are automatically sent via [webmention.app](https://webmention.app/).

This site currently uses CloudFlare analytics due to its better privacy policy and limited performance impact. Previously I've used GoatCounter.

If there is an problem with this website or improvement you'd like to suggest, please [open an issue on GitHub](https://github.com/aciccarello/ciccarello.me/issues) or reach out directly.

---

[Colophon](https://en.wikipedia.org/wiki/Colophon_(publishing)) is a publishing term typically used to describe the publishing process but has been [expanded to websites](https://indieweb.org/colophon). This page was inspired by [Binyamin Aron Green](https://binyam.in/colophon/) and [Eric Bailey](https://ericwbailey.design/colophon/).

---
title: Omnibear IndieWeb Hackathon Roundup
date: 2026-02-01
permalink: /drafts/omnibear-roundup/
tags:
  - IndieWeb
  - Omnibear
  - technology
syndication:
  - https://news.indieweb.org/en
eleventyExcludeFromCollections: true
eleventyExcludeFromCollectionsReason: draft
---

Now that January is over, I can report that the IndieWeb Hackathon was a big boost to the Omnibear project.
I wasn't quite sure what to expect, but it turned out to be an illuminating case study in open source software.
The biggest wins were regards to getting more feedback and exposure to the project, but it was great having people jump in to solve software issues I probably would not have gotten to.
But I also ran into some classic open source struggles, blockers in upstream dependencies, following up with contributors and maintainers, how much work is needed to onboard someone, and how to prioritize work.

## Kickoff

On New Year's Day we had a kickoff call which ended up being a good opportunity to introduce people to the project.
Several people installed Omnibear and tried it out, either with their own site or with commentpara.de.
Micropub is a feature not everyone has on their site so it was cool to talk about the value of it.
I also appreciated the feedback on user flows and the website language.

From discussions with [Joe Crawford](https://artlung.com/), I made some significant update to the contributing guides.
[gRegor](https://gregorlove.com/) also [opened a PR](https://github.com/gRegorLove/anoweco/pull/1) to add the post types config query to the commentpara.de to work with a [change I made](https://github.com/omnibear/omnibear/commit/c1dc15f2790c44a13031a6e9b3010af3e898fde3) to filter the post types options shown.
[Sofia Wood](https://www.fractalkitty.com/author/sophia/) 

## Code Contributions



## Struggles

Upstream PRs got held up

## Micropub Popup

## Thanks

Thanks to the following contributors

- [Joe Crawford](https://artlung.com/)
  - Helping with hackathon zoom calls
  - Testing out the development environment setup and giving feedback
  - Website feedback
- [gRegor](https://gregorlove.com/)
  - Testing omnibear against your site and logging a bug
  - [Opening a PR](https://github.com/gRegorLove/anoweco/pull/1) to improve https://commentpara.de support for post-type discovery
- Sofia Wood
  - Testing against https://commentpara.de
  - Testing permissions controls
  - Website feedback
  - Looking into Safari publishing
- [Thomas Vander Wal](https://www.vanderwal.net/)
  - Testing against micro.blog
  - Testing in Safari
- [Tantek](https://tantek.com/)
  - Extension UX feedback
- Dheemanth
  - [Opened a PR](https://github.com/omnibear/omnibear/pull/138) to add support for bookmarking links
- [John Evdemon](https://evdemon.org/)
  - [Reported an issue](https://github.com/omnibear/omnibear/issues/140) with PKCE support blocking login on Wordpress
- [Jacob Anderson](https://jacobandersen.dev/)
  - [Opened a PR](https://github.com/grantcodes/micropub/pull/49) to add PKCE support to the upstream micropub.js library

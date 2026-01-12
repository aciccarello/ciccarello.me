---
title: January 2026 IndieWeb Hackathon Kickoff
slug: indieweb-hackathon-kickoff
date: 2025-12-30T06:17:43.606Z
tags:
  - technology
  - IndieWeb
  - Omnibear
image: /assets/img/2026-01-hackathon-header.jpg
image_alt: 'A sapling evergreen covered in snow with an overlay of hex code text and the title IWC January 2026 Hackathon: Omnibear'
syndication:
  - https://news.indieweb.org/en
---

As [previously announced](/blog/2025/12/14/indieweb-hackathon/), this coming month I'm hosting the IndieWeb Hackathon.
The project for this month is [Omnibear](https://omnibear.com/), a browser extension for posting to your site via [Micropub](https://omnibear.com/getting-started/micropub/).
As a [Micropub client](https://indieweb.org/Micropub/Clients), the extension works with the same APIs as other clients like [Quill](https://quill.p3k.io/) and [Sparkles](https://sparkles.sploot.com/login) to create posts on your website.
One of the unique things about Omnibear is that it lives in your browser, allowing you to reply to the content you are viewing.
So you can right-click on a post with microformats and reply directly to it, rather than needing to copy the URL into another client.
One of my favorite new features is that Omnibear will indicate when the current page you are on supports [Webmentions](https://indieweb.org/Webmention) to encourage replying to other IndieWeb sites.

Unfortunately, the Omnibear project needed a serious overhaul when Chrome changed its requirements for extension development.
This meant that the project fell dormant for a time.
However, a new version of Omnibear has been published for review on the Firefox and Microsoft Edge web extension stores and hopefully should be available soon for Google Chrome.
This is a great time for community feedback on the project, whether that is simply trying it out or contributing code.

## How to participate

There are lots of ways for you to participate in this month's hackathon.
You don't need to be a browser extension developer to get involved!
Some of the ways you could help include:

- Try out the extension/give feedback
- Review open issues/help with maintenance
- Improve the website/add documentation
- Open a PR/make an improvement
- Work on an upstream project/share the love

Even if you only have an afternoon to contribute, any amount of involvement can help!

### Give Feedback

This first item is for anyone!
Omnibear was recently refactored and likely has bugs that need to be addressed.
It would be helpful to have feedback on the latest release to know what issues people face.
If you have a site with a Micropub endpoint, login and try using Omnibear with your site.
Testing against multiple Micropub servers will help ensure better compatibility.
If you don't have a Micropub endpoint, you can try omnibear with a site like [commentpara.de](https://commentpara.de/) which will let you create a temporary user for posting replies (notes and bookmarks are not supported).

If you encounter any issues, let me know!
[GitHub issues](https://github.com/omnibear/omnibear/issues) are great for bug reports.
If you have feature requests, consider starting a [GitHub discussion](https://github.com/omnibear/omnibear/discussions) so we can refine the requirements.
If you don't want to set up a GitHub account, consider reaching out via one of the methods defined at the bottom of this post.

### Help with Maintenance

If you are active on GitHub, one of the most helpful things for a maintainer is to review open issues.
Identifying duplicate issues helps clarify what work is needed.
It's also helpful to check if you can reproduce a problem someone else reported.
Since many of the issues are from before the latest refactor, some may no longer be relevant.
In particular, see the [Need help reproducing](https://github.com/omnibear/omnibear/issues?q=is%3Aissue%20state%3Aopen%20label%3Aneed-help-reproducing) issue label for issues I have not yet reproduced.
If you can reproduce the problem, leave a comment describing how you reproduced it.
If you can't, leave a comment describing what you tried so I can better decide if the issue should be closed.

### Add Documentation

Omnibear has its own website at [omnibear.com](https://omnibear.com/).
It is a static site build with Hugo and hosted in the [omnibear-site](https://github.com/omnibear/omnibear-site) repository.
If you aren't interested in helping with browser extension development, consider improving the website.
Some of the guides are outdated, the features page is sparse, and the help page could provide more suggestions beyond logging.

If you are great with words or have a good understanding of IndieWeb protocols, this could be a great place to help out.
Hugo is a Go-based static site builder with it's own Go-based templates, but most of the content is markdown.
There's a specific [CONTRIBUTING.md](https://github.com/omnibear/omnibear-site/blob/master/CONTRIBUTING.md) guide for the website if you are interested.

### Make an Improvement

Interested in trying out browser extension development?
The good news is that the [WXT](https://wxt.dev/) build tool makes it a lot easier.
For the most part, you just install some NPM dependencies and run the dev server and everything starts up.
All of the code is written in JavaScript or JSX and the popup view is rendered using Preact, a lightweight React variant.
You can learn more about the development process in the [CONTRIBUTING.md](https://github.com/omnibear/omnibear/blob/master/CONTRIBUTING.md) file in the Omnibear repository.

There are a few specific areas where contributions are most needed in the codebase:

1. Fixing bugs and improving stability
1. Increasing test coverage
1. Supporting more post types

While nearly all issues could be potential contributions, see the [Help wanted](https://github.com/omnibear/omnibear/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22help%20wanted%22) issue label for a list of suggested items.
If you have any questions about how to contribute, please don't hesitate to reach out.

If you happen to have experience with developing browser extensions, I'm also open to feedback about best practices and how to best use the APIs for stability and to limit the required permissions.

### Share the Love

Omnibear is dependent on many other projects.
Those projects may need updates to support features in Omnibear.
There could be newer standards or standard extensions that would be helpful to add.
Consider checking out the issues on those projects to see if they could use contributions.

Note that those projects have not signed on to the hackathon and may take longer to respond to issues.
But if you've contributed to these projects before or use them yourself, this might be a unique way to contribute to the broader community while also potentially helping the Omnibear project.
The two most IndieWeb-relevant dependencies are:

- [microformats-parser](https://github.com/microformats/microformats-parser)
- [micropub-helper](https://github.com/grantcodes/micropub)

## Getting Started

A good place to get started is by checking out the [CONTRIBUTING.md](https://github.com/omnibear/omnibear/blob/master/CONTRIBUTING.md) file in the Omnibear repository.
This should give you all the information you need to try it out, install pre-release versions, and understand the codebase.
Also check out the [dedicated GitHub discussion](https://github.com/omnibear/omnibear/discussions/125) if you want to say hi or ask questions.

The top priorities I have for the project during this event include:

1. Identifying and fixing any bugs
1. Updating documentation
1. Better test coverage
1. Clearing out old issues
1. Getting feedback on feature requests
1. Adding support for more post types

These are targeted to provide stability and better onboarding for new users.
I've also focused on items that are easier for newer contributors.

If you're curious and want to hear more about what is going on or if you have questions to ask, consider joining one of the hackathon Zoom calls I'll be hosting this month. The first call will be on [January 1st](https://events.indieweb.org/2026/01/january-hackathon-kickoff-NCj8j08Gmkxx).
I am also active in the [#indieweb-dev](https://indieweb.org/discuss#Read_Discussions) chat channel and am available for DMs on the Slack bridge.
If you aren't active in the chat, you can reach out via GitHub issues or discussions.
Lastly, I'm usually available via [email](/#connect), though I'm historically pretty slow to respond there.

---

Thanks to everyone who is considering participating.
I'm really looking forward to interacting with you all and appreciate any contribution, no matter how small.
At the end of this month, I plan on writing a follow-up on how the event went.
If you participated, it would be great if you posted about your own experience as well.
If you send it to me, you may even get a mention in the end-of-month roundup.

Lastly, this is the first event we're trying in this format.
If you are an open source maintainer in the IndieWeb space and want to host an event yourself, [consider signing up on the wiki](https://indieweb.org/IndieWeb_Hackathon#Hosting).
My hope is that this can be a fun way to help maintainers of the projects that make the IndieWeb great.
Happy hacking!

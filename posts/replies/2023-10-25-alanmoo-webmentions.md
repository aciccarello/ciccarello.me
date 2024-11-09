---
date: 2023-10-25T21:07:24.789Z
in-reply-to: https://xoxo.zone/@Alanmoo/111297654316173488
slug: alanmoo-webmentions
references:
  - published: ""
    url: https://xoxo.zone/@Alanmoo/111297654316173488
    name: ""
    content: This seems like a promising attempt along the lines of the direction I
      was thinking about
      https://sebastiandedeyne.com/webmentions-on-a-static-site-with-github-actions/,
      though still doesn't touch on the complexities of sending webmentions
      (which, given the low amount of posts I have, is the thing I'm more likely
      to want) using a file system managed and pre-rendered site.
    author:
      name: Alan
      url: https://xoxo.zone/@Alanmoo
tags:
  - IndieWeb
---
[@Alanmoo](https://xoxo.zone/@Alanmoo), what concerns do you have? There should be options regardless of your framework.

For receiving webmentions, webmention.io should be pretty flexible. I'm using webmention.js to display those mentions but mainly because I'm lazy. For sending, I use a [modified netlify build plugin](https://www.npmjs.com/package/@aciccarello/netlify-plugin-webmentions). I am thinking about some improvements to that flow, but there are options.

The [IndieWeb dev chat channel](https://indieweb.org/discuss) is usually pretty active too if you have questions.
---
date: 2024-05-10T19:23:09.833Z
slug: reply-static-wm
in-reply-to: https://xoxo.zone/@huwfulcher@toot.wales/112417928456424348
tags:
  - IndieWeb
references:
  - referenceIdUrl: https://xoxo.zone/@huwfulcher@toot.wales/112417928456424348
    url: https://toot.wales/@huwfulcher/112417928486904357
    type: entry
    author:
      type: card
      name: Huw Fulcher
      nickname: "@huwfulcher@toot.wales"
      url: https://xoxo.zone/@huwfulcher
    content: "Help me out here #indieweb I currently have a statically generated
      site. How much of a headache is it going to be to integrate more IndieWeb
      features like reactions, mentions, etc? Am I better off going server side
      or using calls to endpoints on page load?"

---

For displaying webmentions on a static site, I went with using webmention.io as my webmention endpoint and fetching responses in the browser using https://github.com/PlaidWeb/webmention.js

To send webmentions, I have an automatic process in my Netlify build to check my feed and send mentions, but you could also use https://webmention.app/ to do the same.


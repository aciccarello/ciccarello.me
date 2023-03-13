---
date: 2023-03-13T15:58:59.586Z
reply:
  url: https://darthmall.net/weblog/2023/npms-effect-on-dev-workflow/
  name: W. Evan Sheehan
  content: "What I’d like to do is just rely on ECMAScript modules (ESM) imports
    in development because I’m not worried about the network latency and chained
    requests in development. Then for production I can bundle everything for
    performance. "
slug: npm-pika-dev
tags:
  - technology
---
This reminds me of the work www.pika.dev was doing, however their tools only work with ESM packages and the docs.skypack.dev URLs don't work in Node right now.
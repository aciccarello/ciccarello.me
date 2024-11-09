---
date: 2023-10-09T20:24:44.211Z
in-reply-to: https://catgirlin.space/posts/my-plans-for-this-website/
slug: interactive-static
references:
  - published: 2022-12-04T00:00:00
    content: i want to be able to write little short-form notes on my phone. i don't
      want to have to open vs code on my macbook to write a whole post. i want
      to be able to add more indieweb things like bookmarks, likes, and replies
      in a way that's easy for me to use.
    url: https://catgirlin.space/posts/my-plans-for-this-website/
    post-type: article
    name: my plans for this website
    author:
      name: kitt
      url: https://catgirlin.space/
      photo: https://catgirlin.space/images/pfp.jpg
tags:
  - IndieWeb
---
I also have a static site and one thing I've been considering is having a [Micropub](https://indieweb.org/Micropub) server to handle the interactive parts.
The API is a little restrictive but it's simpler than having a fully dynamic site. [Indiekit](https://getindiekit.com/) is a cool project that hooks into a static site repo.
It then can be used with a [client app](https://indieweb.org/Micropub/Clients) for publishing notes, replies, bookmarks, and other types of posts.

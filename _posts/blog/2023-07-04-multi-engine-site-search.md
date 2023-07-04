---
title: Multi-engine site search
date: 2023-07-04T08:06:21.540Z
tags:
  - site updates, technology
image: /assets/img/search-engine-feature-photo.jpg
image_alt: Woman looking up at trees through binoculars.
image_caption: Photo by <a href="https://unsplash.com/@imagesbykayla?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kayla Farmer</a> on <a href="https://unsplash.com/photos/nhi3_11E6zM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
syndication:
  - https://dev.to/ajciccarello/multi-engine-site-search-1ege
  
---
I added the [/search](/search/) page to the site with a form supporting multiple search engines. The hope is to give visitors a bit more choice in what companies to interact with.

The challenge was managing different query param for different sites.

- DuckDuckGo doesn't support multiple `q=` params, but does accept `sites=`
- Ecosia doesn't support a `sites=` param but does support multiple `q=` params (albeit with an extra comma requiring a space)
- Google does support a `as_sitesearch=` param but that was dropped with the addition of another `q=` param.

By adding several different hidden form fields, I was able to cover each engine (almost) seamlessly.
Then the only difference was the form action would could be defined on the button.
The final result is as follows:

```html
<form rel="search" method="get">
    <input type="hidden" name="sites" value="ciccarello.me"/>
    <input type="hidden" name="q" value="site:ciccarello.me "/>
    <input type="text" name="q" placeholder="Search"/>
    <button type="submit" formaction="https://ecosia.com/search">Search with Ecosia</button>
    <button type="submit" formaction="https://www.google.com/search">Search with Google</button>
    <button type="submit" formaction="https://duckduckgo.com/">Search with DuckDuckGo</button>
</form>
```

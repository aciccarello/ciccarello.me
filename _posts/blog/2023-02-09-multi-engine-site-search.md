---
title: Multi-engine site search
date: 2023-02-09T06:48:24.712Z
permalink: /drafts/search
tags:
  - site updates
eleventyExcludeFromCollections: draft
---
I added the [/search](/search/) page to the site with a form supporting multiple search engines. This gives users a choice in case they have a preference.

The challange was, different sites have different query param support.

- DuckDuckGo doesn't support multiple `q=` params, but does accept `sites=`
- Ecosia doesn't support a `sites=` param but does support multiple `q=` params (albeit with an extra comma requiring a space)
- Google does support a `as_sitesearch=` param but that was dropped with the addition of another `q=` param.

Then the only difference was the form action would could be defined on the button. The final result is as follows:

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

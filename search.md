---
title: 'Search'
layout: page
---

<style type="text/css">
form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 0.5rem;
}

input[type=text] {
    flex-basis: 100%;
}

button {
    flex-basis: 0;
    flex-grow: 1;
}
</style>

Search the site using one of the suggested search engines.

<form rel="search" method="get">
    <input type="hidden" name="sites" value="ciccarello.me"/>
    <input type="hidden" name="q" value="site:ciccarello.me "/>
    <input type="search" name="q" placeholder="Search" aria-label="Query"/>
    <button type="submit" formaction="https://ecosia.com/search">Search with Ecosia</button>
    <button type="submit" formaction="https://www.google.com/search">Search with Google</button>
    <button type="submit" formaction="https://duckduckgo.com/">Search with DuckDuckGo</button>
</form>

_Note: Not all pages will appear in search results._

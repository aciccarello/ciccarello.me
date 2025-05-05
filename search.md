---
title: 'Search'
layout: page
---

<script type="module" src="/assets/js/pagefind-search.js"></script>
<link rel="stylesheet" href="/pagefind/pagefind-ui.css">
<style type="text/css">
pagefind-search {
    --pagefind-ui-scale: 1;
    --pagefind-ui-primary: var(--color-alternate);
    --pagefind-ui-text: var(--text-on-background);
    --pagefind-ui-background: var(--color-background);
    --pagefind-ui-border: var(--color-border);
    --pagefind-ui-tag: #eeeeee;
    --pagefind-ui-border-width: 2px;
    --pagefind-ui-border-radius: var(--border-radius);
    --pagefind-ui-image-border-radius: 8px;
    --pagefind-ui-image-box-ratio: 3 / 2;
    --pagefind-ui-font: sans-serif;
}

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
button.pagefind-ui__search-clear {
    width: unset;

    &:hover {
        background-color: unset;
    }
}
</style>

Search the site using one of the suggested search engines.

<pagefind-search>
<form rel="search" method="get">
    <input type="hidden" name="sites" value="ciccarello.me"/>
    <input type="hidden" name="q" value="site:ciccarello.me "/>
    <input type="search" name="q" placeholder="Search" aria-label="Query"/>
    <button type="submit" formaction="https://ecosia.com/search">Search with Ecosia</button>
    <button type="submit" formaction="https://www.google.com/search">Search with Google</button>
    <button type="submit" formaction="https://duckduckgo.com/">Search with DuckDuckGo</button>
</form>
</pagefind-search>

_Note: Not all pages will appear in search results._

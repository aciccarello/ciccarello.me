---
title: 'Search'
layout: page
redirect_from: /s
---

<link rel="stylesheet" href="/pagefind/pagefind-component-ui.css">
<script type="module" src="/pagefind/pagefind-component-ui.js"></script>
<style type="text/css">
{% removeindents %}
:root {
    --pf-text: var(--text-on-background);
    --pf-text-secondary: var(--text-on-background);
    --pf-text-muted: var(--text-on-background);
    --pf-background: var(--color-background);
    --pf-border: var(--color-border);
    --pf-border-focus: var(--color-alternate);
    --pf-hover: var(--color-background-1);
    --pf-mark: var(--color-alternate);
    --pf-font: var(--body-font);
    --pf-border-radius: var(--border-radius);
    --pf-outline-focus: var(--color-alternate);
    --pf-input-height: 3rem;
    --pf-input-font-size: 1rem;
    --pf-result-title-font-size: 1rem;
    --pf-result-excerpt-font-size: 0.95rem;
    --pf-results-gap: 1rem;
    --pf-image-width: 7rem;
    --pf-image-height: 4.5rem;
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
{% endremoveindents %}
</style>

Search the site.

<pagefind-config preload></pagefind-config>
<pagefind-input></pagefind-input>
<pagefind-summary default-message="Type to search"></pagefind-summary>
<pagefind-results show-images></pagefind-results>
<pagefind-keyboard-hints></pagefind-keyboard-hints>

Search with one of the suggested search engines instead.

<form rel="search" method="get">
    <input type="hidden" name="sites" value="ciccarello.me"/>
    <input type="hidden" name="q" value="site:ciccarello.me "/>
    <input type="search" name="q" placeholder="Search" aria-label="Query"/>
    <button type="submit" formaction="https://ecosia.com/search">Search with Ecosia</button>
    <button type="submit" formaction="https://www.google.com/search">Search with Google</button>
    <button type="submit" formaction="https://duckduckgo.com/">Search with DuckDuckGo</button>
</form>

_Note: Not all pages will appear in search results._

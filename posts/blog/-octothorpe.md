---
title: Trying out Octothorpe Harmonizers
date: 2025-10-18
permalink: /drafts/octothorpe/
tags:
  - technology
eleventyExcludeFromCollections: true
eleventyExcludeFromCollectionsReason: draft
---

I've been following the Octothorp.es project for a while now.
I love how they are trying to improve discovery of blogs similar to how you can discover posts by tag on Mastodon.

## Problem Statement

However I had two minor issues with the initial implementation:

1. It required custom syntax be added to a site 
2. The suggested way to index was with a preload header 

The first issue was disappointing because my site already has a syntax for defining tags using Microformats2.
I'd rather not update templates and add more tags to the `<head>` of my site if I didn't have to.
(i.e. `<link rel="octo:octothorpes" href="hummingbirds">` or `<a rel="octo:octothorpes" href="https://OP-SERVER/~/hummingbirds">#hummingbirds</a>`)

The second was that prefetching was both inefficient (a ping per page view) and potentially could expose viewers of sites to more surveillance.
I appreciated that it was a solution that worked even for static sites.
But it appeared to be abusing a web feature in a way that didn't align with the purpose.
I don't assume any malice on the part of octothorp.es and don't expect that they were _actually_ doing any tracking.
But it didn't feel like the right approach.
Plus, my site already had a way to ping other sites via webmentions.
(`<link rel="preload" as="fetch" href="https://octothorp.es/?uri=https://YOURDOMAIN.COM/PATH/TO/CURRENT/PAGE">`)

Note that neither of these issues were particularly large, but they did hold me back from trying out the project.

## Harmonizers Introduced

Recently, I learned that the project had introduced a new concept called "[Harmonizers](https://docs.octothorp.es/harmonizers/)".
Essentially, these are configuration files that make an Octothorpe server aware of the syntax to use when parsing a site.
What's cool is that this can be used to define shared parser configs AND per-site (or even page) configurations.

This caught my eye because I could potentially solve problem #1 with this feature.

## Debugging

Pretty early on, I noticed that the documentation for Harmonizers was a little under-baked.
There were some great examples and a link to the debugging API.
But some of the explanations were abruptly cut short and there were acknowledgements about gaps in the docs.
Particularly, there wasn't much explaining what each part of the config files meant.

But since there was a debugging API, I was able to dive in.
I started by creating a GitHub gist that I could use against the debug API without needing to deploy small changes to my site.
I took one of the examples and tweaked it slightly.

After doing some research, I found a harmonizer [in a test file](TODO find URL) referencing some microformats.
I tried it out but immediately ran into problems.
Because the harmonizer defines a simple CSS selector syntax, the code was picking up post suggestions on my page rather than just the primary post.
This makes sense because my site implements them as full `.h-entry` elements so the shared template can properly implement a feed file.
But since the harmonizer was not using the [primary post algorithm]() it would confuse the main and suggested posts.

My solution involved some narrowing of the selector but also using the newer `:not()` selector to exclude some elements.

Another issue I ran into was the text selection.
The default logic would pull in all kinds of whitespace.
[I requested](https://github.com/stucco-software/octothorp.es/issues/137#issue-3499579864) a trim function be added.
Thankfully the team was really responsive and implemented that quickly.

The more significant issue I ran into was that the indexer did not yet take custom harmonizers into account.
So my site with no harmonozier logic was ignored.

I also didn't send the webmention like I expected.
I had to make some tweaks to the wm repo from 

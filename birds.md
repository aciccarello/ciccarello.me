---
title: Birds
layout: page
last_modified_date: 2024-02-11
image: /assets/img/2020-birding-ca-brown-pelican.jpg
image_alt: 'Brown pelican with water behind.'
---

<style type="text/css">
  :root {
    --color-base-hue: 540;
  }

  .post-list-heading > .btn-link {
    margin-left: 0.5rem;
  }
</style>

I'm a birder who has lived in North San Diego County for the last 5 year. Originally from the east coast I grew up watching colorful songbirds come to my backyard. While spending time traveling Latin America, I got back into birding, enjoying exploring what each area had to offer. Since then I've used birding as a way to enrich my travels. I'm fascinated by the variety of birds in the world and all their unique behaviors. In San Diego, I love checking out different kinds of habitats to take full advantage of the biodiversity in the county. More recently I've been working on improving my sound ID skills, connecting with more birding community events, and tracking down a few local species that have eluded me.

## Featured Links

### My Pages

- [eBird Profile](https://ebird.org/profile/OTUwMDI4/) (username a3chic9)
- [My San Diego Birding Recommendations](/reviews/san-diego/birding/)
- [2026 Birdathon Fundraiser](https://charity.pledgeit.org/sandiegobirdathon2026/@aciccarello)
- [Caw](/caw)

### Birding Resources

- [Merlin App](https://merlin.allaboutbirds.org/): Great phone field guide for visual and audio ID
- [Birding Hotspots](https://ebird.org/hotspots)
- [Bird Cams](https://www.allaboutbirds.org/cams/all-cams/)

### Bird Organizations

- [San Diego Bird Alliance](https://www.sandiegobirdalliance.org/)
- [Buena Vista Audubon](https://bvaudubon.org/) located in northern San Diego County

## Featured Tags

{% removeindents %}

<ul class="chip-set">
    <li>
        <a href="/posts/tags/birds/" class="chip-item">Birds</a>
    </li>
    <li>
        <a href="/posts/tags/birding/" class="chip-item">Birding</a>
    </li>
    <li>
        <a href="/posts/tags/birdingyearinreview/" class="chip-item">BirdingYearInReview</a>
    </li>
    <li>
        <a href="/posts/tags/sdbirdfest/" class="chip-item">SDBirdFest</a>
    </li>
</ul>

<div class="container h-feed">
 <h2 class="post-list-heading p-name">
  Latest Updates
    <a class="btn-link btn-alternate" href="/posts/tags/birds">
        See All
    </a>
 </h2>
 <ol class="post-list">
    {%- assign posts = collections["birds"] | reverse %}
		{%- for post in posts limit: 5 -%}
    <li>
    {% include "post-card.html" post: post, showKind: true %}
    </li>
		{%- endfor -%}
  </ol>
</div>
{% endremoveindents %}

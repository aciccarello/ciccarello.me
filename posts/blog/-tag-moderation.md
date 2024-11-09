---
title: Can self reported tags help communities reduce moderation fights?
permalink: "/drafts/tag-moderation/"
date: 2022-12-19
tags:
 - IndieWeb
eleventyExcludeFromCollections: true
eleventyExcludeFromCollectionsReason: draft
---

One interesting aspect to watch as Mastodon communities have grown is how different instances have developed their own standards for what content is allowed. Some sites are fairly restrictive, while others more hands off. But since Mastodon is a federated system, differing rules require moderators to not only moderate their own community, but also communities the site interacts with. This leads to situations where people are blocked because they don't follow specific policies like when to use content warnings that their server doesn't require.

![screenshot of mastodon admin politics]()

There are also differing legal rules and definitions. Some content is illegal in some countries, while protected by free speech in others.

The IndieWeb community is structured in an even more granular model. Each person's site can be operated under their own rules. There currently isn't a form community moderation so ...

I've been adding content to my site with varying interests. Somethings will be personal updates. Others are technical developer focused content. Some days I'll post a series of recipes we've been cooking. I don't imagine everyone will want all this content. I've considered splitting up my content into specific feeds: personal, technical, recipes, photography. But where do I stop? Do I add feeds for travel? Birding? Site updates?

There's a concept I've heard called "follow people, not feeds", which aims to bring content creation back to a human perspective. People are multifaceted. I'm not purely a developer, or purely a traveler. I'm also interested in nature, and photography, and the occasional recipe. Additionally, you never know what content people are interested in so trying to organize an ever-growing list of feeds to publish is an impossible task.

In the IndieWeb community, I've heard people talk about how it should be up to the reader to filter the content they are interested in; and feed reader software should help them do it. But I haven't understood how readers and publishers would agree on how to implement those filters.

Then I read an interview of Matt Mullenweg, co-founder of Wordpress, discussing his acquisition of the social platform Tumblr. He talked about how difficult content moderation is and how years ago, the platform's content got them in trouble with Apple leading to the app being removed from the App Store. Apple's content rules were stricter than the community's.

The solution Tumblr has settled on involves tagging content. Users on the network are expected to tag their posts if they fall into particular categories. These categories are then used to filter the content that is accessible in the iPhone app, allowing Tumbler to meet Apple's community standards, while also existing with different standards.

> Yeah. You open your Tumblr and you’re browsing through, you don’t want that stuff popping up when someone walks by. That’s embarrassing for everyone involved. We really thought about it from a user-centric point of view. We have seen that this actually aligns incentives.
>
> Let’s say you’re a burlesque performer in New York City. Bathtub Gin, right? It’s an awesome, famous, burlesque place. You want to post pictures from your performance. These are mature, you don’t want kids to see these, so you can tag this and now you know that it will be protected. Folks under 18 won’t even know it exists, but people who want to see this can
>
> [How to buy a social network, with Tumblr CEO Matt Mullenweg](https://www.theverge.com/23506085/wordpress-twitter-tumblr-ceo-matt-mullenweg-elon-musk) By Nilay Patel

I think this is a fascinating model: self reported tags allow filtering content based on different standards. Thinking about this I wonder if there was a way for Mastodon instances to lean on a content tagging model to allow for more flexible moderation standards. Instead of banning whole sites for having looser standards, a site could filter the content to remove unwanted content.

![potentially a tumblr screenshot of tags]()

I recognize this isn't foolproof. The tags would be self reported, and tagging guidelines would need to be established. However I think this has potential. Communities could come together to adopt shared guidelines for how content should be tagged, while having the freedom to set different rules. Tag suggestions could allow communities to guide and share decisions.

This could also help with following people too. Even beyond content warnings, people can use tags to communicate or organize content. Readers can make decisions about what tags to follow or filter out.

There's already a similar set of guidelines around content warnings sensitive graphic content. Most Mastodon instances require users to hide potentially upsetting content. Users can also choose if they want that content shown by default. However, the lack of broad agreement about what qualifies as graphic or any granularity around different types of potentially upsetting content has left open the door for disagreements.

![mastodon graphic image warning and content warning screenshots]()

As someone who isn't an active Tumblr user, I'd be interested to learn more about how their system works. What kinds of tags are required? Is tagging a pain?

Some aspects of self-moderation don't seem likely to work. I doubt anyone would tag their own post as #racist or #hatespeech. This is only helpful for content where the author is acting in good faith to limit their audience. Bad faith content moderation is a trickier nut to crack and beyond the scope of this idea.

Working across languages might also be a challenge. A system that requires English tag names seems doomed to fail internationally. But I'm not sure how you'd figure out the mappings for #nsfw in all languages. Would a standards body need to get involved to define a schema?

Even if tagging each post isn't feasible, I wonder if there is a way to use some kind of tagging system to indicate what kind of content may appear in a feed or from a mastodon instance.

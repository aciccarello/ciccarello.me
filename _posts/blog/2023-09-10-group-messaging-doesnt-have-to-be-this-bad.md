---
title: Group messaging doesn't have to be this bad
subtitle: A rant about Apple not playing nice with RCS interoperability
date: 2023-09-10T14:29:49.356Z
tags:
  - technology
  - rant
image: /assets/img/2023-apple-rcs-text.png
image_alt: "Text thread where a message from 'People' says 'Can we have better messaging?'. Apple Inc responds with '👎 to Can we have better messaging?'. Bottom of messaging view says 'RSS Messaging is not available with Apple Inc right now'."
updates:
  - date: 2023-11-16T19:41:14.876Z
    description: Added note about RCS support announcement from Apple
---

<aside>
    Update: On November 16th, 2023 after years of industry pressure, <a href="https://9to5mac.com/2023/11/16/apple-rcs-coming-to-iphone/">Apple announced</a> <q cite="https://9to5mac.com/2023/11/16/apple-rcs-coming-to-iphone/">Later next year, we will be adding support for RCS Universal Profile</q>. Here's to hoping this post is mostly moot in 2024!
</aside>

As one of the few members of my family who doesn't use an iPhone, I frequently get blamed for ruining group messaging.
Photos and videos come through compressed beyond recognition.
Reactions come through as separate messages (on iPhones at least, Google shows the texts as proper reactions).
Adding and removing group members results in entirely new threads.

These issues makes texting clunky.
The SMS texting standard and the later MMS standard are extremely limited.
iMessage supports a lot of more modern features natively but is only available on Apple devices.
There are lots of third party messaging services that try to fill the gap, but these aren't ideal either.

It seems like every social group has a different app they prefer.
Many international groups use Whatsapp but not everyone in the US has that installed and it is controlled by Meta.
Some people even actively avoid it.
There are more privacy centered options like Signal and Telegram but those aren't common in my circles.
I've seen organizations where people avoid written messages entirely and use something like Voxer voice recordings.
My personal least favorite is Marco Polo which entirely revolves around video messages.

## An updated texting standard

But for years now, there has been a standard that solves many of these issues: RCS.
Designed to replace SMS texting, RCS is a modern messaging standard that works over the internet, including on wifi-only connections.
It supports sending larger multimedia files including video and voice messages.
Other modern messaging features like reactions and typing indicators make conversations smother.
Group management is much simpler, with named groups and the ability to edit recipients without splintering into multiple text chains.

But RCS is not available for everyone.
For a while phone companies were slow to implement the new standard.
Then Google gave up on most of their other instant messaging platforms and threw it's weight behind RCS.
Google built RCS into Android's main texting app, and has worked with telcoms and phone providers like Samsung to get broader support.
But there is still one holdout...Apple.

Initially, Apple indicated the standard wasn't ready yet.
It complained about a lack of encryption saying it weakened user's security.
But SMS already isn't encrypted so users aren't protected now.
Furthermore, Google has added support for encryption to RCS, giving actual protection that Apple could also support.
Even more blatantly, Apple's CEO [Tim Cook has said](https://www.theverge.com/2022/9/7/23342243/tim-cook-apple-rcs-imessage-android-iphone-compatibility) that people wanting to send videos should "buy your mom an iPhone".
In short, it looks like Apple is afraid interoperability would weaken their iMessage monopoly.

RCS is not without it's issues.
The RCS rollout was a slow and painful process leaving some companies hesitant to jump in.
There are still sometime connections issues and problems when switching phones.
I also would prefer for Google to be less central of a player in the standard.
There are also existing challenges to texting like the risk of spam.
It's unclear if international telecoms will offer free RCS messaging rates or only subsidize Meta's Whatsapp.

## Waiting for change

Still, for a base messaging platform, every phone should support RCS.
We should be able to send each other videos. We should be able to natively react to messages.
iMessage can still be a separate system and work on its own innovations.
But it should support RCS as the lowest common denominator.

There were some indications that the EU might require Apple to support the messaging standard as they are doing with charging cable standards.
However, the regulatory body initially declined to include iMessage in the classification that would require it to use the standard.
But it is unfortunate that a ruling is needed at all.
Apple is purposefully holding texting back for everyone.

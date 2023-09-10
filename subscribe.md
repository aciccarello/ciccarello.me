---
title: 'Subscribe'
layout: page
---

Get sent updates on the latest posts!
If you'd prefer to only subscribe to posts about foster care, use the form on the [foster care](/foster/#subscribe) page.

## Email Subscription

The easiest way to subscribe is via email. Emails are sent out no more often than once a week and you can unsubscribe at any time.

<form action="https://static.mailerlite.com/webforms/submit/c3c9u1" data-code="c3c9u1" method="post">
    <label>Your email: <input type="email" required name="fields[email]" autocomplete="email"/><br /></label>
    <label>First Name (optional): <input type="text" name="fields[name]" autocomplete="given-name"/><br /></label>
    <label>Last Name (optional): <input type="text" name="fields[last-name]" autocomplete="family-name"/><br /></label>
    <input type="hidden" name="groups[]" value="105825814">
    <input type="hidden" name="ml-submit" value="1">
    <input type="hidden" name="anticsrf" value="true">
    <button type="submit">Subscribe via email</button>
</form>

## Subscribe Using a Feed Reader

This blog also supports subscribing via RSS (technically Atom). Using an feed reader you can subscribe to the [feed URL]({{ "/feed.xml" | url }}). Learn more about RSS on aboutfeeds.com.

<input type="button" onclick="(function(btn){var z=document.createElement('script');document.subtomeBtn=btn;z.src='https://www.subtome.com/load.js';document.body.appendChild(z);})(this)" value="Subscribe via feed reader">

In addition to RSS, any of the [feed pages](/posts) are compatible with [IndieWeb readers](https://indieweb.org/reader) (via h-feed microformats).

## Follow on Mastodon or other fediverse networks

If you use a federated service like [Mastodon](https://joinmastodon.org/) you can follow me by searching your server for <code>@anthony@ciccarello.me</code>.
All posts from this site will be federated to the network (via ActivityPub).
Enter your account below to be redirected to your server's follow page.

<form method="post" action="https://fed.brid.gy/remote-follow">
 <label for="follow-address">Follow @anthony@ciccarello.me by entering your fediverse address:</label>
 <input id="follow-address" name="address" type="text" required="" placeholder="@you@domain.social" alt="fediverse address" value="">
 <input name="domain" type="hidden" value="ciccarello.me">
 <input name="protocol" type="hidden" value="web">
 <button type="submit">Follow</button>
</form>

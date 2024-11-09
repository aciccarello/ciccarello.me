---
title: 'Takeaways from ng-conf 2016'
date: 2016-05-27
tags:
  - technology
  - ngconf
image: /assets/img/ngconf-2016-attendees.jpg
image_alt: crowd of people in a courtyard, arrow and label on picture saying 'that's me'
todo: fix embeds
syndication:
  - https://medium.com/@aciccarello/takeaways-from-ng-conf-2016-61a2225b286f
---

I know it has already been three weeks since [ng-conf](https://www.ng-conf.org/#/) but I wanted to highlight my takeaways from the conference. This
was the first technical conference I had ever attended so almost everything
was a new experience for me. The only exposure I had to the format was through
YouTube videos of talks from [ng-conf 2015](https://www.youtube.com/playlist?list=PLOETEcp3DkCoNnlhE-7fovYvqwVPrRiY7) and
[AngularConnect](https://www.youtube.com/channel/UCzrskTiT_ObAk3xBkVxMz5g/feed)
but attending in person was entirely different.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/ngconf?src=hash&amp;ref_src=twsrc%5Etfw">#ngconf</a> 2016 <a href="https://t.co/mTs6frxVlj">pic.twitter.com/mTs6frxVlj</a></p>&mdash; ng-conf (@ngconf) <a href="https://twitter.com/ngconf/status/730225043750322176?ref_src=twsrc%5Etfw">May 11, 2016</a></blockquote>

The three day conference included
[keynote](https://www.youtube.com/watch?v=gdlpE9vPQFs)
[announcements](https://youtu.be/bSssb9AmiJU?t=25m22s) from the Angular team,
plenty of talks and a "Fair Day" which included games, talks, workshops, and
smaller settings such as the "Ask Me Anything" sessions. Even above the talks,
I personally enjoyed the opportunity to join in on discussions on what the
Angular community was doing. Going into the conference, I was one of only a
handful of developers in my department using Angular so in many ways I had
been blazing my own trails. After those three days, I had a much broader
exposure to what the community was doing and where Angular is heading. Here
are the things that stood out the most to me.

## Angular is being used in production

One thing that Brad Green emphasized in his
[keynote](https://www.youtube.com/watch?v=gdlpE9vPQFs) was that Angular 2 is
already being used in production. The Weather Channel, Lucid Chart, and
Capital One all spoke about how Angular 2 has already been integrated into
their websites. Brad also announced that Angular 2 was now in release
candidate, signaling that the API is narrowing in on its final form.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">From <a href="https://twitter.com/hashtag/ngConf?src=hash&amp;ref_src=twsrc%5Etfw">#ngConf</a>, Angular 2 is already used in production including Google AdWords, Capital One and the Weather Channel.</p>&mdash; Rachid Al Khayat 🍕 (@rakhayyat) <a href="https://twitter.com/rakhayyat/status/729032357462806528?ref_src=twsrc%5Etfw">May 7, 2016</a></blockquote>

## Angular is multi-platform

> Chef [@jenlooper](https://twitter.com/jenlooper) and chef [@tjvantoll](https://twitter.com/tjvantoll) are cooking up cross platform [@nativescript](https://twitter.com/nativescript) apps at [#ngconf](https://twitter.com/hashtag/ngconf)
>  —  [@ruslanml](https://twitter.com/ruslanml/status/727997662687944705)

While projects like [Ionic](http://ionicframework.com/) allowed using Angular
1 in platforms beyond desktop browsers, it remained primarily a web thing.
With the architecture and speed of Angular 2, many more options are available.
Ionic 2, [NativeScript](https://www.youtube.com/watch?v=R3nyG2xtzeQ), and
[React Native](https://www.youtube.com/watch?v=yDbaihb1eIs) all can leverage
Angular for mobile experiences. The Angular team itself showed off an Angular
[progressive web app](https://www.youtube.com/watch?v=wLWVASD0dvU) for a rich
web experience on mobile. Further, [Angular
universal](https://www.youtube.com/watch?v=TCj_oC3m6_U) is leveraging Angular
server-side to pre-render applications before serving them to the client. With
all these options, the possibilities seem endless for Angular 2.

## TypeScript is being embraced by the JavaScript community

As a new-grad hire who only worked with JavaScript minimally before starting a
project with TypeScript, I honestly have had more experience with TypeScript
than with plain ES5. The tooling help TypeScript enables is not to be
discounted and at ng-conf there were many speakers who
[encouraged](https://www.youtube.com/watch?v=e3djIqAGqZo)
[more](https://www.youtube.com/watch?v=dzPjBWLdGz0) TypeScript
[adoption](https://youtu.be/GE5gZX6V6Zs). This was great to see as user of the
language and I hope it leads to better integration with other build tools.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Yes yes yes! <br>&quot;This is <a href="https://twitter.com/hashtag/TypeScript?src=hash&amp;ref_src=twsrc%5Etfw">#TypeScript</a>&quot; - <a href="https://twitter.com/scotups?ref_src=twsrc%5Etfw">@scotups</a> <br>Let the people know! <a href="https://twitter.com/hashtag/ngconf?src=hash&amp;ref_src=twsrc%5Etfw">#ngconf</a> <a href="https://t.co/CQzeJJUAay">pic.twitter.com/CQzeJJUAay</a></p>&mdash; Justin Schwartzenberger (@schwarty) <a href="https://twitter.com/schwarty/status/728637802951245825?ref_src=twsrc%5Etfw">May 6, 2016</a></blockquote>

## You will want to use the offline template compiler

In Angular 1 templates were retrieved and interpreted in the browser. Angular
2 will have the option of handling this step during the build process. This
removes a significant chunk of the framework from the browser payload. This
also means that templates will be converted to the base Angular instructions
which browsers will be able to run much more optimally than the complex
functions Angular 1 templates produced.

{% include "embed-link.html"
    title: "Aha Moments from ngconf 2016 Part 1: Angular 2.0 Compile Cycle"
    url: "https://medium.com/p/6f462f68632e"
    description: "This is sealed that ngconf is truly the best conference ever, at least for me and I'm sure for a lot of coders like me."
    img: "/assets/img/embed-thumbnail-aha-moments-from-ngconf-2016.jpg"
    alt: "diagram with flow chart demonstrating angular compile flow"
%}

## The Angular CLI will be the goto way to build Angular apps

I didn't understand the value of the [angular-cli
project](https://cli.angular.io/) going into the conference, but it was
probably the biggest takeaway I had. The CLI will set up your build process.
Generate components, services, and routes. It includes [style guide
suggestions](https://www.youtube.com/watch?v=bci-Z6nURgE). It may even one day
[automate version upgrades](https://youtu.be/bSssb9AmiJU?t=58m3s). While the
project still has a ways to go, [Mike Brocchi's
talk](https://www.youtube.com/watch?v=wHZe6gGI5RY) showed the power it
contains. In my mind, this it the anecdote to the biggest headache in Angular
2, which is the build process management but also the future for the majority
of Angular 2 development.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Honestly, IMHO, angular-cli is the single most important feature to helping people adopt Angular 2 <a href="https://twitter.com/ngconf?ref_src=twsrc%5Etfw">@ngconf</a> <a href="https://twitter.com/hashtag/ngconf?src=hash&amp;ref_src=twsrc%5Etfw">#ngconf</a></p>&mdash; Hannah Howard (@techgirlwonder) <a href="https://twitter.com/techgirlwonder/status/728633226923663360?ref_src=twsrc%5Etfw">May 6, 2016</a></blockquote>

---

ng-conf 2016 will certainly be one of the highlights of my year. Angular 2 is
ready for developing the next generation of JavaScript applications. I can't
wait to see what we'll be able to build with it.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

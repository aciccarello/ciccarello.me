---
title: Styling an RSS/Atom feed with XSL
date: 2021-04-17T23:10:07+00:00
tags:
  - technology
image: /assets/img/feed-xsl-view.jpg
image_alt: View of feed page
---

On my blog I link to my RSS/Atom feed for the convenience of people who use a feed reader. However, since this is an XML document, clicking on the link could be confusing for web visitors. I had previously looked into adding styles to the XML document to make it less scary, but the feed structure isn't very conductive to normal CSS styles.

I thought I was out of luck on a useless exercise until I saw [a post from Hsiaoming Yang](https://lepture.com/en/2019/rss-style-with-xsl). XML provides essentially a templating language that allows creating an HTML document from a raw XML file. By selecting the data needed, you can create just about any view desired.

```xml
  <!-- excerpt of feed.xsl -->
  <section class="summary">
    <h1><xsl:value-of select="atom:title"/></h1>
    <p><xsl:value-of select="atom:subtitle"/></p>
    <a>
      <xsl:attribute name="href">
        <xsl:value-of select="atom:link[@rel='alternate']/@href"/>
      </xsl:attribute>
      Visit Website &#x2192;
    </a>
  </section>
```

_[(view the full source)](https://github.com/aciccarello/ciccarello.me/commit/7f8fd2abd682c27bf6ee5f3d106f95238057b74d#diff-234a9d0bd6901845658840b4fa14d3b6defb3a887799ea1cfad49af7c70c1d05R66-R75)_

The XSL in that document was written for a podcast RSS feed, so I wrote my own for an Atom feed. Since the XSL is independent of the data, it should work for most Atom feeds with only minor modifications needed. The key changes are adding a reference to the XSL to your feed file. Then adjust the XSL file for any missing data or styling changes you'd like.

```xml
<!-- start of feed.xml -->
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet href="/assets/feed.xsl" type="text/xsl"?>
<feed xmlns="http://www.w3.org/2005/Atom">
```

As powerful as XML is, it's also not particularly developer friendly. I often found that if there was a syntax error or bad reference, the browser gave me almost no indication as to what was wrong. I ended up keeping my scope limited and not working too hard on styling since this isn't a standard web page. That said, it felt like a usability win to be able to point lost visitors back to the main website in case someone does click on the feed link.

You can see the final product at [www.ciccarello.me/feed.xml](/feed.xml). Feel free to check out the [commit](https://github.com/aciccarello/ciccarello.me/commit/7f8fd2abd682c27bf6ee5f3d106f95238057b74d) for the full source.

---
title: Style Guide
layout: page
examplePagination:
  href:
    prev: null
    next: '/?page=2'
  hrefs:
    - '/style-guide/'
    - '/style-guide?page=2'
    - '/style-guide?page=3'
    - '/style-guide?page=4'
  pages:
    - { url: '/style-guide/' }
    - { url: '/style-guide?page=2' }
    - { url: '/style-guide?page=3' }
    - { url: '/style-guide?page=4' }
---

This page lays out the site-wide styles and how to use them. It's a form of visual documentation and a reference for how to display visual elements. It also allows easier testing of styles and cross-browser compatibility checks. This page was partially inspired by pages like [gRegor Morrill's style guide](https://gregorlove.com/style-guide/) and some CSS framework documentation sites.

See the source of [common.css](/assets/css/common.css) for the complete styles. Custom shortcodes and other build customizations are defined in [.eleventy.js](https://github.com/aciccarello/ciccarello.me/blob/main/.eleventy.js) and the imported files. Includes are defined in the [/\_includes](https://github.com/aciccarello/ciccarello.me/blob/main/_includes) directory.

## Content Style

I'm pretty loose on content but have some loose guidelines in my head.

### Articles

I usually have some kind of featured image when writing articles.
Articles may also have subtitles, though I try to avoid over-using them.
I'm not completely settled on a heading capitalization but usually try to follow something like [APA style](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) where most words are capitalized, but small, minor words after the start are lowercase.

### Recipes

My recipe pages are primarily to track how _we_ make different recipes, so many of them are still very close to the original.
I don't intend or need to pull from other website's SEO, so when posting a recipe I try to use the following conventions:

1. Clearly identify the source in the first paragraph (if not first sentence) of the recipe with a link (or link to the book with page numbers).
1. For recipes I've used as inspiration but don't follow, I still try to list them somewhere in the description.
1. Give some indication of how heavily the recipe was modified so people know if the source might be worth looking at.
1. Write the instructions in my own words so that they match what I do and don't just duplicate content.
1. Never use another site's copyrighted photos for recipes. Even if it's ugly, I'll still use my own.
1. I will mark recipes as "noindex" upon request if the source (e.g. family) does not want it in google results.
1. I'm still trying to figure out what best way to help but not hurt other site's rankings. I could noindex but that wouldn't provide backlinks. Also Google does not always like canonical URL relations, particularly cross domain and if any content has been changed. Canonical URLs also affect how pages get shared.

## Testing Steps

The following steps should be completed to check site-wide style changes.

- Visual check of light/dark mode
- Accessibility check of light/dark mode
- Check multiple browsers (Chrome, Safari, Firefox, Mobile)
- Check multiple screen readers
- Zooming on page
- Changing default font size

## CSS Units

Use REM units where reasonable with a base-2 sizing structure based on a 16px default that can be modified by users for accessibility.
Units that should adjust with the font size can use em units.
Some things like borders or images still are defined in pixels.

Use css custom properties for colors (for theming) and base styles.
The most significant styles would be widths and margins that my need to be referenced elsewhere.

## Colors

Three theme colors are defined. The muted and distinct colors are set to flip between light and dark color schemes.

<style>
.color-container {
  display: flex;
  height: 8rem;
}

.color-example {
  /* split evenly across width */
  flex-grow: 1;
  flex-basis: 0;

  color: var(--text-on-primary);
  font-size: 1.25em;

  /* center the text */
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-base .color-root {
  background: var(--color-base);
}

.color-base .color-muted {
  background: var(--color-base-muted);
  color: var(--text-on-background);
}

.color-base .color-distinct {
  background: var(--color-base-distinct);
  color: var(--text-on-distinct);
}

.color-accent .color-root {
  background: var(--color-accent);
}

.color-accent .color-muted {
  background: var(--color-accent-muted);
  color: var(--text-on-background);
}

.color-accent .color-distinct {
  background: var(--color-accent-distinct);
}
</style>

### Base

The base color is used for the header and outlined buttons.

<div class="color-container color-base">
  <div class="color-example color-root">Base color</div>
  <div class="color-example color-muted">Muted base</div>
  <div class="color-example color-distinct">Distinct base</div>
</div>

### Accent

The accent color is used for buttons

<div class="color-container color-accent">
  <div class="color-example color-root">Accent color</div>
  <div class="color-example color-muted">Muted accent</div>
  <div class="color-example color-distinct">Distinct accent</div>
</div>

### Alternate

The alternate color is used for links

<a href="">Current page</a>
<a href="not-found.example">Random Page</a>

## Typeography

The site uses native OS system fonts.
Headings each have their own size.
To allow for flexibility while retaining semantic accuracy, there should be a class to override heading styles.


### Headers

Headers break up the page content.
They are semantically significant, so if a different heading is visually needed than semantically, specific classes can be used to fake a heading style.
Typically I write headers with "Title Casing" but adjust based on the context.

#### Heading Level 1{.h1}

H1s are used for the title of a page. H1 styling can be forced with the `.h1` class.

#### Heading Level 2{.h2}

H2s help define the major sections of an article. H2 styling can be forced with the `.h2` class.

#### Heading Level 3{.h3}

H3s are used under h2s. H3 styling can be forced with the `.h3` class.

#### Heading Level 4{.h4}

H4s are used under h3s but should be rarely used. H4 styling can be forced with the `.h4` class.

#### Heading Level 5{.h5}

H5s are used under h4s but should be rarely used. H5 styling can be forced with the `.h5` class.

### Body Text Example: Adventures of Huckleberry Finn

You don't know about me without you have read a book by the name of The
Adventures of Tom Sawyer; but that ain't no matter. That book was made
by Mr. Mark Twain, and he told the truth, mainly. There was things
which he stretched, but mainly he told the truth. That is nothing. I
never seen anybody but lied one time or another, without it was Aunt
Polly, or the widow, or maybe Mary. Aunt Polly--Tom's Aunt Polly, she
is--and Mary, and the Widow Douglas is all told about in that book, which
is mostly a true book, with some stretchers, as I said before.

Now the way that the book winds up is this: Tom and me found the money
that the robbers hid in the cave, and it made us rich. We got six
thousand dollars apiece--all gold. It was an awful sight of money when
it was piled up. Well, Judge Thatcher he took it and put it out
at interest, and it fetched us a dollar a day apiece all the year
round--more than a body could tell what to do with. The Widow Douglas
she took me for her son, and allowed she would sivilize me; but it was
rough living in the house all the time, considering how dismal regular
and decent the widow was in all her ways; and so when I couldn't stand
it no longer I lit out. I got into my old rags and my sugar-hogshead
again, and was free and satisfied. But Tom Sawyer he hunted me up and
said he was going to start a band of robbers, and I might join if I
would go back to the widow and be respectable. So I went back.

### Special Text

Text can be **strengthened**, _emphasized_, or even made <small>smaller</small>. In markdown quotes in "quoted text" are stylized to highlight the begining vs the end.

### Text Wrapping

Use the `.no-wrap` class to avoid wrapping text.
As you can see this line of text keeps going without a page break.
However, you should only use this on strings that you don't want to wrap or you can screw up your page formatting. {.no-wrap}

If you don't want to have the text scroll like the above line, a shorter string would only keep the important text together.
E.g. _something like this_{.no-wrap} which will be kept together but other text will wrap.

### Links

[Links in paragraph](.) are styled to increase readability and make it clear they are links. This includes different colored text and underlining, though bold text has been considered. Links should ideally contain [multiple word](.) for increased readability.

In navigation sections, links aren't blue, but their linkyness should probably be emphasized with underlining, at least on hover.

## Buttons

Buttons can be styled with classes.
Disabled buttons should not be clickable.

<div class="btn-group">
  <button>Standard</button>
  <button class="btn-alternate">Alternate</button>
  <button class="btn-flat">Flat</button>
  <button disabled>Standard</button>
  <button disabled class="btn-alternate">Alternate</button>
  <button disabled class="btn-flat">Flat</button>
</div>

Input buttons are also styled like buttons.

<div class="btn-group">
  <input type="button" value="Button Input">
  <input type="submit" value="Submit Input">
  <input disabled type="button" value="Button Input">
  <input disabled type="submit" value="Submit Input">
</div>

Links can also be styled to look similar to buttons but are underlined on hover or focus.

<div class="btn-group">
  <a href="" class="btn-link">Standard</a>
  <a href="" class="btn-link btn-alternate">Alternate</a>
  <a href="" class="btn-link btn-flat">Flat</a>
  <a href="" disabled class="btn-link">Standard</a>
  <a href="" disabled class="btn-link btn-alternate">Alternate</a>
  <a href="" disabled class="btn-link btn-flat">Flat</a>
</div>

## Images

![image displayed as wide as the text](
    /assets/img/2019-italy-trevi-fountain-night.jpg
    "1024px wide minus some padding"
){.post-img--wide}

![image displayed to the left of text](/assets/img/2022-rose-yellow.jpg "Shown a max of 350px wide"){.post-img--float}

There are several ways to display images. Above is shown the wide orientation which goes as wide as the text is allowed.

Floated content is also possible and it will wrap around the floated image. However this can lead to situations where later headings also begin to wrap.

To prevent further text from wraping around the image use a clearfix. Also note that images need an empty line above and below in markdown to be rendered correctly.

```html
<div style="clear:both;"></div>
```

<div style="clear:both;"></div>

![image displayed to the right of text](
    /assets/img/2020-birding-ca-peregrine.jpg
    "This image is `float: right`"
){.post-img--float-right}

Captions support markdown syntax but be careful with quotes in alt text. You can use the "stylized" quotes to fixt that. Below is a default width image with a caption. It uses the `.post-img--wide` class name.

```
![image displayed to the right of text](
    /assets/img/2020-birding-ca-peregrine.jpg
    "This image is `float: right`"
){.post-img--float .post-img--float-right}
```

![image displayed not full-width on desktop](/assets/img/2018-yellowstone-grand-prismatic.jpg "A photo displayed 600px wide")

## Lists

### Unordered

- Item one
- Item two
  - Subitem A
  - Subitem B
- Item three

### Ordered

1. Fist item
1. Second item
   1. Two point one
   1. Two point two
   1. Two point three
      1. Two point three one
1. Third item

## Quotes

Text in a `<blockquote>`

> “Say, who is you? Whar is you? Dog my cats ef I didn' hear sumf'n.
> Well, I know what I's gwyne to do: I's gwyne to set down here and
> listen tell I hears it agin.”
>
> —Mark Twain, "Adventures of Huckleberry Finn"

## Code Blocks

Currently using [highlight.css](/assets/css/highlight.css) or [highlight-dark.css](/assets/css/highlight-dark.css) to style code depending on the user's preferred color scheme.
Markdown's inline code references `<div>example</div>` are not syntax highlighted.

```javascript
const trimTime = (dateInput) => {
  const date = new Date(dateInput); // Parse date in case it is a string
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
```

Sometimes HTML shows up unexpectedly as code blocks due to indenting, sometimes hidden by liquid pre-processing. This can be escaped using a custom `removeindents` shortcode.

```liquid
{% raw %}{% removeindents %}
<div>
    <p>Accidentally indented</p>
</div>
{% endremoveindents %}{% endraw %}
```

Note that setting a language is required to get syntax highlighting.
A default code block is shown more simply.
The prism theme needed to be modified to not require the `language-*` class name.

```
This text has no highlighting
```

## Horizontal Ruler

The following is an `<hr>` tag which can also be defined in markdown with three dashes (`---`) on their own line.
It's an empty tag and yes I am stalling to write a larger block of text so this looks more like a normal context.
Please accept my apology for wasting your time.

---

It's often used to break up two paragraphs with a hard pivot but without a heading change.
It gives some visual space between the two groups of text.
You can see an example on the [Migrating Angular Types Blog Post](http://localhost:8080/blog/2016/11/16/migrating-angular-1-to-types/).

## Embed links

These are inspired by Medium's approach to linking to external content. It shows a preview of the title, text, and featured image which acts as a link.

{% include "embed-link.html"
    title: "Blue-throated Motmot"
    url: "https://ebird.org/species/bltmot1/"
    description: "Scarce inhabitant of highland forests in Chiapas and south to Honduras. Found in humid pine and evergreen forest, perching at all levels. Like other motmots, rather inactive a…"
    img: "/assets/img/embed-thumbnail-blue-throated-motmot.jpg"
    alt: "green bird with bright blue throat and a long skinny tail"
%}

{% include "embed-link.html"
    title: "Chilean Flamingo"
    url: "https://ebird.org/species/chifla1"
    description: "Flamingo [text] can be tall and found at shallow lakes and lagoons from the high Andes to Patagonian steppe and even in coastal waters. Adult is distinctive: pale pink with a salmon-pink “bustle” and grayish legs with red feet and “knees.” Immature often obviously smaller than adult, but has longer bill “hook” than the smaller and shorter-legged James’s Flamingo. Chilean Flamingo lacks the clean-cut black triangle on closed wings seen on Andean Flamingo. Far-carrying calls can suggest honking of geese."
    img: "/assets/img/embed-thumbnail-chilean-flamingo.jpg"
    alt: "large pink bird standing in water with a long neck and a down-curved beak"
    objectPosition: "85% center"
%}

{% include "embed-link.html"
    title: "Humboldt Penguin"
    url: "https://ebird.org/species/humpen1"
    description: "But what if there's little text?"
    img: "/assets/img/embed-thumbnail-humboldt-penguin.jpg"
    alt: "penguin on rock ledge"
%}

```liquid
{% raw %}{% include "embed-link.html"
    title: "Blue-throated Motmot"
    url: "https://ebird.org/species/bltmot1/"
    description: "Scarce inhabitant of highland forests in Chiapas and south to Honduras. Found in humid pine and evergreen forest, perching at all levels. Like other motmots, rather inactive a…"
    img: "/assets/img/embed-thumbnail-blue-throated-motmot.jpg"
    alt: "green bird with bright blue throat and a long skinny tail"
%}
{% endraw %}
```

## Aside

These are useful for calling out the context of an article.
They previously used inline styles but now use an element selector.

<aside>
    This post is part of a series describing our trip to Italy. To read an overview of our trip and why we went, check out this <a href="/blog/2019/11/27/we-traveled-to-italy/">introductory post</a>.
</aside>

```html
<aside>
  This post is part of a series describing our trip to Italy. To read an
  overview of our trip and why we went, check out this
  <a href="/blog/2019/11/27/we-traveled-to-italy/">introductory post</a>.
</aside>
```

There is also an aside used for post status information that looks like the following:


<aside class="unlisted-warning">
  <strong>Draft Content</strong>
  <p>This page including the URL and contents is subject to change.</p>
</aside>

## Forms

Forms are designed for one column. Buttons within a form will be full width.

Many form elements that aren't necessary have not been implemented but are listed below.

{% removeindents %}

<form method="get" action="#">
    <fieldset>
        <legend>Here is a form with <code>&lt;fieldset&gt;</code>:</legend>
        <h3>Personal</h3>
        <label for="name">Name</label> <input name="name" type="text" id="name" size="25" /> <label>Date of Birth</label>
        <select name="month-of-birth">
            <option selected="" disabled="" hidden="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
        <select name="day-of-birth">
            <option selected="" disabled="" hidden="">Day</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
        </select>
        <select name="year-of-birth">
            <option selected="" disabled="" hidden="">Year</option>
            <option value="1998">1998</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
        </select>
        <label for="animal">Favorite Animal</label>
        <select multiple="" name="animal" id="animal">
            <optgroup label="Felines"> <option value="1">House Cat</option> <option value="2">Lion</option> </optgroup>
            <optgroup label="Fish"> <option value="4">Goldfish</option> <option value="4">Swordfish</option> </optgroup>
            <option value="3">Dog</option>
            <option value="5">Llama</option>
        </select>
        <h3>Account</h3>
        <label for="email">Email</label> <small>Must be unique</small> <input name="email" type="text" id="email" size="25" /> <label for="password">Password</label> <input name="password" type="password" id="password" size="25" />
        <label for="address">Address</label> <textarea name="address" id="address" placeholder="PO BOX ok"></textarea>
        <h3>Preferences</h3>
        <label>Color Preference</label>
        <fieldset>
            <label><input type="radio" id="yellow" name="age" value="yellow" /> I prefer yellow</label> <label><input type="radio" id="gold" name="age" value="gold" /> I prefer gold</label>
            <label><input type="radio" id="yellow-orange" name="age" value="yellow-orange" /> I prefer yellow-orange</label>
        </fieldset>
        <label>Automobile Preference</label>
        <label><input type="checkbox" name="automobile" value="maserati" />Maserati</label> <label><input type="checkbox" name="automobile" value="koenigsegg" />Koenigsegg</label>
        <label><input type="checkbox" name="automobile" value="mclaren" />McLaren</label> <label><input type="checkbox" name="automobile" value="mitsubishi" />Mitsubishi</label>
        <button type="submit">Register</button>
        <button type="reset">Reset</button> <button disabled="">No clicky</button>
    </fieldset>
</form>
{% endremoveindents %}

Links can be styled more like buttons with the `.btn-link` class.

## Recipes

To add microformats to recipes, use the `recipe-ingredients` and `recipe-directions` shortcodes.

```liquid
{% raw %}{% recipe-ingredients %}
- 1/2 cup Ingredient one
- 1 tablespoon Ingredient one
{% endrecipe-ingredients %}

{% recipe-directions %}
1. Step one details
1. Step two details
{% endrecipe-directions %}
{% endraw %}
```

I've also experimented with [Cooklang](https://cooklang.org/) via [markdown-it-cooklang](https://github.com/ulfschneider/markdown-it-cooklang). Use the `recipe-cooklang` shortcode to enable parsing that syntax.

```liquid
{% raw %}{% recipe-cooklang %}
1. Add the @chicken{1.5%lb}, @shallot{2}, 2 cloves of @garlic{3%cloves minced}, @oregano{1%tbsp dried}, @paprika{1%tsp}, and a pinch of @red pepper{1%pinch}, @salt{1%pinch}, and @black pepper{1%pinch} to a bowl.
1. Mix until it starts to combine. Coat your hands with a bit of oil, roll the meat into tablespoon-size balls (will make about 20-25 meatballs).
{% endrecipe-cooklang %}
{% endraw %}
```

## Updates

Pages can have updates listed below.
See [/updates-test/](/posts/2023/10/23/updates-test/) for an example.

## Post previews

Posts can be summarized and shown in [feed pages](/posts/testPosts/) or as suggestions below other posts.

{% removeindents %}

<div class="post-suggestions container">
 {% assign previousPost = collections.photos | first %}
 {% assign nextPost = collections.articles | last %}
 <h2 class="h3">
  View more articles
 </h2>
  {% if previousPost %}
  <div class="post-suggestions__area post-suggestions__previous">
   <h3 class="h4">
    Previous
   </h3>
   {% include "post-card.html" post: previousPost %}
  </div>
  {% endif %}
  {% if nextPost %}
  <div class="post-suggestions__area post-suggestions__next">
   <h3 class="h4">
    Next
   </h3>
   {% include "post-card.html" post: nextPost %}
  </div>
  {% endif %}
 </ul>
</div>
{% endremoveindents %}

```liquid
{% raw %}{% include "post-card.html" post: nextPost %}
{% endraw %}
```

Different post types appear differently

{% removeindents %}

<div class="post-suggestions container">
 {% assign previousPost = collections.notes | first %}
 {% assign nextPost = collections.recipes | last %}
  {% if previousPost %}
  <div class="post-suggestions__area post-suggestions__previous">
   {% include "post-card.html" post: previousPost %}
  </div>
  {% endif %}
  {% if nextPost %}
  <div class="post-suggestions__area post-suggestions__next">
   {% include "post-card.html" post: nextPost %}
  </div>
  {% endif %}
 </ul>
</div>
{% endremoveindents %}

## Pages with custom styles

Review the following pages for issues as they have their own unique styles.

<ul>
  {%- for page in collections.all %}
  {%- if page.url != "/style-guide/"%}
  {%- if page.templateContent contains "<style" or post.templateContent contains ".css" %}
    <li>
      <a href="{{page.url}}">{{page.data.title | default: page.url}}</a>
    </li>
  {%- endif %}
  {%- endif %}
  {%- endfor %}
</ul>

## Pagination

For paginated pages, you can show pagination links at the bottom.

{% assign pagination = examplePagination %}
{% removeindents %}
{% include "pagination.html" %}
{% endremoveindents %}

```liquid
{% raw %}{% include "pagination.html" %}
{% endraw %}
```

## Footer

TODO: Describe the footer below.

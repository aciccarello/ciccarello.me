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

See the source of [main.css](/assets/main.css) for the complete styles. Custom shortcodes and other build customizations are defined in [.eleventy.js](https://github.com/aciccarello/ciccarello.me/blob/main/.eleventy.js) and the imported files. Includes are defined in the [/_includes](https://github.com/aciccarello/ciccarello.me/blob/main/_includes) directory.

# CSS Units

Use REM units where reasonable with a base-2 sizing structure based on 4, 8, 16 or

- Use css custom properties for colors (for theming) and base styles. The most significant styles would be widths and margins that my need to be referenced elsewhere.

# Headers

TODO: Describe the primary header and define a secondary heading option for the

# Typeography

Currently the site uses the Roboto font but the ultimate goal is to move to primarily system fonts. Headings each have their own size. To allow for flexibility while retaining semantic accuracy, there should be a class to override heading styles.

# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

## Body text example: Adventures of Huckleberry Finn

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

## Special Text

Text can be **strengthened**, _emphasized_, or even made <small>smaller</small>. In markdown quotes in "quoted text" are stylized to highlight the begining vs the end.

## Links

[Links in paragraph](.) are styled to increase readability and make it clear they are links. This includes different colored text and underlining, though bold text has been considered. Links should ideally contain [multiple word](.) for increased readability.

In navigation sections, links aren't blue, but their linkyness should probably be emphasized with underlining, at least on hover.

## Images

![image displayed as wide as the text](
    /assets/img/2019-italy-trevi-fountain-night.jpg
){.post-img--wide}

![image displayed to the left of text](/assets/img/2022-rose-yellow.jpg){.post-img--float}

There are several ways to display images. Above is shown the wide orientation which goes as wide as the text is allowed.

Floated content is also possible and it will wrap around the floated image. However this can lead to situations where later headings also begin to wrap.

To prevent further text from wraping around the image use a clearfix.

```html
<div style="clear:both;"></div>
```

<div style="clear:both;"></div>

![image displayed to the right of text](
    /assets/img/2020-birding-ca-peregrine.jpg
    "This image is `float: right`"
){.post-img--float .post-img--float-right}

Captions support markdown syntax but be careful with quotes in alt text. You can use the "stylized" quotes to fixt that. Below is a default width image with a caption. It uses the `.post-img--wide` class name.

```
![image displayed to the right of text](
    /assets/img/2020-birding-ca-peregrine.jpg
    "This image is `float: right`"
){.post-img--float .post-img--float-right}
```

![image displayed not full-width on desktop](/assets/img/2018-yellowstone-grand-prismatic.jpg "The Grand Prismatic pool in Yellowstone")

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
Well, I know what I's gwyne to do: I's gwyne to set down here and
listen tell I hears it agin.”
>
> —Mark Twain, "Adventures of Huckleberry Finn"

## Code Blocks

Currently using highlight.css to style code. Markdown's inline code references `<div>example</div>` are not syntax highlighted.

```javascript
const trimTime = (dateInput) => {
  const date = new Date(dateInput); // Parse date in case it is a string
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
```

Sometimes HTML shows up unexpectedly as code blocks due to indenting, sometimes hidden by liquid pre-processing. This can be escaped using a custom `removeindents` shortcode.

```liquid
{% raw %}
{% removeindents %}
<div>
    <p>Accidentally indented</p>
</div>
{% endremoveindents %}
{% endraw %}
```

## Horizontal Ruler

The following is an `<hr>` tag which can also be defined in markdown with three dashes (`---`) on their own line.

---

## Embed links

These are inspired by Medium's approach to linking to external content. It shows a preview of the title, text, and featured image which acts as a link.

{% include "embed-link.html"
    title: "Blue-throated Motmot"
    url: "https://ebird.org/species/bltmot1/"
    description: "Scarce inhabitant of highland forests in Chiapas and south to Honduras. Found in humid pine and evergreen forest, perching at all levels. Like other motmots, rather inactive a…"
    img: "/assets/img/embed-thumbnail-blue-throated-motmot.jpg"
    alt: "green bird with bright blue throat and a long skinny tail"
%}

```liquid
{% raw %}
{% include "embed-link.html"
    title: "Blue-throated Motmot"
    url: "https://ebird.org/species/bltmot1/"
    description: "Scarce inhabitant of highland forests in Chiapas and south to Honduras. Found in humid pine and evergreen forest, perching at all levels. Like other motmots, rather inactive a…"
    img: "/assets/img/embed-thumbnail-blue-throated-motmot.jpg"
    alt: "green bird with bright blue throat and a long skinny tail"
%}
{% endraw %}
```

## Aside

These need to be formalized but they are usefull for calling out the context of an article. So far I've added inline styles since I want them to appear in RSS readers.

<aside style="padding: 16px 0;font-size: 1.1em;border-top: medium double #333;border-bottom: medium double #333;margin: 32px;font-style: italic;">
    This post is part of a series describing our trip to Italy. To read an overview of our trip and why we went, check out this <a href="/blog/2019/11/27/we-traveled-to-italy/">introductory post</a>.
</aside>

```html
<aside style="padding: 16px 0;font-size: 1.1em;border-top: medium double #333;border-bottom: medium double #333;margin: 32px;font-style: italic;">
    This post is part of a series describing our trip to Italy. To read an overview of our trip and why we went, check out this <a href="/blog/2019/11/27/we-traveled-to-italy/">introductory post</a>.
</aside>
```

## Forms

Forms are designed for one column. Buttons can be used outside of forms, but should ideally only be used for actions (not links).

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
        <label>Color Preference</label> <label><input type="radio" id="yellow" name="age" value="yellow" /> I prefer yellow</label> <label><input type="radio" id="gold" name="age" value="gold" /> I prefer gold</label>
        <label><input type="radio" id="yellow-orange" name="age" value="yellow-orange" /> I prefer yellow-orange</label> <label>Automobile Preference</label>
        <label><input type="checkbox" name="automobile" value="maserati" />Maserati</label> <label><input type="checkbox" name="automobile" value="koenigsegg" />Koenigsegg</label>
        <label><input type="checkbox" name="automobile" value="mclaren" />McLaren</label> <label><input type="checkbox" name="automobile" value="mitsubishi" />Mitsubishi</label> <button type="submit">Register</button>
        <button type="reset">Reset</button> <button disabled="">No clicky</button>
    </fieldset>
</form>
{% endremoveindents %}

# Recipes

TODO: Example shortcodes

# Post previews

Posts can be summarized and shown in feed pages or as suggestions below other posts.

{% removeindents %}
<div class="post-suggestions container">
 {% assign previousPost = collections.photos | first %}
 {% assign nextPost = collections.blog | last %}
 <h2 class="mdc-typography--headline6">
  Recent articles
 </h2>
  {% if previousPost %}
  <div class="post-suggestions__area post-suggestions__previous">
   <h3 class="mdc-typography--subtitle1">
    Previous
   </h3>
   {% include "post-card.html" post: previousPost %}
  </div>
  {% endif %}
  {% if nextPost %}
  <div class="post-suggestions__area post-suggestions__next">
   <h3 class="mdc-typography--subtitle1">
    Next
   </h3>
   {% include "post-card.html" post: nextPost %}
  </div>
  {% endif %}
 </ul>
</div>
{% endremoveindents %}

```liquid
{% raw %}
{% include "post-card.html" post: nextPost %}
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

# Pagination

For paginated pages, you can show pagination links at the bottom.

{% assign pagination = examplePagination %}
{% removeindents %}
{% include "pagination.html" %}
{% endremoveindents %}

```liquid
{% raw %}
{% include "pagination.html" %}
{% endraw %}
```

# Footer

TODO: Describe the footer below.
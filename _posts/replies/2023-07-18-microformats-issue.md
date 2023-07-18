---
date: 2023-07-18T06:53:57.214Z
slug: microformats-issue
in-reply-to: https://lifeofpablo.com/reply/liked-photo-post
references:
  https://lifeofpablo.com/reply/liked-photo-post:
    url: https://lifeofpablo.com/reply/liked-photo-post
    name: Liked Photo Post
    author:
      name: Pablo Morales
    content: "Liked: Photo Post"

---

Thanks for the Like!
I think there may be an issue with the microformats on your site.
The `u-like-of` class is under the `h-card` so it's not appearing on the top-level h-entry.
That's also causing the h-card name to be parsed as "Liked: Photo Post"

```html
<div class="main h-entry" role="main">
  <h1 class="p-name">Liked Photo Post</h1>
  <span class="e-content">
    <div class="u-author h-card">
      <img src="https://static.lifeofpablo.com/pabs-cropped.jpg" class="u-photo" width="40">
      Liked: 
      <a class="u-like-of" href="https://www.ciccarello.me/posts/2023/07/17/denver-car/">Photo Post</a>
      <p></p>
    </div>
 </span>
</div>
```

The [like wiki page](https://indieweb.org/like#How) has some helpful suggestions for how to implement the markup.
It took me a couple tries to get things right on my site.

You can see the parsed microformats [on microformats.io](http://node.microformats.io/?url=https%3A%2F%2Flifeofpablo.com%2Freply%2Fliked-photo-post) which can be helpful while debugging.

```json
{
  "type": [
    "h-entry"
  ],
  "properties": {
    "name": [
      "Liked Photo Post"
    ],
    "content": [
      {
        "value": "https://static.lifeofpablo.com/pabs-cropped.jpg \nLiked: Photo Post",
        "html": "<div class=\"u-author h-card\">\n<img src=\"https://static.lifeofpablo.com/pabs-cropped.jpg\" class=\"u-photo\" width=\"40\">\nLiked: <a class=\"u-like-of\" href=\"https://www.ciccarello.me/posts/2023/07/17/denver-car/\">Photo Post</a> <p></p>\n</div>"
      }
    ],
    "author": [
      {
        "type": [
          "h-card"
        ],
        "properties": {
          "photo": [
            "https://static.lifeofpablo.com/pabs-cropped.jpg"
          ],
          "like-of": [
            "https://www.ciccarello.me/posts/2023/07/17/denver-car/"
          ],
          "name": [
            "Liked: Photo Post"
          ]
        },
        "value": "https://static.lifeofpablo.com/pabs-cropped.jpg \nLiked: Photo Post"
      }
    ]
  }
}
```

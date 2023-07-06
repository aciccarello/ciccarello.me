import { mf2tojf2 } from '@paulrobertlloyd/mf2tojf2';
import fs from 'node:fs/promises';
import { mf2 } from 'microformats-parser';

/** @typedef {import('../../_data/test.json')} testData */

describe('microformats', () => {
  /** @type {testData['posts']} */
  let posts;
  beforeAll(async () => {
    const testData = JSON.parse(await fs.readFile('_data/test.json', 'utf8'));
    posts = testData.posts;
  });

  it('should have an h-card on the homepage', async () => {
    const homepage = await getPage('/');

    expect(jf2(homepage)).toMatchInlineSnapshot(`
      {
        "email": "mailto:anthony@ciccarello.me",
        "name": "Anthony Ciccarello",
        "note": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
        "org": {
          "name": "ICD",
          "type": "card",
          "url": "https://icdportal.com/",
        },
        "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
        "type": "card",
        "url": [
          "https://www.ciccarello.me/",
          "acct:anthony@ciccarello.me",
          "https://www.ciccarello.me/subscribe/#follow-on-mastodon-or-other-fediverse-networks",
        ],
      }
    `);
  });

  it('should be parsable on the resume', async () => {
    const homepage = await getPage('/resume/');

    expect(jf2(homepage)).toMatchSnapshot();
  });

  it('should have h-entries on the posts page', async () => {
    const page = await getPage('/posts/testPosts/');

    expect(jf2(page)).toMatchSnapshot();
  });

  it('should have an article', async () => {
    const page = await getPage(posts.article);

    expect(jf2Main(page)).toMatchSnapshot();
  });
  it('should have a recipe', async () => {
    const page = await getPage(posts.recipe);

    expect(jf2Main(page)).toMatchSnapshot();
  });
  it('should have a note', async () => {
    const page = await getPage(posts.note);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
          "summary": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "category": [
          "indieweb",
          "site changes",
        ],
        "content": {
          "html": "<p>I’ve added a new type of post to my site. This should open a whole world of possibilities integrating with <a href="http://indieweb.org">indieweb.org</a> standards!</p>",
          "text": "I’ve added a new type of post to my site. This should open a whole world of possibilities integrating with indieweb.org standards!",
        },
        "published": "2022-03-30T05:16:18Z",
        "type": "entry",
        "url": "https://www.ciccarello.me/posts/2022/03/30/first-note/",
      }
    `);
  });
  it('should have a photo', async () => {
    const page = await getPage(posts.photo);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
          "summary": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "category": [
          "nature",
          "ocean",
          "site changes",
        ],
        "content": {
          "html": "<p>Photography has been a fun hobby to pick up. Though I may backfill older posts I wanted to start with something fresh. I’m looking forward to adding more content to my site.</p>",
          "text": "Photography has been a fun hobby to pick up. Though I may backfill older posts I wanted to start with something fresh. I’m looking forward to adding more content to my site.",
        },
        "featured": "https://www.ciccarello.me/Flowering%20bush%20in%20front%20of%20ocean%20coast.%20The%20northern%20California%20Coast",
        "photo": [
          {
            "alt": "Flowering bush in front of ocean coast.",
            "url": "https://www.ciccarello.me/assets/img/2021-nor-cal-coast.jpg",
          },
        ],
        "published": "2021-06-21",
        "type": "entry",
        "url": "https://www.ciccarello.me/photos/2021/06/21/initial-photo/",
      }
    `);
  });

  it('should show a like', async () => {
    const page = await getPage(posts.like);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
          "summary": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "content": {
          "html": "",
        },
        "like-of": {
          "author": {
            "name": "James' Coffee Blog ☕",
            "type": "card",
            "url": "https://jamesg.blog",
          },
          "content": "I have previously taken long breaks from coding outside of work, some of which have lasted months. I remember last time there was a voice in my brain that said "this is enough" and I decided to take a step back. Building projects for work is one thing; I have support and motivation and I am contributing toward a goal that a whole team is working on. But when I work on personal projects, sometimes I get stuck working on things that don't really matter and that I spe…",
          "type": "cite",
          "url": "https://jamesg.blog/2023/01/03/coding-mental-health/",
        },
        "published": "2023-01-27T07:38:26Z",
        "type": "entry",
        "url": "https://www.ciccarello.me/posts/2023/01/27/jamesg-blog-like/",
      }
    `);
  });

  it('should have a reply', async () => {
    const page = await getPage(posts.reply);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
          "summary": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "category": "indieweb",
        "content": {
          "html": "<p>I know there’s an <a href="https://github.com/snarfed/bridgy-fed/issues/272">open issue</a> to add documentation but if it’s helpful you can look at the <a href="https://github.com/aciccarello/ciccarello.me/compare/d5f25dec5a441fb4f6783facd54e88de30250c0f...61457954adc86d34a67080313cabf24f11ac4eba">relevant commits</a> <a href="https://github.com/aciccarello/ciccarello.me/commit/50a67193255fb81377d77a790b830907469fcc44">on my site</a>. The piece missing from the docs is adding a link with a class of “u-url” and an href with your username in the format <code>acct:anthony@ciccarello.me</code> to your homepage/h-card.</p>",
          "text": "I know there’s an open issue to add documentation but if it’s helpful you can look at the relevant commits on my site. The piece missing from the docs is adding a link with a class of “u-url” and an href with your username in the format acct:anthony@ciccarello.me to your homepage/h-card.",
        },
        "in-reply-to": {
          "author": {
            "name": "Abhinav",
            "type": "card",
            "url": "https://types.pl/@abnv",
          },
          "content": "@aciccarello It would be great if you can publish the instructions for the same. I've tried following the instructions on Bridgy Fed website but they didn't work for me.",
          "type": "cite",
          "url": "https://types.pl/@abnv/109360439631118847",
        },
        "published": "2022-11-17T18:41:14Z",
        "type": "entry",
        "url": "https://www.ciccarello.me/posts/2022/11/17/bridgy-fed-instructions/",
      }
    `);
  });

  it('should have a reply with context', async () => {
    const page = await getPage(posts.replyToCheckin);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
          "summary": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "content": {
          "html": "<p>Don’t say I never sent you a webmention.</p>",
          "text": "Don’t say I never sent you a webmention.",
        },
        "in-reply-to": {
          "author": {
            "name": "David Shanske",
            "type": "card",
            "url": "https://david.shanske.com/",
          },
          "content": "Checked into Aspire Lounge San Diego",
          "type": "cite",
          "url": "https://david.shanske.com/2022/11/12/5771/",
        },
        "published": "2023-01-26T06:04:30Z",
        "type": "entry",
        "url": "https://www.ciccarello.me/posts/2023/01/26/a-webmention-for-david/",
      }
    `);
  });
});

async function getPage(path) {
  return fs.readFile(`_site${path}index.html`, 'utf-8');
}

function jf2(page) {
  return mf2tojf2(mf2(page, { baseUrl: 'https://www.ciccarello.me' }));
}

function jf2Main(page) {
  const complete = jf2(page);
  return complete.children ? complete.children[0] : complete;
}

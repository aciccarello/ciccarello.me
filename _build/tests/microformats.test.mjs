import { mf2tojf2 } from '@paulrobertlloyd/mf2tojf2';
import fs from 'fs/promises';
import { mf2 } from 'microformats-parser';
import testData from '../../_data/test.json' assert { type: 'json' };

const { posts } = testData;

describe('microformats', () => {
  it('should have an h-card on the homepage', async () => {
    const homepage = await getPage('/');

    expect(jf2(homepage)).toMatchInlineSnapshot(`
      {
        "email": "mailto:anthony@ciccarello.me",
        "name": "Anthony Ciccarello",
        "note": "I'm a software engineer living in southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
        "org": {
          "children": [
            {
              "name": "SitePen",
              "type": "card",
              "url": "https://www.sitepen.com/",
            },
            {
              "name": "Dish Network",
              "type": "card",
              "url": "https://www.dish.com/",
            },
            {
              "name": "Teradata",
              "type": "card",
              "url": "https://www.teradata.com/",
            },
          ],
        },
        "photo": "https://secure.gravatar.com/avatar/17d306899b5f20953440eca1d65d34e0?s=512",
        "type": "card",
        "url": [
          "https://www.ciccarello.me/",
          "acct:anthony@ciccarello.me",
        ],
      }
    `);
  });

  it('should have h-entries on the posts page', async () => {
    const page = await getPage('/posts/testPosts/');

    expect(jf2(page)).toMatchSnapshot();
  });

  it('should have an article', async () => {
    const page = await getPage(
      '/blog/2015/07/24/getting-an-introduction-to-africa/'
    );

    expect(jf2Main(page)).toMatchSnapshot();
  });
  it('should have a recipe', async () => {
    const page = await getPage('/recipes/2022/01/01/eggnog-punch/');

    expect(jf2Main(page)).toMatchSnapshot();
  });
  it('should have a note', async () => {
    const page = await getPage('/posts/2022/03/30/first-note/');

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
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
    const page = await getPage('/photos/2021/06/21/initial-photo/');

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
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
  it('should have a reply', async () => {
    const page = await getPage(posts.reply);

    expect(jf2Main(page)).toMatchInlineSnapshot(`
      {
        "author": {
          "name": "Anthony Ciccarello",
          "type": "card",
          "url": "https://www.ciccarello.me/",
        },
        "bridgy-fed": "https://fed.brid.gy/",
        "category": "indieweb",
        "content": {
          "html": "<p><a href="https://types.pl/@abnv/109360439631118847" class="u-in-reply-to">@abnv@types.pl</a>
      I know there’s an <a href="https://github.com/snarfed/bridgy-fed/issues/272">open issue</a> to add documentation but if it’s helpful you can look at the <a href="https://github.com/aciccarello/ciccarello.me/compare/d5f25dec5a441fb4f6783facd54e88de30250c0f...61457954adc86d34a67080313cabf24f11ac4eba">relevant commits</a> <a href="https://github.com/aciccarello/ciccarello.me/commit/50a67193255fb81377d77a790b830907469fcc44">on my site</a>. The piece missing from the docs is adding a link with a class of “u-url” and an href with your username in the format <code>acct:anthony@ciccarello.me</code> to your homepage/h-card.</p>",
          "text": "@abnv@types.pl
      I know there’s an open issue to add documentation but if it’s helpful you can look at the relevant commits on my site. The piece missing from the docs is adding a link with a class of “u-url” and an href with your username in the format acct:anthony@ciccarello.me to your homepage/h-card.",
        },
        "in-reply-to": "https://types.pl/@abnv/109360439631118847",
        "published": "2022-11-17T18:41:14Z",
        "type": "entry",
        "url": "https://www.ciccarello.me/posts/2022/11/17/bridgy-fed-instructions/",
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
  if (complete.children) {
    return complete.children[0];
  }
}

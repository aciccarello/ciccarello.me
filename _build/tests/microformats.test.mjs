import { mf2tojf2 } from '@paulrobertlloyd/mf2tojf2';
import fs from 'node:fs/promises';
import { mf2 } from 'microformats-parser';

/** @typedef {import('../../_data/test.json')} testData */

describe('microformats', () => {
  /** @type {testData['posts']} */
  let posts;
  /**
   * Test posts to test.
   *
   * Needed because jest needs test names synchronously (and testData is async)
   * @type {Array<keyof testData['posts']>}
   */
  const testPostNames = [
    'article',
    'recipe',
    'note',
    'photo',
    'like',
    'photoLike',
    'reply',
    'replyToCheckin',
  ];

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
        "note": "I'm a software engineer living in Southern California building cool things using JavaScript and other web technologies. I enjoy traveling to other countries and spending time in nature.",
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

  testPostNames.forEach((description) => {
    it('should have a(n) ' + description, async () => {
      const page = await getPage(posts[description]);

      expect(jf2Main(page)).toMatchSnapshot();
    });
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

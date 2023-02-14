import Parser from 'rss-parser';
import fs from 'node:fs/promises';

const isoDateRegex =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

describe('RSS', () => {
  let parser = new Parser();

  it('should have a main feed', async () => {
    const feedFile = await fs.readFile(`_site/feed.xml`, 'utf-8');
    const parsedFeed = await parser.parseString(feedFile);

    expect(parsedFeed.feedUrl).toEqual('https://www.ciccarello.me/feed.xml');
    expect(parsedFeed.title).toEqual('Anthony Ciccarello');
    expect(parsedFeed.link).toEqual('https://www.ciccarello.me/');
    expect(new Date(parsedFeed.lastBuildDate).valueOf()).toBeGreaterThan(
      new Date('2023-01-01').valueOf()
    );
    expect(parsedFeed.items.length).toEqual(31);

    const latestItem = parsedFeed.items[0];
    expect(latestItem.id).toMatch(/https:\/\/www.ciccarello.me\/\w+\/.+/);
    expect(latestItem.isoDate).toMatch(isoDateRegex);
    expect(latestItem.link).toMatch(/https:\/\/www.ciccarello.me\/\w+\/.+/);
    expect(latestItem.pubDate).toMatch(isoDateRegex);
    expect(latestItem.title).toBeDefined();
    expect(latestItem.content).toBeDefined();

    const oldestItem = parsedFeed.items[parsedFeed.items.length - 1];
    expect(oldestItem.title).toBeDefined();
    expect(oldestItem.summary).toBeDefined();
    expect(oldestItem.content).not.toBeDefined();
  });

  it('should have a foster care feed feed', async () => {
    const feedFile = await fs.readFile(
      `_site/posts/tags/foster care/feed.xml`,
      'utf-8'
    );
    const parsedFeed = await parser.parseString(feedFile);

    expect(parsedFeed.feedUrl).toEqual(
      'https://www.ciccarello.me/posts/tags/foster%20care/feed.xml'
    );
    expect(parsedFeed.title).toEqual('Posts tagged "foster care"');
    expect(parsedFeed.link).toEqual(
      'https://www.ciccarello.me/posts/tags/foster%20care'
    );
    expect(new Date(parsedFeed.lastBuildDate).valueOf()).toBeGreaterThan(
      new Date('2022-01-01').valueOf()
    );
    expect(parsedFeed.items.length).toBeGreaterThan(5);

    const latestItem = parsedFeed.items[0];
    expect(latestItem.id).toMatch(/https:\/\/www.ciccarello.me\/\w+\/.+/);
    expect(latestItem.isoDate).toMatch(isoDateRegex);
    expect(latestItem.link).toMatch(/https:\/\/www.ciccarello.me\/\w+\/.+/);
    expect(latestItem.pubDate).toMatch(isoDateRegex);
    expect(latestItem.title).toBeDefined();
    expect(latestItem.content).toBeDefined();
  });
});

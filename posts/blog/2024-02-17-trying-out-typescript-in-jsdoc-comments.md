---
title: Trying out TypeScript in JSDoc Comments
date: 2024-02-17T22:48:05.110Z
tags:
  - technology
  - JavaScript
image: /assets/img/jsdoc-type-screenshot-header.png
image_alt: Two overlaid screenshots of JavaScript code mostly showing code comments with types.
---

I really like the feedback TypeScript provides.
I think those type hints are essential for using libraries and working on large teams.
Even for small projects, TypeScript has saved me a lot of time.

What hasn't saved me a lot of time is dealing with build tools.
Any time I have to touch JavaScript tooling, it seems like hours slip away.
Unfortunately, TypeScript contributes to the build tooling complexity.
Just this week, I was sidetracked trying to get Jest tests, Webpack, and TypeScript to play nice together.

I would prefer if TypeScript would act more like a linter.
Other tools could ignore the types and do their own thing.
I'm over-simplifying it, but I wish I could have types in JS files.

There is already a [proposal to support type annotations](https://github.com/tc39/proposal-type-annotations) as part of the JavaScript standard.
I'm currious where that goes, but I'm betting this is a long way off and as currently defined would be only a portion of what TypeScript supports.
In the meantime, I've been interested in how TypeScript's support for JS files has improved.
The most notable project I've seen take this approach is [SveltKit](https://github.com/sveltejs/kit/discussions/4429#discussioncomment-2423814).
By using JSDoc comments to define the types, they've made their build tooling simpler while still having typed JavaScript.

## Limitations to types in JSDoc comments

When I tried this out on a legacy project at work, I quickly ran into some limitations.
Some of these issues may be with my setup rather than TypeScript itself, but I wanted to document my impressions for others to compare.
I've already learned that VS Code seems to handle interacting with the type better than IntelliJ IDEA.

The three main issues I found were the verbosity, limitations to generic type usage, and suboptimal IDE support.
I don't think these issues prevent JSDoc typing from being usable, but they are something to consider before choosing to go all-in on JSDoc types.

### Verbosity

I knew before attempting to type using JSDoc comments, that it would be more verbose than TypeScript.

```typescript
const tsVarType: string = 'concise';

/** @type {string} */
const jsDocVarType = 'slightly longer';
```

Typing params and interfaces requires repeating the parameter or property name to properly match.
The JSDoc parsing is surprisingly flexible, but that also left me wondering a little about what style of comments I should use.
VSCode syntax highlighting seems to prefer the type before property with no dash before description but IntelliJ was less picky.
I have noticed that it was nice to be able to add comments on the same line as the definition rather than needing an extra comment, so small win for JSDoc.
Still, it's visually harder to parse than TypeScript succinct format.

```typescript
/**
 * General description of the interface.
 *
 * It can span multiple lines if needed.
 */
interface PostAsInterface {
  id: number;
  title: string;
  body: string;
  /** Optional URL for a featured image */
  image?: string;
  user: {
    id: number;
    name: string;
  };
}

/**
 * @typedef Post General description of the interface.
 *
 * It can span multiple lines if needed.
 *
 * @property {number} id
 * @property title {string} Article title
 * @property {string} body - Markdown formatted string
 * @property {string} [image] Optional URL for a featured image
 * @property {object} user
 * @property {number} user.id
 * @property {string} user.name
 */

/** @type {Partial<Post>} */
const seeCommentParsing = {
  title: 'Interface documentation hints', // Even though syntax highlight is off, this description still shows
  body: 'Text', // VS Code shows the - as a bullet (because it parses comments as markdown)
  image: '/filename.jpg',
};
```

I found casting types to be particularly annoying since those are typically done inline.
I could probably avoid the awkward inline cast with an intermediate variable but that's not how I'd ideally write it.
Also, there's a requirement that the reference you are typing be wrapped in parentheses.
That's not terrible, though it did catch me off guard the [first time I tried](https://stackoverflow.com/q/70101584/4252741).
I've had some issues with formatters removing the parenthesis.
When casting, TypeScript sometimes requires that you confirm you know what you are doing by first casting to `unknown`.
I mostly run into this when mocking out tests, but in JSDoc comments, it really gets messy.

```javascript
// They type casting syntax is a little long but usable
handlePost(/** @type {Post} */ (mockPost));

// Double casting for undefined gets noisy due to the multiple comments and parenthesis
// Don't see any related issue but one comment notes this https://github.com/microsoft/TypeScript/issues/25028#issuecomment-1427025173
handlePost(
  /** @type {Post} */ (/** @type {unknown} */ ({
    suspicious: "TS wants me to confirm I know what I'm doing",
  })),
);

// Wish I could combine the type casting
handlePost(/** @type {unknown as Post} */ ({ somethingElse: 'Much shorter' }));

// Compare this with TypeScript
handlePost({ somethingElse: 'Much shorter' } as unknown as Post);
```

### Limitations to using generics

By far, the biggest limitation to using JSDoc comments is the impact on generic types.
You can still use, or even define generic types in JSDoc comments, but I haven't figured out how to pass types to methods.
The most basic example of this, is something like React's `useState()` hook.
In TypeScript code, you could define the type while calling the function.

```typescript
const [post, setPost] = useState<Post>();
```

But in JavaScript, we can't modify the method.
In this case the type is generated from the parameters of the function, so we can use casting to hack the output.

```javascript
const [post, setPost] = useState(/** @type {Post | undefined} */ (undefined));
```

But there are some generics where this isn't an option.
Take for example a method to fetch data from the API might have a completely independent return type.

```typescript
export function getData<T extends object>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

const data = await getData<{ title: string }>('/path');
// data typed as {title: string}
```

But in JavaScript, there is no way to pass that type;

```javascript
/**
 * @template T
 * @param url {string}
 * @return {Promise<T>}
 */
export function getData(url) {
  return fetch(url).then((res) => res.json());
}

const data = await getData('/path');
// data is typed as any
```

In my contrived example, the return type is simple so I realistically would type the output instead.
However, some more complex return types would be a pain to mannually type and would stop any type inference.
Looking through the TypeScript GitHub Issues, [some people suggested](https://github.com/microsoft/TypeScript/issues/27387#issuecomment-1223795056) casting the method before using it.

```javascript
/** @type {Post} */
const dataExplicit = await getData('/path');

// Also typed as Post
const dataCast = await /** @type {typeof getData<Post>} */ (getData)('/path');
```

Casting the method kinda works but requires a cast, parentheses, the typeof keyword, and repeating the method reference.
My ideal syntax would be simpler and could reuse the `@template` tag as [others recommended](https://github.com/microsoft/TypeScript/issues/27387#issuecomment-1024660186) for clarity.

```javascript
// I would like to use something like (does not work)
const templateBefore = await /** @template {Post} */ getData('/path');
const templateBetween = await getData(/** @template {Post} */ '/path');
```

### IDE support

I tested JSDoc comments in IntelliJ IDEA 2023.2 (Ultimate Edition) and later in VS Code version 1.86.1.
I have wondered if some pain points could be solved with more attention from the code editors themselves.

One thing I missed from TypeScript, was the auto-import integration.
I found that as I was writing a type, I wanted the IDE to import the code for me.
TypeScript has an inline way to import, but since types are often used multiple times in a single file, I liked defining the type near the top of my files.
But neither of these formats seemed to be autocompleted by the IDEs.
VS Code sometimes didn't seem to need the type, but would pull it from strange places, like an imported type definition in a test file.
Even worse, IntelliJ seemed to be unable to jump to the definition of imported types.
It would jump to the file, but wouldn't jump directly to the definition like VS Code does.

There is [an open GitHub issue](https://github.com/microsoft/TypeScript/issues/22160) with an alternate syntax for importing types.
I wonder if this would make auto-importing types more feasible.
I'd prefer something closer to the ES6 import syntax.
But even if there's no new syntax, I'd like to be able to use a type in my file and have some kind of type import added to the top of the page.

```javascript
// This is how types are imported in TS
// Note the type keyword so we don't cause side-effects
import type { PostFromTS } from './ts-example';

// IntelliJ doesn't let me jump to the Post definition from `.Post`
// Seems like VS Code handles it as expected
/** @typedef {import('./api').Post} Post */

// If we are defining a new syntax, I'd prefer to stick with ES6 semantics than try to reorder for autocomplete.
// Note: Does not work
/**
 * @import { Post } from "./api"
 */

// I also tried importing the whole file which would at least mean shorter types down-file
/** @typedef {import('./api')} Api */
/** @typedef {typeof import('./api')} ApiTypeof */

// But that doesn't seem to work
/** @type {Partial<Api.Post>} */ const usingType = {};
/** @type {Partial<ApiTypeof.Post>} */ const usingTypeof = {};
// Error: 'ApiTypeof' only refers to a type, but is being used as a namespace here.ts(2702)
```

## Conclusion

While I was disappointed that I couldn't use the full power of TypeScript in JS files, I was encouraged I could _mostly_ use it.
There was definitely a learning curve, and I'd probably try to find patterns that make the code easier to read, but most functionality was available.
I was also encouraged that VS Code handled the JSDoc reverences fairly well after being disappointed with IntelliJ IDEA.
I wonder if the latest version of IntelliJ would handle things better, but I don't expect one year to make a difference and I didn't see anything in the TypeScript 5.2 or 5.3 release notes that seems related.
The awkward support for generics was by far the biggest barrier I encountered, though I've learned some workarounds after looking into it more.
I can deal with doc comment verbosity, but not being able to pass types to a typed library can lead to additional type errors and headaches.
I would have to experiment with some more complex types to see if there were further limitations.

So my top 2 areas for improving JSDoc support would be:

1. Better way to pass types to generic functions
2. Easier autocompletion of type imports in IDEs

Despite the issues I found, I would still consider using JSDoc types when starting a new project.
Being able to use types in a lightweight way feels a lot more approachable and on a new project eliminates distracting build issues.
For a larger project, full TypeScript feels more appropriate since the benefits of simpler, typed code starts to outweigh the setup costs.
I'm also hopeful that someday, JavaScript parsers will be more accepting of types in the code itself so they are easier to use.
After reading the [March 2023 TC39 meeting notes](https://github.com/tc39/notes/blob/main/meetings/2023-03/mar-22.md#type-annotations-proposal-update) it sounds like there is interest from the committee find a way forward, even if it takes time.

---

## ENV Details

This post was written based on my experience with the following software.
The (incomplete) project codebase I used to experiment is [available on GitHub](https://github.com/aciccarello/jsdoc-test-experiments).

```
IntelliJ IDEA 2023.2 (Ultimate Edition)
------------------------------------------
Build #IU-232.8660.185, built on July 25, 2023
Registry:
    debugger.new.tool.window.layout=true
    ide.experimental.ui=true
Non-Bundled Plugins:
    IdeaVIM (2.7.5)
    com.intellij.plugins.vscodekeymap (232.8660.88)
    com.intellij.kubernetes (232.8660.158)
    com.jetbrains.packagesearch.intellij-plugin (232.8660.142)
    String Manipulation (9.12.0)
    org.intellij.grails (232.8660.142)
    org.sonarlint.idea (10.3.0.77475)
TypesScript: 5.1.3

VS Code
------------------------------------------
Version: 1.86.2
Commit: 903b1e9d8990623e3d7da1df3d33db3e42d80eda
Date: 2024-02-13T19:42:12.210Z
Electron: 27.2.3
ElectronBuildId: 26908389
Chromium: 118.0.5993.159
Node.js: 18.17.1
V8: 11.8.172.18-electron.0
OS: Darwin arm64 23.3.0
TypeScript: 5.3.2
```

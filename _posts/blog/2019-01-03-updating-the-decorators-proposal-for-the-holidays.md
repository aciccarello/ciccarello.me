---
title: 'Updating the Decorators Proposal for the Holidays'
date: 2019-01-03
tags:
  - technology
  - TC39
canonical_url: https://www.sitepen.com/blog/2019/01/03/updating-the-decorators-proposal-for-the-holidays/
image: /assets/img/decorators-package-thumbnail.png
image_alt: wrapped christmas gift
image_caption: _Photo by Annie Spratt on  Unsplash_
syndication:
  - https://medium.com/@aciccarello/updating-the-decorators-proposal-for-the-holidays-7d67eb823022
---

The [Ecma TC39 committee](https://github.com/tc39), which standardizes the
JavaScript language (officially known as ECMAScript), has been discussing a
[decorators proposal](https://github.com/tc39/proposal-decorators) for several
years. Transpilers like TypeScript and Babel implemented the initial version
of the decorators proposal, allowing developers and frameworks to start using
the proposal before the feature became an official part of the language
standard. However, the proposal has seen significant changes through the
standardization process. Decorators will soon arrive in JavaScript, and there
are many questions to answer.

## What are decorators and why should you care?

Decorators are a
[metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming) language
feature, which allows modifying declarations like classes. This pattern looks
at program source code as data and allows analyzing and transforming of code.
For example, decorators may add add logging to the inputs or outputs of
methods. Alternatively, a decorator could add some metadata to a class to
configure a framework.

```javascript
@addMetadata('name-for-library')
class MyClass {
  constructor(database) {
    This.db = database;
  }

  @logOutput
  makeDatabaseCall(param) {
    // call database
    const results = this.db.call('query');
    **return** results; // this value is automatically logged
  }

  @bound
  methodThatRetainsThis(flagVal) {
    // Still knows what this is even when passed as a callback
    this.flag = flagVal;
  }
}
```

Similar to languages like Java and [Dart](https://www.dartlang.org/), the
decorators proposal uses an "@" symbol followed by the decorator name. The
proposal champions have been working to align with the [class fields
proposal](https://github.com/tc39/proposal-class-fields) so that annotations
can get used on classes, class methods, class fields, and likely private
fields. This should lead to classes that are powerful yet easy to understand.
If you want to learn more, check out SitePen's previous [TypeScript
Decorators](https://www.sitepen.com/blog/2015/10/20/typescript-decorators/)
blog post describing the original decorators proposal.

**To see what changes are coming to the decorators proposal, check out my
full post on the <a rel="syndication" class="u-syndication" href="https://www.sitepen.com/blog/2019/01/03/updating-the-decorators-proposal-for-the-holidays/">SitePen blog</a>**

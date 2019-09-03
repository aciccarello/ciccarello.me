---
layout: "post"
categories: "blog"
title: "Migrating an Angular 1 application to @types"
date: 2016-11-16
tags: technology
image: /assets/img/angular-1-types-thumbnail.jpg
image_alt: peacock
image_caption: Photo by [Andre Mouton](https://unsplash.com/@andremouton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
---

I upgraded an application at work to use @types instead of Typings today.
Unfortunately I had trouble finding information on the differences between the
two systems. Many things that were supposed to " [work with no
change](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/10154#issuecomment-233519904)"
didn't seem to be but eventually I was able to please the TypeScript compiler.
Since information online seemed to be lacking I thought I'd jot down a few
quick notes on what I learned.

#### Global types are only types (not the global object)

After installing the angular types, all of my references to the global angular
object started throwing compilation errors. This confounded me because all of
the information I read said that global types should still work. Additionally
I was still able to use types like `angular.IScope` without any issues. What I
didn't realize was that the @types definitions did not include the global
object. To be able to use `angular.module(...)` or `angular.copy(...)` in my
ES2015 modules I needed to import angular into the file using the following
syntax.

```typedoc
import * as angular from 'angular';
```

#### Libraries can mess with the global types

Our project is using a library called [ng-metadata](https://github.com/ngParty
/ng-metadata) to allow writing our Angular 1 application in a style in line
with Angular 2. This has made our development much easier. Because the project
depended on the Angular 1 typings, the type definitions from @types conflicted
with the library. Thankfully, ng-metadata had already
[fixed](https://github.com/ngParty/ng-
metadata/commit/3eb047d6456ba12134d48701a212334ad8b81b7e) the issue, however I
didn't realize that some of the compilation errors were due to the library. It
wasn't until I updated ng-metadata that 3/4 of the compilation errors went
away.

#### You should use imports instead of global types

Something I learned while migrating was that you don't need to use the global
types. In fact I would recommend importing your types to shorten how many
characters it takes to define variables and to clarify where the types are
coming from. This was apparently supported using Typings but I learn it while
I was trying to fix some of the compilation errors I was seeing.

Instead of using the global typings

```typescript
let $httpBackend: angular.IHttpBackendService;
let $state: angular.ui.IStateService;
```

Import the types at the beginning of the file

```typescript
import { IHttpBackendService } from "angular";
import { IStateService } from "angular-ui-router";
```

```typescript
let $httpBackend: IHttpBackendService;
let $state: IStateService;
```

While this pattern does add more imports at the beginning of your files, it is
clear where the types are being defined.

---

I hope others are able to have an easier time migrating to the new @types
system. It seems like a great way to simplify type management (especially for
libraries) but the migration was not as painless as I would have hoped.
Projects starting with @types shouldn't encounter the issues that I have since
the compiler won't let them go down a path that the raw DefinitelyTyped
definitions let us go. But for those who want to migrate, give yourself some
time to sort out the kinks.

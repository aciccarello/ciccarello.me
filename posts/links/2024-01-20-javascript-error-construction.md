---
date: 2024-01-20T04:01:25.482Z
slug: javascript-error-construction
bookmark-of: https://stackoverflow.com/a/13294683/4252741
references:
  - published: ''
    url: https://stackoverflow.com/a/13294683/4252741
    content:
      "Both are fine; this is explicitly stated in the specification: '...
      Thus the function call Error(…) is equivalent to the object creation
      expression new Error(…) with the same arguments.'"
    referenceIdUrl: https://stackoverflow.com/a/13294683/4252741
    name: throw Error('msg') vs throw new Error('msg')
tags:
  - TIL
excludeFromMainFeed: false
---

TIL `Error('message')` and `new Error('message')` are equivalent in JavaScript. I've always used `new`.

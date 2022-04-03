---
date: 2022-04-01T23:07:55.947Z
tags:
  - TIL
  - technology
slug-text: js-to-const
---
TIL you can emulate the `as const` type oberation in JS with a helper function.  ([source](https://dev.to/adamcoster/the-typescript-as-const-trick-2f4o))

```javascript
/**
 * Identity function. Coerces string/number literals to value-as-type.
 * @template {string|number} T
 * @param {T} v
 * @return {T}
 */
function toConst(v) {
  return v;
}

const five = toConst(5);
// --> Type shows up as 5 instead of "number"
```

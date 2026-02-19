---
date: 2026-02-19T04:47:20.412Z
title: Resizing Windows to a Specific Size on macOS - Scott's Weblog - The
  weblog of an IT pro focusing on cloud computing, Kubernetes, Linux,
  containers, and networking
slug: resizing-windows-to-a-specific-size
bookmark-of: https://blog.scottlowe.org/2020/11/08/resizing-windows-to-a-specific-size-on-macos/
tags:
  - TIL
references:
  - referenceIdUrl: https://blog.scottlowe.org/2020/11/08/resizing-windows-to-a-specific-size-on-macos/
    url: https://blog.scottlowe.org/2020/11/08/resizing-windows-to-a-specific-size-on-macos/
    name: Resizing Windows to a Specific Size on macOS - Scott's Weblog - The weblog
      of an IT pro focusing on cloud computing, Kubernetes, Linux, containers,
      and networking
    type: entry
    author: Scott Lowe
    content: I recently had a need (OK, maybe more a desire than a need) to set my
      browser window(s) on macOS to a specific size, like 1920x1080. I initially
      started looking at one of the many macOS window managers, but after
      reading lots of reviews and descriptions and still being unclear if any of
      these products did what I wanted, I decided to step back to using
      AppleScript to accomplish what I was seeking. In this post, I’ll share the
      solution (and the articles that helped me arrive at the solution).
---

Today I learned you can use AppleScript to resize windows to a specific size. Simpler than I imagined if you can figure out what the positional params map to.

```
tell application "Firefox Nightly"
	set bounds of front window to {110, 120, 1310, 1020}
end tell
```


---
date: 2023-10-23T05:46:06.484Z
tags: []
slug: updates-test
eleventyExcludeFromCollections: true
eleventyExcludeFromCollectionsReason: testing
updates:
  - date: 2023-10-23T05:48:26.586Z
    description: Earliest update
  - date: 2023-10-23T06:43:26.586Z
    description: Latest update (should have dt-updated class)
  - date: 2023-10-23T06:13:26.586Z
    description: Middle update
---
<style>
  .dt-updated {
    color: red;
  }
</style>
This post is for testing how updates are handled.
Typically we'll want the updates to be in order but that's not guaranteed.
So we want to check for the date matching the calculated `lastUpdated` value.
The most recent update will get the microformats dt-updated class.

The lastUpdated value is: {{lastUpdated | formatMachineDate }}

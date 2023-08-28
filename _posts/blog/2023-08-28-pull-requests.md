---
title: Pull requests are a communication tool, not just an approval process
date: 2023-08-28T05:33:42.179Z
tags:
  - technology
image: /assets/img/code-github-pr-article-header.jpg
image_alt: A figurine of an oktokat in the center, in the background a laptop with the main page of the GitHub open.
image_caption: Photo by <a href="https://unsplash.com/@synkevych?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Roman Synkevych</a> on <a href="https://unsplash.com/photos/wX2L8L-fGeA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---



Reviewing pull requests on GitHub can be awkward.
When a software developer is finally ready to share their code they have to wait for the dreaded review comments.
If the reviewer has a question about some aspect of the code, they have a choice.
They can either raise their concern, start a drawn-out conversation, or approve the changes as-is and hope they don't regret it.
Amplifying the pressure, GitHub asks you to either "Approve" or "Request Changes" with your review, explicitly calling out whether you want to block your colleague's work.

While that scenario may be overly dramatic, for some teams there can be an inherent social pressure to limit feedback to avoid conflict or slowing down development.
However, moving PRs away from a focus on approval provides opportunities to be more collaborative and help the whole team.
The goal is still maintaining code quality, but the conversation goes beyond "Does this meet our standards?" to "How can we do things better?".

## What does a PR communicate?

One way to look at pull requests is as an asynchronous form of paired programming.
Rather than two developers working on the code simultaneously, the reviewer takes a look at their leisure.
The reviewer is still expected to understand the code, its implications, and provide feedback.
However, that feedback happens later after the developer has an opportunity to do an initial implementation.
While PR reviews will never match the ease of collaboration working alongside someone, they should aim to facilitate a similar cross-pollination of knowledge.

The core message of a pull request is "Here is how I think we should implement a feature".
But PRs are an opportunity for both sides to learn and share.
Both the developer and reviewer are learning about a section of code they might not have recent experience with.
It's also a chance to share new patterns or APIs the team using and why.
Team members can call out approaches they use that might be useful to others and consider the pros and cons.
This kind of communication should happen both ways, regardless of years of experience, to improve the skills of the whole team while working towards a better codebase.

Even the dangerous bikeshedding territory of code style should be on the table for discussion.
Hopefully automation can fix less significant style issues like formatting.
Still, the team should discuss code styles they find easiest to understand and maintain.
After all, the whole team is responsible for the code of a PR after it is merged so it's better to ensure the code is understandable while people still understand the context.
It's important to avoid digressing into hair-splitting unimportant or minimal improvements which will only slow the team down.
But a review is a great time to give feedback on what it's like to read a section of code with fresh eyes.
Over time, these conversations will shape the culture of a team and address often unspoken expectations.

![Meme of man sitting behind a table with a sign saying 'This code is awesome; Change my mind'.](/assets/img/code-change-my-mind-meme.jpg "But for real. Change my mind."){.post-img--float-right}

## How to communicate feedback

Unsurprisingly, good communication practices are key to giving good feedback.
Be aware of the tone of PR comments, which can easily be misinterpreted in short text blocks.
Consider calling out especially beneficial changes with compliments.
This encourages the developer, avoids being overly negative, and calls out examples that the team could benefit from in the future.
A little humility goes a long way too.
Ask questions about code you don't understand while calling out your limited expertise in the area.
At the very least, the reviewer can learn something.
Or even better, the code is improved to be clearer.
Something as simple as indicating an openness to new ideas can change the course of the conversation.

When reviewing, be clear about your expectations so that the developer knows how they need to respond.
If you have a significant concern, explain why you think it is important to address it and possible resolutions.
When expressing a code style preference, let the author of the PR know that feedback is optional so they can decide if the improvement is worth the effort.
If a PR raises a broader question, leave a comment but call out how you think the team should address it later.

One way to encourage and abbreviate this kind of feedback is with a pattern like [conventional comments](https://conventionalcomments.org/).
By adding labels to comments, the conventional comment structure succinctly communicates expectations.

> **question (non-blocking):** At this point, does it matter which thread has won?
>
> Maybe to prevent a race condition we should keep looping until they've all won?

In this example, the reviewer is raising a question but doesn't think it should prevent the PR from being merged.
Some labels suggested by conventional comments include suggestion, praise, todo, and nitpick among others.

Even GitHub's sometimes-uncomfortably-explicit review flags can be used to communicate more clearly.
If none of the questions raised require action from the PR author, it can still be marked as approved, even with multiple comments.
If there is a critical question that the team should answer, a "Changes requested" status doesn't have to be considered a failure, just a clear call for action.
There is also the option to fall back to comments if you have feedback but are feeling non-confrontational.

## Communicating as author

The author of a pull request also can improve the communication process.
Well-written code itself should be self-explanatory as much as possible when read in the codebase and in the PR.
However, the PR itself should also provide context for reviewers, to help them understand what and why changes are made.
Some useful PR details include:

- A clear title
- A short summary of the changes
- Why the change was made and/or links to the issue tracker issue
- Any broader implication of the changes
- Screenshots (if visual)
- Remaining work (if the feature is incomplete)

Good PR descriptions both help speed up the review process and are helpful documentation when reviewing past code changes.
Depending on your comfort with git, organizing your commits to tell a clear story of how the changes were made can also be helpful.
If there is a new pattern your PR introduces, consider calling that out, either in the PR text or even bringing it up with the team externally.

## Conclusion

While a thorough code review will take more time, it should help the team learn and improve overall quality.
Reviewers will understand the code better, notice more potential issues, and start discussions on broader improvements to the codebase.
To avoid delays from needing to apply review feedback late in the process, consider opening PRs earlier.
Either a feature like GitHub's draft PR status or a PR naming convention can clarify which PRs are ready for review and which are incomplete.

Pull request reviews are an important opportunity for teams to share ideas.
While the core concern is code quality, the discussion should not be limited to critical issues.
By being clear about expectations, teams can leave more space for critique while not blocking progress or angering collogues.

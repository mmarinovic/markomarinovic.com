---
title: "The agent that wrote it doesn't get to say it works"
date: "2026-08-23"
description: "Payments don't let the person who creates a payment approve it, and code written by agents needs the same split - one agent writes, another checks the running thing, and the verdict comes from recorded evidence."
---

The agent that writes the code must not be the one that says it works. Payments settled this for money long ago - whoever creates a payment doesn't approve it - and code written by agents needs the same split.

I'm building a small macOS app, a writing studio for my site, almost entirely with coding agents. One feature saves an essay by committing it to git. The writing agents reported it done: 169 tests passing, build clean.

Then a separate agent, one that had never seen the task, ran an experiment in a scratch repository. It found that saving one essay could make another essay's uncommitted edits vanish from the file, because `git rebase --autostash` stashes and resets dirty files before it notices there's nothing to rebase.

In 300 saves with another writer active, 34 ended with the edits parked in a git stash. 32 of those 34 reported success, exit status 0. 1 run in 300 left the checkout stuck, so every later sync failed. Nothing was destroyed - the edits could be recovered by hand - but they sat in a stash nobody would know to look in.

## What 169 passing tests didn't cover

Tests and code review exist for exactly this, and most of the time they do the job.

They didn't here. The bug wasn't in the diff, and it wasn't in the author's tests, because those tests came from the same understanding that produced the code. If the author doesn't know a rebase with nothing to do will still stash your files, no test of theirs will ask about it.

The same independent pass found a second bug. It built the site with a test draft essay and found the draft's title and description shipped in a public JavaScript file, while the page itself correctly hid the draft. The author's check had looked at the page.

Neither bug needed a smarter model. Both needed a checker that asked a different question and didn't already believe the work was finished.

This isn't just my repo. In August 2025, METR looked at one agent's runs on 18 tasks: they passed the maintainers' tests 38% of the time, and of the 15 pull requests reviewed, 0 were mergeable as they stood. It's a small sample, but it matches what I saw: passing tests and being done are different claims.

## Payments already has a name for this

It's called maker-checker. One person creates the payment, a different person approves it. Nobody assumes the maker is careless or dishonest. The rule exists because whoever made the thing is the worst-placed person to find what's wrong with it.

Software in this industry has the same rule written down. PCI DSS v4.0 requirement 6.2.3.1 says that where code is reviewed manually, changes are reviewed by individuals other than the originating code author.

The stakes explain the rule. On 1 August 2012 a deployment went wrong at Knight Capital, and the firm lost more than $460 million in 45 minutes.

So I run agents the same way. One agent writes. A separate agent that never saw the task checks the result against the running app, and a third settles the verdict from the recorded evidence only. The author's confidence isn't part of that record.

The old objection to a second check was cost. Running a save 300 times by hand is an afternoon nobody budgets for, and for an agent it's a loop. Verification is now cheap enough that there's no excuse for skipping it.

## Three approvers, one wrong belief

The best argument against all this is that a second agent is often the same model with the same blind spots.

It's fair, and payments has its own version. In August 2020 Citibank meant to pass on about $7.8M of interest to Revlon's lenders, and wired about $894M of its own money along with it. That payment went through a maker, a checker and an approver. All three approved it - all three wrongly believed that setting one field was enough.

Models do the same thing. Kim et al., at ICML 2025, measured 350+ models and found that when two models are both wrong, they agree about 60% of the time.

So a second pair of eyes on the same evidence doesn't buy much. A checker that only reruns the author's tests is a rubber stamp. What found my stash bug was a different question, asked of the running system by something with fresh context, with the result written down as numbers instead of an opinion.

That doesn't make the checker immune. It can still share the author's blind spot, and it will miss things. It also costs tokens and wall-clock time. For a throwaway script it isn't worth it.

## Where I'd insist on it

Anything that touches money, user data, or work somebody could lose without noticing. A save button that can make someone's edits vanish and still report success belongs on that list, even in a small app.

The test is simple. If the only thing telling me a change works is the thing that wrote it, I have a maker and no checker. In payments nobody would call that an approval.

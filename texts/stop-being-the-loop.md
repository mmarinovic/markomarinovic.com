---
title: "Stop Being the Loop"
date: "2026-02-09"
description: "Hundreds of Claude agents ported Bun's 960,000 lines of Zig to Rust in six days - the job left for humans is gating the design going in and the diff coming out."
---

On May 8, 2026, the Bun team opened a pull request that rewrote their JavaScript runtime - 960,000 lines of Zig - in Rust. 6,755 commits across roughly 2,200 files. It merged on May 14. Six days. Claude agents wrote the code, not people. Jarred Sumner: "we haven't been typing code ourselves for many months now."

The rewrite is impressive. The orchestration is the point. Nobody sat in a chat window typing "continue" for six days. Claude wrote a JavaScript orchestration script that fanned out hundreds of parallel subagents and ran the loop. The humans contributed a roughly 600-line porting doc - a Rosetta Stone mapping Zig idioms to Rust - the phase design, and the merge call.

## The ceiling was you

For about two years, the default way to code with AI was a chat window. You type a task, one agent works, you watch. It helped. It also had a ceiling, and the ceiling was you.

Every step waited for you to read the output, nudge it, unblock it. The model was fast. Your attention was the bottleneck. You weren't directing the work so much as feeding it, one prompt at a time.

The people getting the most out of these tools have stopped working that way. They don't have a smarter model than you do. They have a different shape. They stopped being the loop.

## Same model, different topology

You can date the shift to a single month. In May 2025, OpenAI shipped Codex, which runs tasks in parallel sandboxes. Three days later, GitHub shipped the Copilot coding agent: assign it an issue, get back a pull request. The same month, Cursor shipped background agents, up to 8 at once. Three companies, one month, one shape - agents that work while you're not watching. That's not a power-user trick anymore. That's the product roadmap.

The shift: stop sitting inside the work, start standing above it. You design and gate; agents build in parallel; you review and approve. Instead of being the thing every step routes through, you own the few decisions that actually need a human and let the rest run.

Three moves make that real: isolation, workflows, and loops.

## Give every task its own lane

You can't run things in parallel if they trip over each other. The fix is dead simple: give every task its own copy of the codebase, on its own branch. One session builds a feature, another fixes a bug, a third drafts a design doc, and none of them touch the others or your main checkout.

This is the unglamorous foundation, and it's how the Bun port ran: one file per lane, each .rs file a behavior-identical port of its .zig counterpart, two reviewer agents on every file. Parallelism isn't a model capability, it's a setup choice. Once each task has its own lane, "run five things at once" stops being chaos and becomes normal.

## Describe the job, don't drive it

For anything bigger than a quick edit, stop steering step by step. Describe the whole job in plain language - "build this feature end to end" - and hand over the real context: the ticket, the design, the spec. A good system fans agents out across the phases, in order where they depend on each other, in parallel where they don't, and hands you back one result.

The part most people miss is the context. A run is only as good as what you start it with. The ticket tells the agents *what*; a living document of your conventions tells them *how*. Keep that document current and point every run at it, and you get work that follows your house style instead of just technically satisfying the ticket. Context in, quality out. It's the cheapest habit in the whole setup, and it pays back the most. Bun's porting doc is the proof: the most valuable thing the humans wrote all week wasn't code.

## The loop is the cheat code

If you take one thing, take this. The single biggest move is turning "keep checking on it" into a background process.

A loop is just a prompt that wakes itself up. On an interval, or paced by the agent itself, it re-reads the current state, does whatever the state calls for, and goes back to sleep until the next tick. That's it. Bun ran on this: a fix loop drove the build and the test suite, patching failures and re-running until everything came back clean. Another loop worked overnight, stripping unnecessary data copies and opening PRs for humans to review in the morning.

The chores that used to fragment your day - watching a build, greening a flaky test suite, shepherding a PR through review - become things you set up once and forget. "Keep checking on it" is one of the most expensive things you do by hand, precisely because it's cheap each time and you do it forty times a day.

The version that still surprises people: point a loop at your task board. For each unassigned item, it picks one up, fixes it on its own branch, opens a pull request, and starts a *second* loop to babysit that PR - pushing fixes when the build goes red, answering review comments - until it's ready for you. This isn't exotic. Claude Code's GitHub action runs headlessly on PR events and CI failures; Devin schedules its own recurring sessions. The babysitting loop is a product feature.

You set it up once. You come back to a stack of finished pull requests instead of a backlog of open tickets.

## The diff is the new queue

Be honest about the trade, though. You didn't kill the bottleneck. You moved it somewhere better.

Faros AI looked at telemetry from over 10,000 developers across 1,255 teams. Teams with high AI adoption merged 98% more pull requests. But review time rose 91%, average PR size grew 154%, bugs per developer ticked up 9% - and at the company level, delivery metrics didn't move. All that individual speed evaporated in the review queue.

The same pattern shows up at the source. Anthropic says over 80% of the code merged into its own production codebase is now written by Claude, with a typical engineer merging 8x as much code per day as in 2024 - and flags, to their credit, that this measures quantity, not quality. And GitClear, which sells code-quality tooling and so has an angle here, analyzed 211 million changed lines and found duplicated code blocks up 8x in 2024 while refactoring fell from 24% of changes to under 10%. That's what a codebase looks like when nobody reads.

The chokepoint used to be typing; now it's reading. A PR rubber-stamped unread is worse than one you never opened. The trade is still worth making. It only works if you actually read.

## Autonomy needs rails

Letting agents run unattended sounds reckless right up until you notice where the gates are. Nothing gets built before a human approves the design. Nothing ships before a human reads the diff. The agents commit and open the PR - that's just how work arrives for review - but they never merge. That stays your keystroke. Trust isn't "the agent is always right." Trust is "I can see exactly what it did, and the irreversible steps are still mine."

Bun shows what the gate becomes at scale. Nobody read that diff line by line - nobody could. The gate was the test suite the team had spent years building: 99.8% passing on Linux x64 during the experiment, every platform passing by merge. The humans kept the judgment calls - design in, merge out - and delegated the reading to the harness. The trade wasn't free, and they didn't pretend it was: the port landed with around 13,000 unsafe blocks, and Jarred expects roughly 10,000 to stay because Bun wraps so much C and C++. The community split down the middle on the PR: 1,665 thumbs up, 1,673 down. Rails don't make a bet safe. They make it visible.

That's also the order to adopt it in: a loop that only reports, then a loop that pushes a fix, then a small feature described as a workflow, then something running overnight. The trust compounds, and you never hand over a decision you can't take back.

## Judgment is the whole job

Edison said genius is 1% inspiration and 99% perspiration. The model just ate the 99%. Deciding what to build was always the small, hard part; building it was the grind. Now the grind is automated and the small, hard part is the whole job.

The scarce thing is no longer production. It's judgment: what to build, what good looks like, what to throw away. The model is delighted to write the code. It can't decide whether the code should exist. That decision is still yours, and pushing your time toward it beats racing a machine at the one thing it's best at.

So stop being the loop. Gate the decisions, fan out the work, and let the long tail run in the background.

Start with one loop. Point it at something read-only, watch it run, and keep what works.

---
title: "Stop trying to remember your codebase"
date: "2026-11-22"
description: "You can't keep a current model of a large codebase in your head - keep the architecture, have an agent rebuild the local detail before each change, and write down where your checking stopped."
---

Stop trying to keep a large codebase in your head. You can't keep it current, and you don't need to. A repo has years of history and dependencies you didn't write, and agents can add code faster than you can read it. What you remember from the last change needs checking against what exists today.

You need two different kinds of knowledge, and it helps to keep them apart.

![Two lines over six months since you last read the code: broad awareness declines slowly, current local detail drops most of the way within a few weeks](/images/stop-trying-to-remember-your-codebase/two-kinds-of-knowledge.svg)

## Broad awareness

The first kind is architecture: where the services live, which module owns auth, roughly how a request moves through the system, which parts are old and fragile. It changes slowly and it's worth keeping. It tells you where to look. It doesn't tell you what the code does today.

## Current local detail

The second kind is narrow: what this function returns when the input is empty, who calls it, what it writes to, which config flag changes its behavior. It goes stale fast, and it's the kind that breaks things when you get it wrong.

So I don't try to remember it. Before every change, I ask an agent to work out what the part I'm about to change does today, from the code, the tests and the git history. Not the whole codebase, just that part, and just for this change. When I come back to it a few months later, I ask again, because the code has moved on and so has my memory of it.

That part is rarely one file. A change to one function reaches past the file it lives in, so reading that file alone won't tell you what you're about to break.

## Rebuild it with an agent, one layer at a time

Here's a made-up example to work through: you're changing `approvePayment()` so that anything above £10,000 needs a second approver.

I don't read my way through this by hand. I ask an agent to rebuild it, and I ask in layers: the map first, then how this part behaves, then everything the change can reach. I only go deep where the change needs it.

Here's the prompt:

```text
I'm changing approvePayment() so anything above £10,000
needs a second approver. Don't change any code yet.

Explain what this part of the system does today, in three
steps. Stop after each step and wait for my questions.

1. The map, in ten lines: what this code is for and which
   modules own it.

2. A Mermaid state diagram of the payment lifecycle as it
   exists now: every state, every transition, and what
   triggers each one. Draw what the code does, not what
   it should do.

3. Everything this change can reach: callers, including
   tests, jobs and indirect imports. Dependencies that
   changed recently. Everything it writes, sends or emits.

Cite the file and line for every claim. If you can't
confirm something, list it under "not checked". Don't guess.
```

The state chart is the part I'd keep if you only keep one. A paragraph can skip a case without you noticing. A chart has to show every state and what gets a payment out of it, so a gap has nowhere to hide.

![A made-up payment lifecycle as a state chart: waiting, approved, sent, settled, with rejected and failed branches. A dashed state for payments above £10,000 waits for a second approver, with a note asking who approves payments from the scheduled job, which approves with no person](/images/stop-trying-to-remember-your-codebase/approve-payment-states.svg)

Draw the change on top of what exists and a question shows up that the request never raised. The scheduled payments job approves on its own, with no person involved. So where does a £12,000 scheduled payment go now?

The third layer is the boundary: everything the change can reach, and so everything you need to understand.

Callers are every place that calls the function, including tests, scripts and anything that imports it indirectly. In the example, that's the approvals screen, the scheduled payments job and the partner API.

Dependencies are what the code relies on, and whether any of it changed version or behavior recently. Here it's the payment provider's SDK, which was just upgraded, and the approval limit setting.

Effects are every place it writes to a database, sends a request, emits an event, touches a cache or changes a file on disk. This function writes to the ledger, sends the payment out and notifies the finance team.

When the reason for something matters, have the agent go through the git history too, like why a strange branch exists or who added a check and what bug it fixed.

## Then check what it told you

An explanation is a claim about the code. A model can be confident and wrong, and so can a teammate. So check the parts the change depends on. Open the line the explanation points to and run the test that covers it. Call the function with the edge case and look at what comes back.

Behavior you observed counts for more than behavior someone described. A summary that matches the code and the test output is something you can build on. A summary nobody checked is still a guess.

## Write down what you couldn't check

Even after all that, the boundary is never complete. A caller can hide behind reflection or a string lookup. A dependency can have behavior nobody documented, a feature flag can have a different value in production than on your machine, and a function you depend on might have no test.

When you hit something you can't check, write it down. Keep a short list next to the change with the callers you checked and the ones you didn't, plus the assumptions you're making about config or data. This list is the honest part of the work. The reviewer sees where the risk sits. If something breaks later, whoever debugs it knows where to look first.

If you leave the list empty, be ready to explain what you checked.

## What it looks like in a change

A change built this way ships with the evidence that was checked and a written list of what wasn't. Here's the note for the `approvePayment()` example, made up like the rest of it:

**Require a second approver above £10,000 in approvePayment()**

**Checked**

- 3 callers found by search, including the scheduled payments job
- approval.test.ts passes, 3 new cases around the £10,000 limit
- Approved the same payment twice by hand: second call rejected, nothing sent
- git blame on the self-approval check: added in 2024 so creators can't approve their own payments

**Not checked**

- Partner webhooks look handlers up by string - a 4th caller may exist
- The approval limit in production - £10,000 locally, couldn't read prod config

**Assuming**

- Payments already waiting for approval keep the old rule
- Scheduled payments above £10,000 wait for a person, like any other payment

The architecture knowledge got you to the right part of the repo. The rebuild told you what that part does right now. The list tells the next person, human or agent, where your understanding stopped.

When someone touches that code again in six months, they start from that list and rebuild from the code, the same way.

---
title: "What I no longer care about when reviewing code"
date: "2026-06-01"
description: "When implementation becomes abundant, review should move from syntax toward consequences - what I spend less time on now, and what gets more of my attention."
---

I have less patience for code-review comments that could have been a formatter setting.

There's too much else to look at. A change can follow every convention in the repo and still overwrite someone's decision, hide a cost, or break halfway through a deployment.

AI made this obvious in my own work. I can get an implementation quickly. Understanding what it does to the rest of the system takes the same work it always did.

When implementation becomes abundant, review should move from syntax toward consequences. Some of my comments haven't caught up yet.

## I care less about how I would have written it

Formatting, import order, boilerplate, stylistic consistency. If we can agree on a rule and put it in tooling, I don't want to negotiate it again on every PR.

Naming minutiae belong here too, though I'll still stop on a name that lies. If something called `isPaid` really means a payment was initiated, that changes how the next engineer uses it. But spending a review round on two equally clear names is getting harder to justify.

Mechanical implementation choices are the same. I might have written the loop differently or split the helper somewhere else. Unless I can explain what my version improves, that's a preference with a notification attached.

Readable code matters because I need to understand it. Once I do, the rest of the review belongs to what it does.

## I care more about where the boundaries actually are

In a review of a book-generation feature, the web app started expecting a new `versions` field from a background worker. The new worker sent it. The types required it. Everything agreed inside the branch.

The web app and the worker deployed separately.

If the web app went first, the old worker would still send events without that field. The handler tried to iterate over it, threw, and returned an error. The worker retried with the same payload. The page image never got recorded, and the book could end up marked as failed.

The fix was small. The review question was bigger: what happens while these two services are running different versions?

A type in one repository doesn't make two services deploy at the same time. That's the boundary I care about - who owns the contract, and which assumptions survive outside the branch I'm reading.

## I care more about who gets to change the data

The same feature let an admin choose between generated image versions. I flagged a webhook replay that could undo that choice.

Version A arrives and gets saved. The response is lost, so the worker will retry. Meanwhile the admin selects version B. When A arrives again, the handler finds its existing database row, then makes A the active image anyway.

There was duplicate detection. It stopped a duplicate row from being written, not a replayed event from changing which version was live.

The rule I wanted preserved was simple: replaying an old event must not erase a later human decision.

That sends me straight into the details - the writes, the transaction, the retry, and the order they can happen in. Caring less about mechanical choices doesn't mean skimming the implementation. Sometimes one assignment is the whole bug.

It changes how I read tests too. A test proving there's still only one row doesn't prove the admin's choice survived. I want the test to exercise the promise we're making.

## I care more about what the user sees and what we can explain

In an invoice review, I found a preview that hid rows without a description but still counted their amounts in the total. Enter a $100 row with a description and a $50 row without one, and the preview shows a single $100 row under a $150 total.

Submission validation stopped the incomplete invoice from going out, which limited the damage. It didn't make the preview make sense.

The total calculation and the row filter each had a reasonable job. Together they made the product contradict itself. I want to follow a change far enough to see that, even when every function looks fine on its own.

Observability belongs in the same review. In the book-generation feature, the new page-regeneration and editing jobs used trace names the cost collector didn't match. Those jobs could spend money without it ever reaching the stored totals, and the scheduled reconciliation used the same filter, so waiting wouldn't recover it.

I care whether a new operation is visible to the systems we debug with. Can we tell a slow job from a failed one? Does its cost show up? If someone asks why their page changed, can we reconstruct what happened?

Adding logs isn't enough. I want to know whether they answer the question we'll actually have.

## I care more about authority than the presence of a check

Seeing an authentication check doesn't finish that part of the review. I still want to know which account owns the data, whether this caller can change this particular record, and where that's enforced.

A hidden button tells me what the interface allows. I still read the server action.

In the page-version review, the interface and the action both let an admin accept a version while generation was still running. A later continuation could overwrite that acceptance. The admin had permission to review pages, but the operation was allowed at the wrong point in the workflow.

That's a workflow defect, not a breach. It's also why a role check alone doesn't describe the rules: who may act, on which data, and in which state are three different questions.

## I care more about whether this change needs to exist

I've written about a PR where two agents approved the code before a senior teammate left 3 comments that changed how the feature would age. That stays with me because an early abstraction or a dependency in the wrong place takes several iterations to start hurting.

AI makes it easy to arrive at review with a complete implementation of an unnecessary idea. Once there are files and tests, the conversation becomes about improving them. We'll spend an hour polishing a layer before anyone asks why we added it.

I want that question earlier. What requirement needs this abstraction? Why does this module now know about that one? Are we creating a second place to maintain the same rule?

I still ask for shared code when it gives a rule one home. In the generation review, editing and regenerating a page repeated the same storage, notification, and superseded-job handling. Changing the failure behavior meant remembering both copies. That's a concrete reason to extract something. Someday supporting 5 more variants isn't.

Generating another layer is cheap. Keeping it understandable through the next 10 changes is work we agree to when we merge it.

I'm still reading every line. I just want each comment to earn the attention it asks for: if a tool can settle it, the tool should settle it, and if I'm asking for a change to the implementation, I should be able to name the consequence.

The best question in code review is becoming less "is this code good?" and more "what new reality does this code create?"

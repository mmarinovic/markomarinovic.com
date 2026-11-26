---
title: "How to Actually Read an AI-Sized Diff"
date: "2026-05-04"
description: "Human review capacity tops out around 400 lines a sitting - the job now is deciding where those lines go, not pretending you can read everything."
---

In May 2026, the Bun team merged a pull request that rewrote their JavaScript runtime - roughly a million lines of Zig - in Rust. 6,755 commits, opened and merged in six days. Nobody read that diff. Nobody could have. At 400 reviewable lines an hour, reading it once would take a person working full-time more than a year.

That sounds reckless. It wasn't. The merge gated on 99.8% of a test suite the team had spent years building, passing on Linux x64, with two reviewer agents reading every file before any human looked at anything. The humans didn't skip review. They redefined it.

I wrote about [stopping being the loop](/texts/stop-being-the-loop) - design in, agents in the middle, merge out. This is the part that comes after: someone still has to vouch for what the fleet produces, and "read it all" stopped being an option around the second parallel agent. Bun is the extreme case, but the reasons that merge wasn't reckless are the playbook for everyone whose diffs just outgrew their eyes.

## 400 lines is the budget

The largest published study of code review is old enough to vote. In 2006, SmartBear ran a 10-month study at Cisco: 2,500 reviews, 3.2 million lines of code, 50 developers. The findings have held for two decades. Review 200-400 lines at a sitting, over 60-90 minutes, and you find 70-90% of the defects that are there to find. Push past about 450 lines per hour and detection drops below average - it did in 87% of cases.

That ceiling is biological. It hasn't moved since 2006 because eyes and working memory haven't moved since 2006.

The other side of the equation moved a lot. Faros AI's July 2025 report, built on telemetry from more than 10,000 developers across 1,255 teams, found that high-AI-adoption teams merged 98% more PRs. Average PR size: up 154%. Review time: up 91%. Company-level delivery: flat. The code got faster to write and slower to absorb, and the difference went nowhere.

And here's what actually happens when a big diff lands in a queue. Per Graphite's data - they sell PR tooling, so note the angle - only 24% of PRs over 1,000 lines get even one review comment. The 2006 study says humans can't read diffs that big. Graphite's numbers say they don't. They approve them anyway.

So review isn't a diligence problem anymore. It's an allocation problem. You have roughly 400 good lines per sitting - a budget, not a suggestion. The rest of this essay is how to spend it: machines read everything, the harness gates behavior, and your 400 lines go where mistakes are irreversible.

## Machines read everything first

Bun put two reviewer agents on every file of the port. That's the first layer: cheap, tireless reading at 100% coverage, because you can't provide it. Reviewer agents are a product category now, not a science project - most teams can turn one on this week.

The standard objection is that AI reviewing AI code is circular. That assumes the reviewer is the author. It isn't. A reviewer agent gets a fresh context window, no memory of the choices that produced the code, and an objective that points the other way. The author agent was optimizing to make the task look done; the reviewer is optimizing to prove it isn't. Same model family, adversarial stance - that's why Bun ran two per file instead of trusting the author's self-assessment.

Now the honest part. A reviewer agent is a filter, not a verdict. In my experience these tools are genuinely good at mechanical correctness: the off-by-one, the unhandled error path, the function whose contract changed in one file but not the three that call it - the cross-file drift that's nearly invisible when you're reading files one at a time. What they can't tell you is whether the code should exist, whether the abstraction is right, whether this PR quietly forecloses a design you'll need in six months. Those are exactly the questions your 400 lines are for.

The fleet reads every line so that your lines go where they count. That's the trade, and it's a good one - as long as you remember which questions you kept.

## Tests gate behavior - but test the tests

Bun's merge gated on a test suite, not on eyeballs. That's the model for behavior at scale: the harness vouches for what the code does, across more lines than any human will ever read.

But "tests pass" only protects asserted behavior. A test that asserts nothing passes everything. A 2026 study of AI-generated test suites found suites hitting 85% line coverage with only a 57% mutation kill rate - nearly half the deliberately injected bugs survived a suite that looked thorough on the dashboard. Coverage without assertions is theater. And if your agents write the tests and your gate is those tests, you've built the circularity problem with extra steps. Mutate the code, count what survives, and fix the suite before you trust it.

Even a real gate has holes. Bun's 99.8% still shipped with around 13,000 unsafe blocks. The suite checked behavior, faithfully - and said nothing about safety properties it was never written to assert. A gate only guards what someone thought to encode in it.

One more caveat, and it's the one most people skip. Bun was a behavior-identical port against a mature suite. That's the rare case with a perfect oracle: the old code is the spec, and the suite already encodes it. Feature work has no oracle. There's no existing behavior to match, so there's no suite to inherit. The lesson transfers only if you build the spec first - tests, invariants, a written contract - before the agents fan out. If you can't say what correct means, no harness can gate it for you.

## Your 400 lines

Two layers down, the machines have read everything and the suite has pinned behavior. Now spend the scarce resource.

The decision rule: human reading goes where mistakes are irreversible or the blast radius is large. In practice that's a short list. Auth and permissions. Anything that touches money. Data deletion and migrations. Public API contracts. Concurrency. Crypto. A bug in a settings page gets caught and patched on Tuesday; a bug in a migration ate the data on Monday.

That's what the Bun humans actually did. They didn't read the million lines - they kept design in and merge out, and what they read closely was the small set of decisions that couldn't be taken back: the porting rules every agent followed, the phase plan, the choice of gate itself. One page of irreversible decisions, read hard, instead of a million lines of reversible ones, skimmed.

Your version is smaller but the shape is the same. In a 2,000-line AI-written PR, maybe 150 lines touch auth, a migration, or a public contract. Those are your lines. Read them like the 2006 study says you can - slowly, completely, once.

## Shape the diff before it reaches you

There's a fourth move, and it happens before review starts: diff shape is a controllable input, not weather.

Graphite's data again, same vendor caveat: 50-line changes merge about 40% faster than 250-line ones and are 15% less likely to be reverted. Small diffs aren't politeness. They're the unit at which the 2006 math works in your favor - a 300-line PR fits inside one good sitting, a 3,000-line PR fits inside none.

The agent doesn't care whether it ships one 3,000-line PR or a stack of twelve small ones. You do. So put diff shape in the instructions every run starts with - the same conventions doc I argued for in the last essay, the thing Bun's porting doc proved is the most consequential file a human writes all week. Mine now says: small stacked PRs, one concern per PR, tests land in the same PR as the behavior they pin. The diffs arrive pre-shaped for a human reader, because the human reader is the constraint the whole pipeline is built around.

## The merge is still your keystroke

The fleet can read every line. The suite can gate every behavior. The accountability doesn't move an inch. When the PR merges, it merges because you decided it should, on evidence you chose to trust - and if it breaks production, the agents won't be in the postmortem. That's not a gap in the tooling. That's the job.

So here's the stack in one breath: machines read everything, tests gate behavior - after you've tested the tests - and your 400 lines go where mistakes can't be undone.

Try it on your next AI-written PR. Run a reviewer agent before you open the diff. Break one line the tests should catch and see if they do. Then spend your 400 lines on the file that touches auth, money, or the data - and merge as someone who read what mattered, not someone who scrolled past what didn't.

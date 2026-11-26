---
title: "How I Optimized an AI System to Cut Its Bill by 80%"
date: "2026-03-09"
description: "A single customer chat cost $5.38 - cutting the bill 80% on the same model came down to the prompt, the cache, and a replay harness that proved it."
---

## The brief

My job was to analyse and improve the AI pipeline of a customer-support and sales chatbot platform. Its agents sit on top of real e-commerce stores: they answer questions, search the catalog, recommend products, and help people check out. They worked well. They were also quietly expensive, and nobody could say exactly why. The ask was simple to state and harder to do: find out where the money goes, cut the cost without hurting quality, and prove both on real traffic.

The first thing I pulled from the logs set the tone. The biggest conversation in the system cost $5.38 - one customer, 47 messages, the agent looping through tool calls and dragging an enormous context behind it on every turn. Nobody knew why it cost that much. Nobody was even watching; the bill just arrived and got paid. Multiply that across thousands of conversations a week and the math gets uncomfortable fast.

By the end of the work, that same conversation cost **$0.56**, the average cost per message was down **~80%** on the same model, and a judge scored the new system's answers higher than the old ones. Here's what I found, what I changed, and how I measured it.

## What I found

I traced how the platform assembles each model request and measured real conversations from the tracing logs. Five findings. None of them are exotic; all of them compound.

### 1. The prompt was the bill

When people think about LLM cost, they think about the answer the model writes. That's the cheap part. The expensive part is the input: everything you send the model so it can produce that answer. On every single message, the agent re-sent its entire working context:

- the system prompt (its standing instructions and brand voice),
- the full conversation history so far,
- the definitions of every tool it's allowed to use,
- and the results of every tool it called earlier in the chat.

All of that is input, and you pay for all of it, every message. These agents were sending roughly **96,000 tokens of input per turn** to get a reply of a few hundred tokens back. The platform was paying for a giant brain, over and over, to get a sentence. Measured across real conversations: **$0.049 per message**.

This finding is the umbrella for everything else. The reply is not the cost. The context is the cost. Anything that bloats the context - a heavy system prompt, a long history, a verbose tool result - makes every future message in the conversation more expensive.

### 2. The same guidance was written four times

The instructions repeated themselves. The system prompt described every tool the agent had. Then it had separate "playbooks" for checkout, search, and comparison. Then the agent's skills repeated the same sales and support rules. Then the widget formatting rules said it again. Most of the prompt was duplicate weight, shipped on every message.

### 3. The instructions disagreed with the tools

The prompt advertised abilities the agent wasn't always allowed to use on a given turn. Two sources of truth for "what can I do" - the actual tools and the prose describing them - and they slowly drifted apart. The model got mixed signals, and questions about promotions sometimes triggered a product search that didn't belong.

### 4. The prompt couldn't be cached

Model providers will reuse the start of your prompt at a fraction of the price, but only up to the first byte that changes. This prompt had its volatile parts - a timestamp down to the second and the identity of the current user - sitting in the middle. Everything after them was uncacheable on every message, by construction.

### 5. Nobody could tell whether a change helped

Nothing was measured. There was no way to know whether a prompt change helped or hurt on real conversations. "It looks better" was the entire QA process.

## How I fixed it

One idea drives all of it: **say each thing once, keep the stable part stable, and decide abilities per message instead of describing them in the prompt.** Concretely, one fix per finding.

**One owner per instruction** (finding 2). Every piece of guidance now lives in exactly one place. Cross-cutting rules in the system prompt. "When to use this" in the tool's own description. "How to format this" in the tool's result. Sales and support behavior in skills. If two layers said the same thing, one of them was wrong, so I deleted the duplicate.

**Delete the tool catalog from the prompt** (finding 3). The model already receives every tool's name, description, and schema through the tool interface. Listing them again in the prose was pure duplication, and it was the thing that drifted out of sync. Gone.

**Route by intent** (findings 1 and 3). A lightweight classifier reads what the customer actually wants and turns on only the abilities that fit, instead of offering the model everything on every message. Fewer tools in context, and a single source of truth for what the agent can do. The router is itself a small model call on every message, so I counted its cost against the savings rather than hiding it.

**Make the prompt cache-shaped** (finding 4). Stable, identical-for-everyone content first; volatile bits (who's asking) at the very end. One small detail with an outsized payoff: the date only needs day granularity, and a day is far longer than the cache lifetime, so it can live in the cached, reused part and invalidate once a day instead of busting the cache on every message. The fixed, reusable part of the prompt went from "everything, every time" to roughly **96% reusable**.

**Build the measurement before trusting any of it** (finding 5). A prompt change that looks cleaner can easily be worse, so before believing anything I built a replay harness. That deserves its own section.

## Proving it instead of believing it

This is the part I care about most, because it's where most "we optimized our prompts" stories quietly stop.

The harness works like this:

1. Pull **real production conversations** from the tracing logs - exact user messages, in order, fully anonymized before any analysis.
2. Replay them through the **new** pipeline, same model, same inputs.
3. Compare cost and quality, before versus after, message by message.

Same words. Same model. The only thing that changes is how the context is built, so whatever difference shows up *is* the optimization.

### Cost is easy to measure. Quality is the trap.

For quality I used an LLM as a judge, and getting the judge right took three tries. Each failure taught me something.

**First try: judge the transcripts.** It told me the new system was *worse*. Alarming, until I looked closer: the judge had no way to know what was true. It was guessing whether a product existed, and guessing wrong.

**Second try: give the judge the ground truth the agent had** - the actual tool calls and their results. The verdict flipped, and it caught something real. In one conversation a customer asked whether a specific product was stocked. The old system confidently said "we don't carry that" and never checked the catalog. The new system searched, found it (real, just sold out), and said so. The old "no" was a hallucination that quietly cost a sale.

**Third try: judge against the agent's own instructions, not the judge's taste.** Even with tool results, the judge still scored a couple of conversations for the old system, because it rewarded a fast, confident product recommendation. But the brand's own prompt says the opposite: gather details first, ask before recommending. The old system was scoring well by *breaking* its own rules; the new one was "losing" by following them. Once the rubric became "how faithfully does each answer follow the agent's documented behavior," the result was clear: the new system scored **14.8 out of 20 versus 11.2**, and won **7 of 9** conversations. The one conversation it genuinely lost was honest: it made a claim without searching first, which its own instructions forbid.

The lesson for anyone using LLM-as-judge is two parts: a judge is only as good as (1) the ground truth you give it and (2) the rubric you hold it to. Score transcripts alone and it hallucinates a verdict. Give it tool results but let it use its own taste, and it rewards confident rule-breaking. Give it tool results *and* the agent's own instructions as the standard, and it can finally tell a grounded answer from a plausible one.

## The results

Measured across 500 real conversations and roughly 3,850 messages - all of them completely anonymous - same model before and after:

| Metric | Before | After | Change |
|---|---|---|---|
| Cost per message | $0.049 | $0.0099 | -80% |
| Cost per conversation | $0.38 | $0.076 | -80% |
| Worst single chat (47 messages) | $5.38 | $0.56 | -90% |
| Total (~3,850 messages) | ~$189 | ~$38 | -80% |

The "after" column includes the cost of the new intent router itself - a second, small model call on every message. Even carrying that overhead, the per-message cost drops 80%.

The pattern underneath the numbers is the interesting part. Before, the cost per message was almost flat across a conversation, because the fixed brain dominated and the actual conversation barely moved the needle. After, a message starts cheap and grows only with the real exchange. The platform stopped paying for the brain on every message and started paying only for the conversation.

## The takeaways

Three things I'd tell anyone running an LLM product:

**The prompt is the bill.** Optimize the input, not the output. Everything you send on every message - instructions, tools, history, tool results - is what you pay for.

**One instruction, one home.** Duplication across a system prompt, tool descriptions, and skills isn't just messy - it's a recurring charge. And keep the prompt cache-shaped: stable content first, volatile content last.

**Replay before you believe.** Your production logs are a free regression suite. Replay real conversations through the change, measure cost automatically, and judge quality with the same ground truth the agent had. "It looks better" is not a metric.

The platform stopped re-sending the brain. It caches it, routes it, and proves it. The bill followed.

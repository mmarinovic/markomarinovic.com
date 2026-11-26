---
title: "How I work with agents today"
date: "2026-11-18"
description: "I stopped opening a new AI session for every task - now I talk to one agent per project, it keeps the map, and my phone is the inbox."
---

I talk to one AI agent per project, in one thread. It runs on my MacBook, my phone connects to it over Tailscale, and it hands heavy work to a Linux box or a cloud container.

It took me a while to get here. The reason I'm staying is simple: I got my sanity back.

## What I did before

Every task used to get its own session. New bug, new session. New idea, new session. Each one started without what the others knew, so I lost a bit of context every time.

The bigger cost was in my head. I had to hold a map of which session was doing what. When I had several things running in parallel, it was very easy to get lost and lose track of one of them.

Nothing in the tools held that map. I did.

![Two panels. Before, with one session per task, you sit in the middle of five separate sessions and track which one is doing what. Now, with one agent per project, you talk to one agent, and it tracks a subagent, a Linux box and cloud containers](/images/how-i-work-with-agents-today/who-keeps-the-map.svg)

There's a name for part of this. In 2009, Sophie Leroy published a paper on what she called attention residue: it's hard for people to move their attention off an unfinished task, and their work on the next task suffers. She studied people switching between work tasks. She wasn't studying agents, so applying it here is my own stretch. But running a pile of parallel sessions means you always have unfinished tasks, by design.

I looked for a controlled study of people running parallel coding agents and didn't find one. What exists is mostly blog posts and tool makers talking about their own tools, so treat this text the same way. It's one person's setup.

## One thread per project

Now it's one project, one agent. A project can be my texts. It can be an application I'm working on. If I'm working on three projects, I have three agents, one each.

Everything for that project goes into its thread. The agent has the context, so I don't need to carry it.

Take an application I'm working on. A bug report goes into its thread. So does a feature idea, and the question of why a test started failing on the Linux box. When I ask for the fix, I don't have to explain how the app is structured, where the tests run or what we already decided about that part of the code.

## One thread doesn't mean one thing at a time

The main thread can still export work, and it does that for two different reasons.

The first is my laptop. The MacBook sticks to reading, editing and git. Feature work, test suites and long-running jobs go to a Linux box or a cloud container, so they don't clutter the machine I'm sitting at.

The second is the conversation. A subagent is a separate agent the main one starts for a single job. The Claude Code docs say each subagent "runs in its own context window" and returns a summary. When I'm adding a feature, the main thread can hand one piece of it to a subagent and get back a summary of what changed. The detail of that work stays out of the main conversation.

So parallel work still happens. What changed is who's tracking it. The agent is, and I ask one place what's going on.

![A phone labelled inbox connects over Tailscale to a MacBook running the main thread. The MacBook hands feature work and tests to a Linux box, and long or heavy work to cloud containers](/images/how-i-work-with-agents-today/one-thread-work-goes-elsewhere.svg)

## Why one agent holding the context works

People who build agents have argued about this for a while. In April 2026, Walden Yan of Cognition wrote that teams of agents all writing at once still go badly, but that a narrower set of patterns work, and summed them up as "multi-agent systems work best today when writes stay single-threaded". Cognition sells an agent, so weigh that accordingly.

That post is about how to build agent systems, but I read it as a description of my old setup. With a session per task, I was the one passing context between agents, by hand, from memory. I was the shared context, and I wasn't very good at it.

## My phone is the inbox

My phone connects to the MacBook over Tailscale, which puts my devices on a private network with encrypted connections between them. Only devices on that network can reach each other.

The phone acts as an inbox. The agent works, and when it's done or needs a decision, I see it there and answer. With one agent per project, there's one conversation per project to check.

I tried a lot of different apps for this and ended up with T3 Code. It has everything I need and it looks good. Use whatever you like. The app matters less than talking to one agent.

## What it costs

A long thread eventually runs out of room. The agent compresses older parts of the conversation to keep going, and some detail gets lost. So anything that has to survive goes in a file, and I don't count on the thread to remember it.

Subagents hand back summaries. Detail gets dropped at that handoff, so a summary that matters still needs checking against the source.

One thread is also one queue. If I want two competing approaches explored side by side, I have to ask for that on purpose.

And the MacBook has to stay on and reachable, or the phone has nothing to talk to.

I can't give you a number for any of this. I haven't measured whether I ship more. What I can tell you is that I don't keep the map in my head anymore, and I don't miss it.

---
title: "A storybook about anything she wants"
date: "2026-11-27"
description: "My daughter loves stories. With Čičamiča, the storybook app we built at blank, I can turn whatever she wants to talk about into an illustrated book, then order it printed or read the PDF on a tablet. Here's what it does and what was hard to build."
---

My daughter loves stories. Every evening there's one more, and the story she wants is rarely the one we have on the shelf. It's about whatever she's thinking about that day.

Now it's very easy for me to give her exactly that story. I write down what she wants to talk about and who should be in it, and Čičamiča writes and illustrates a book where she's the hero. Then I can order it as a printed book for the shelf, or download the PDF and read it with her on the tablet. And the best part: when she wants to, she can make a story herself on the tablet.

The one in the photo is about a little sparrow on her balcony.

![My daughter on the sofa, reading her printed Čičamiča book: a girl in a purple jumper watching a sparrow on a snowy balcony](/images/a-storybook-about-anything-she-wants/reading-her-book.jpg)

Čičamiča is a product we built at [blank](https://blankhq.co), and we built it for our own kids first. Most personalised children's books are one book for everyone, with a different name dropped into the same sentences. Kids notice. We wanted a story that's really about them, with their pets, their grandparents, their favourite toys, and a real printed book at the end.

You can try it at [cicamica.hr](https://cicamica.hr). The app and the stories are in Croatian.

## Technical difficulties and challenges

Asking a model for a bedtime story takes one prompt. Getting a book a parent will pay for, read aloud and keep takes a lot more. These were the hard parts.

### One prompt gives you the most predictable story

Left alone, a model writes its most predictable idea every time. So a story is written in stages, by three different agents.

The first agent reads the parent's wishes and proposes five different starting points. Then the code, not the model, picks one at random. When a model chooses, it picks the most conventional option, and randomness is what keeps the stories surprising.

A second agent writes four complete drafts of that story in parallel, sized for the child's age. Plain code throws out drafts that wouldn't print well, like a title too long for the cover. Then a third agent, the judge, ranks the shuffled drafts against the parent's brief, the age, how a good story is built and the safety rules. The best one is printed exactly as written.

![How a story gets written: the parent's wishes go to an agent that proposes five starting points, code picks one at random, a second agent writes four drafts in parallel, code filters out drafts that won't print, and a judge agent picks the one that gets printed](/images/a-storybook-about-anything-she-wants/how-a-story-gets-written.svg)

### The same world on every page

This was the hardest problem. Today's image models are great at keeping a character consistent across a few pictures, but not across a whole book. And the character is only half of it. You also want the scene to stay the same: if the story happens in the living room, that living room should look 99% the same on every page, with the same sofa, the same window and the same rug.

So we stopped painting pages one by one. The story is finished before any picture exists, and a planner decides how the text splits into pages and what each picture shows. Then a single image model call paints every page together, as one grid, and the pages are cut out of it. Because they were painted together, the cast, the palette and the setting stay very close across the whole book. The cover is painted from the same grid, so the child on the front is the child inside.

Very close isn't 100%. Getting every page fully consistent is still almost impossible without a few redos, and sometimes a manual fix.

![Page by page versus one grid: painting pages separately lets the child and the room drift from page to page, while painting every page in one grid and cutting the pages and cover from it keeps the cast and the setting close throughout](/images/a-storybook-about-anything-she-wants/one-grid-every-page.svg)

### Safe and right for her age

A three-year-old and an eight-year-old need very different stories, and whatever a parent types in, nothing inappropriate can reach a child. The age band shapes every draft, and the judge checks the safety rules.

### People check every story before it's printed

Our support team checks every story before anything goes to print. They can redo or edit a single page, repaint the cover, or repaint the whole grid with a note. Parents can also edit the text and send feedback on any page before the book goes to print, and the team fixes it and sends the updated book back.

### The right model for each part

Behind the scenes, the engine uses several models from Anthropic (Claude), Google (Gemini) and OpenAI. Each one does the part it's best at, because every model has its own strengths. We didn't guess which is which: we tested them and kept the ones that worked best for our case.

## What I took from it

The model isn't the product. The product is everything around it: the stages that turn one prompt into a good story, the trick that keeps every page looking like the same world, the checks that keep it safe, and the people who have the last word.

And the best review so far is a little girl on the sofa, reading a book about a sparrow that nobody else in the world has.

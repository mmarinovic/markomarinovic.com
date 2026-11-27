---
title: "A storybook about anything she wants"
date: "2026-11-27"
description: "My daughter loves stories, and with Čičamiča, the app we built at blank, I can turn whatever she wants into an illustrated book, printed or on a tablet. Here's what was hard to build."
---

My daughter loves stories. Every evening there's one more, and the story she wants is rarely the one we have on the shelf. It's about whatever she's thinking about that day.

Now I can give her exactly that story. I write down what she wants to talk about and who should be in it, and Čičamiča writes and illustrates a book where she's the hero. Then I can order it as a printed book for the shelf, or download the PDF and read it with her on the tablet. And sometimes we make one together: we go through the app on the tablet side by side, and she decides what goes in.

The one in the photo is about a little sparrow on her balcony.

![My daughter on the sofa, reading her printed Čičamiča book, open at a page where a girl in a purple jumper watches a sparrow on a snowy balcony](/images/a-storybook-about-anything-she-wants/reading-her-book.jpg)

Čičamiča is a product we built at [blank](https://blankhq.co). Most personalised children's books are one book for everyone, with a different name dropped into the same sentences. Kids notice. We wanted a story that's really about them, with their pets, their grandparents, their favourite toys, and a real printed book at the end.

![A Čičamiča cover annotated with what the parent wrote: Roko, his friend Luka, his dinosaur Dino, his favourite shirt and his word for helicopter, "hepikopter", all drawn on the cover](/images/a-storybook-about-anything-she-wants/what-a-parent-writes.jpg)

You can try it at [cicamica.hr](https://cicamica.hr). The app and the stories are in Croatian.

![Three Čičamiča covers from cicamica.hr: a boy riding a donkey through a village at midnight, two girls chasing a runaway cookie through a snowy forest, and a boy flying with a seagull and a snowflake over Split](/images/a-storybook-about-anything-she-wants/three-books.jpg)

## What was hard to build

Asking a model for a bedtime story takes one prompt. Getting a book a parent will pay for, read aloud and keep takes a lot more. These were the hard parts.

### One prompt gives you the most predictable story

So a story is written in stages, by three agents.

The first agent reads the parent's wishes and proposes five different starting points. Then the code, not the model, picks one at random. When a model chooses, it picks the safest option, and randomness is what keeps the stories surprising.

A second agent writes four complete drafts of that story in parallel, sized for the child's age. Plain code throws out drafts that wouldn't print well, like a title too long for the cover. Then a third agent, the judge, ranks the drafts, shuffled so their order is no hint, against the parent's brief, the age, how a good story is built and the safety rules. The best one becomes the book's text.

![How a story gets written: the parent's wishes go to an agent that proposes five starting points, code picks one at random, a second agent writes four drafts in parallel, code filters out drafts that won't print, and a judge agent picks the winner, which becomes the book's text](/images/a-storybook-about-anything-she-wants/how-a-story-gets-written.svg)

### The same world on every page

This was the hardest problem. Today's image models are great at keeping a character consistent across a few pictures, but not across a whole book. And the character is only half of it. You also want the scene to stay the same: if the story happens in the living room, that living room should look the same on every page: the same sofa, the same window, the same rug.

So we stopped painting pages one by one. The story is finished before any picture exists, and a separate planning step, not one of the three story agents, decides how the text splits into pages and what each picture shows. Then a single image model call paints every page together, as one grid, and the pages are cut out of it. Because they were painted together, the cast, the palette and the setting stay very close across the whole book. The cover is painted afterwards, with the grid as its reference, so the child on the front is the child inside.

With one grid the scene stays almost the same on every page. Making it fully the same still takes a few redos, and sometimes a manual fix.

![Page by page versus one grid: painting pages separately lets the child and the room drift from page to page, while painting every page in one grid, cutting the pages from it and painting the cover from it keeps the cast and the setting close throughout](/images/a-storybook-about-anything-she-wants/one-grid-every-page.svg)

### Safe and right for her age

A three-year-old and an eight-year-old need very different stories, and whatever a parent types in, the story has to be safe for a child. The age band shapes every draft, and the judge checks the safety rules.

### People have the last word before print

Before the printed book is made, parents can read it, edit the text and send feedback on any page. Our team reviews every change a parent asks for before the print version. They can redo or edit a single page, repaint the cover, or repaint the whole grid with a note, and then send the updated book back.

### The right model for each part

Behind the scenes, the engine uses several models from Anthropic, Google and OpenAI. Each one does the part it's best at. We didn't guess which is which: we tested them and kept what worked best for our case.

## What I took from it

The model isn't the product. The product is everything around it: the stages that turn one prompt into a good story, the trick that keeps every page looking like the same world, the checks that keep it safe, and the people who have the last word.

And the best review so far is a little girl on the sofa, reading a book about a sparrow that nobody else in the world has.

import type { Text } from '@/lib/texts'

export const texts: Text[] = [
  {
    title: "Stop trying to remember your codebase",
    date: "2026-11-22",
    description: "You can't keep a current model of a large codebase in your head - keep the architecture, have an agent rebuild the local detail before each change, and write down where your checking stopped.",
    href: "/texts/stop-trying-to-remember-your-codebase",
    track: 'craft',
  },

  {
    title: "How I work with agents today",
    date: "2026-11-18",
    description: "I stopped opening a new AI session for every task - now I talk to one agent per project, it keeps the map, and my phone is the inbox.",
    href: "/texts/how-i-work-with-agents-today",
    track: 'ai',
  },

  {
    title: "How to run agentic QA",
    date: "2026-11-15",
    description: "A setup guide for agents that test your app as customers and staff, check the database behind every screen, and attach evidence to every result.",
    href: "/texts/let-agents-test-your-software",
    track: 'ai',
  },

  {
    title: "How I use Grok Bot",
    date: "2026-10-18",
    description: "I set up an executive assistant team with Grok Bot in an afternoon. It's still the most fun I've had with AI.",
    href: "/texts/how-i-use-grok-bot",
    track: 'ai',
  },

  {
    title: "The agent that wrote it doesn't get to say it works",
    date: "2026-08-23",
    description: "Payments don't let the person who creates a payment approve it, and code written by agents needs the same split - one agent writes, another checks the running thing, and the verdict comes from recorded evidence.",
    href: "/texts/the-agent-that-wrote-it-doesnt-get-to-say-it-works",
    track: 'ai',
  },

  {
    title: "How to Build a Double-Entry Ledger for a Payments Product",
    date: "2026-07-27",
    description: "A balance column fails four questions every payments product eventually gets asked - here's the ledger model that answers them: journal entries, one sign convention, three balances, and what to do when a wallet goes negative.",
    href: "/texts/how-to-build-a-double-entry-ledger",
    track: 'money',
  },

  {
    title: "Rounding is a product decision",
    date: "2026-06-29",
    description: "Integer minor units make adding money exact, not dividing it - a 1.5% fee on £9.99 is 14.985p, and somebody has to decide who gets the half penny. Floats, splits, fees, accruals and currency exponents, in C#.",
    href: "/texts/rounding-is-a-product-decision",
    track: 'money',
  },

  {
    title: "What I no longer care about when reviewing code",
    date: "2026-06-01",
    description: "When implementation becomes abundant, review should move from syntax toward consequences - what I spend less time on now, and what gets more of my attention.",
    href: "/texts/what-i-no-longer-care-about-when-reviewing-code",
    track: 'craft',
  },

  {
    title: "How to Actually Read an AI-Sized Diff",
    date: "2026-05-04",
    description: "Human review capacity tops out around 400 lines a sitting - the job now is deciding where those lines go, not pretending you can read everything.",
    href: "/texts/how-to-read-an-ai-sized-diff",
    track: 'ai',
  },

  {
    title: "Totebot: an AI agent platform for e-commerce",
    date: "2026-04-06",
    description: "Totebot lets online stores build and deploy AI shopping assistants that sell and support customers around the clock, across web and chat.",
    href: "/texts/totebot",
    track: 'ai',
    work: true,
  },

  {
    title: "How I Optimized an AI System to Cut Its Bill by 80%",
    date: "2026-03-09",
    description: "A single customer chat cost $5.38 - cutting the bill 80% on the same model came down to the prompt, the cache, and a replay harness that proved it.",
    href: "/texts/the-prompt-is-the-bill",
    track: 'ai',
  },

  {
    title: "Stop Being the Loop",
    date: "2026-02-09",
    description: "Hundreds of Claude agents ported Bun's 960,000 lines of Zig to Rust in six days - the job left for humans is gating the design going in and the diff coming out.",
    href: "/texts/stop-being-the-loop",
    track: 'ai',
  },

  {
    title: "AI is just another abstraction layer",
    date: "2026-01-12",
    description: "Why skipping the foundations of code understanding is never a good idea, even with perfect AI.",
    href: "/texts/ai-is-just-another-abstraction-layer",
    track: 'ai',
  },

  {
    title: "I Use AI Agents as My CMS",
    date: "2025-12-15",
    description: "How I turned Cursor Cloud Agents into my content management system - writing essays from my phone, one conversation at a time.",
    href: "/texts/ai-agent-as-cms",
    track: 'ai',
  },

  {
    title: "Frontend Used to be Simple",
    date: "2025-11-18",
    description: "With great power comes great attack surface.",
    href: "/texts/frontend-used-to-be-simple",
    track: 'craft',
  },

  {
    title: "Why I Run",
    date: "2025-10-21",
    description: "Trail running as a counterbalance to a life lived mostly in abstractions - where silence, climbs, and presence teach lessons that screens never could.",
    href: "/texts/why-i-run",
    track: 'personal',
  },

  {
    title: "Vibecoding, AI, and why programming still matters",
    date: "2025-09-23",
    description: "Exploring the myth of vibecoding and what truly makes engineers high-impact.",
    href: "/texts/vibecoding-is-not-real",
    track: 'ai',
  },

  {
    title: "Secure private key generation and tx signing",
    date: "2025-08-26",
    description: "Best practices for generating and securing private keys, and safely signing blockchain transactions.",
    href: "/texts/secure-pk-generation-and-tx-signing",
    track: 'money',
  },

  {
    title: "My 2025 split marathon",
    date: "2025-07-29",
    description: "Split Marathon 2025 – 3:19:55h finish time",
    href: "/texts/my-2025-marathon",
    track: 'personal',
  },

  {
    title: "Solidity interview questions",
    date: "2025-07-01",
    description: "Answers to RareSkills Solidity interview questions",
    href: "/texts/solidity-interview-questions",
    track: 'money',
  },

  {
    title: "Code is law",
    date: "2025-06-03",
    description: "Immunability is a social construct",
    href: "/texts/code-is-law",
    track: 'money',
  },

  {
    title: "Trump launches meme coin",
    date: "2025-05-07",
    description: "One of the biggest cultural crypto events",
    href: "/texts/trump-lauches-meme-coin",
    track: 'onchain',
  },

  {
    title: "Launching your next NFT collection",
    date: "2025-03-12",
    description: "Execute your next NFT collection launch with no issues",
    href: "/texts/launching-nft-collections",
    track: 'onchain',
  },

  {
    title: "Bored Ape Yacht Club: Smart contract breakdown",
    date: "2025-02-12",
    description: "A technical deep-dive into the BAYC smart contract, examining its ERC721 implementation, security features, and core functionality.",
    href: "/texts/bored-ape-breakdown",
    track: 'onchain',
  },

  {
    title: "Cool things about NEAR protocol",
    date: "2025-01-15",
    description: "An overview of NEAR Protocol's key features including accounts, access keys, gas mechanics and smart contracts.",
    href: "/texts/cool-things-about-near",
    track: 'money',
  },
]

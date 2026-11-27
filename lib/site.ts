export const siteUrl = 'https://www.markomarinovic.com'
export const author = 'Marko Marinovic'

export const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/texts', label: 'Texts' },
] as const

export type ProjectIcon = 'blank' | 'lisk' | 'cicamica' | 'totebot' | 'dobartek' | 'crayonCastle' | 'dotfiles' | 'database' | 'cloud'

export interface Project {
  name: string
  href: string
  desc: string
  icon: ProjectIcon
  tag: string
  meta?: string
}

export const projects: Project[] = [
  {
    name: 'Blank',
    href: 'https://blankhq.co',
    desc: 'Product studio for payments and AI.',
    icon: 'blank',
    tag: 'CTO, co-founder',
  },
  {
    name: 'Lisk',
    href: 'https://lisk.com',
    desc: 'Money operations software for finance teams.',
    icon: 'lisk',
    tag: 'Staff engineer',
  },
  {
    name: 'Cicamica',
    href: 'https://cicamica.hr',
    desc: "Personalized children's storybooks, written and illustrated by AI.",
    icon: 'cicamica',
    tag: 'Product',
  },
  {
    name: 'Totebot',
    href: 'https://totebot.ai',
    desc: 'AI assistants that sell and support inside online stores.',
    icon: 'totebot',
    tag: 'My product',
  },
  {
    name: 'dobartek.hr',
    href: 'https://dobartek.hr',
    desc: "Croatia's largest food-delivery platform.",
    icon: 'dobartek',
    tag: 'Co-founder',
  },
  {
    name: 'tailwindsql',
    href: 'https://github.com/mmarinovic/tailwindsql',
    desc: 'SQL queries written as Tailwind classes.',
    icon: 'database',
    tag: 'Open source',
    meta: '1.3k★',
  },
  {
    name: 'React2AWS',
    href: 'https://github.com/mmarinovic/React2AWS',
    desc: 'AWS infrastructure written like React components.',
    icon: 'cloud',
    tag: 'Open source',
    meta: '443★',
  },
  {
    name: 'Crayon Castle',
    href: 'https://crayon-castle.vercel.app',
    desc: 'A colouring game for kids, built with Effect.',
    icon: 'crayonCastle',
    tag: 'Open source',
  },
  {
    name: '.dotfiles',
    href: 'https://github.com/mmarinovic/.dotfiles',
    desc: 'My Mac setup: apps, dotfiles and Claude skills, managed by one CLI.',
    icon: 'dotfiles',
    tag: 'Open source',
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/mmarinovic' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/markomarinovic/' },
  { label: 'X', href: 'https://x.com/markomarinovic' },
  { label: 'Email', href: 'mailto:marko@blankhq.co' },
]

export const sourceLabel = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export const timeline = [
  'Spent high school playing video games, mostly Guild Wars and World of Warcraft',
  'Wrote my first line of code in high school. HTML and CSS, a button that showed an alert on click, and I was hooked',
  'Wrote most of my high school code on paper, plus some C on an actual computer. For and while loops blew my mind',
  'Went to FESB to study computing',
  'Found ASP.NET MVC and C#. Mind blown, again',
  "Studied databases and was sure I'd end up a database engineer writing SQL all day",
  'Built Authink with a few friends. It won an award at Microsoft Imagine VIP in Russia, then several more',
  'Started pushing code for my university, building products for students',
  'Landed a great internship at an LA company that had opened an office in Croatia',
  'Went from intern to senior lead over a couple of years',
  'Joined a food delivery startup on the side to build their tech',
  "Got a call to build a crypto exchange as a side gig. That's how I found the space, and Ethereum",
  'Built that exchange and got deep into smart contracts and crypto',
  'Went full time on a more serious exchange. Then the funding stopped',
  'Started Blank with friends to bring our freelance work under one roof',
  'Freelanced for a Swiss carsharing company',
  'NFTs happened. Launched a bunch of collections',
  'Worked on DeFi, then got a call to build a token integration for a crypto casino',
  'AI was starting to be a thing. Built a GPU lending marketplace and an AI apps marketplace',
  'Kept working in fintech, traditional and crypto',
  'Stablecoins are cool, so I joined Lisk. Still there now',
  'These days I mostly think about AI in fintech, and about using swarms of agents to build software crazy fast',
  'Crypto is still cool',
  'Ran a couple of marathons, best 3:18',
]

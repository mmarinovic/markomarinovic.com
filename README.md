# markomarinovic.com

The source of [markomarinovic.com](https://markomarinovic.com): my personal site and the texts I write. Next.js 16, React 19 and Tailwind CSS 4, deployed on Vercel.

## Run it

```
bun install
bun dev
```

`bun run build` makes the production build and `bun run lint` runs Oxlint.

## Layout

- `app/` - routes: home, work, the text index and one page per text
- `components/` - grouped by feature: `layout`, `theme`, `ui`, `texts`, `work`
- `lib/` - site data, text helpers and the theme script
- `texts/` - one markdown file per text, listed in `texts/index.ts`

## Adding a text

1. Write `texts/<slug>.md` with `title`, `date` and `description` frontmatter.
2. Add an entry to `texts/index.ts`. Set `draft: true` to keep it off the site; `bun dev` still shows it.

## License

The code is MIT, see [LICENSE](LICENSE). The texts in `texts/` and the images in `public/` are mine and not covered by that license: please don't republish them without asking.

## Contact

- Email: marko@blankhq.co
- GitHub: [@mmarinovic](https://github.com/mmarinovic)
- LinkedIn: [markomarinovic](https://www.linkedin.com/in/markomarinovic/)
- X: [@markomarinovic](https://x.com/markomarinovic)

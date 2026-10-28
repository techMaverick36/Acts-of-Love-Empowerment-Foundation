# Acts of Love Empowerment Foundation — Website

React 19 + TypeScript + Vite + Tailwind CSS v4. Public pages are prerendered to
static HTML at build time (for search engines and link previews), then run as a
normal single-page app in the browser. The blog and its admin use Supabase.

## Getting started

```bash
npm install
cp .env.example .env   # fill in the EmailJS + Supabase keys
npm run dev            # http://localhost:5173
```

| Script            | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload (no prerendering).                        |
| `npm run build`   | Type-check, build, then prerender every page into `dist/`.           |
| `npm run preview` | Serve `dist/` locally to check a production build.                  |
| `npm run lint`    | ESLint.                                                              |

## Project structure

```
src/
  main.tsx               Browser entry (BrowserRouter)
  entry-server.tsx       Build-time renderer used by scripts/prerender.mjs
  App.tsx                All routes
  index.css              Design tokens (colours, fonts) + a few global styles

  config/
    site.ts              Organisation details, contact info, socials, navigation
    seo.ts               Title / description / share image for every page

  pages/                 One file per route — composes components, holds page copy
    admin/               Blog admin (lazy-loaded, never sent to public visitors)

  components/
    ui/                  Generic building blocks (Button, Card, Badge, Modal, …)
    layout/              Page shell: Navbar, Footer, PageLayout, PageHero, Section, CtaBand
    forms/               Field inputs and the shared DonationForm
    blog/                BlogCard, PostBody, ShareBar
    home/                HeroSlider
    contact/             ContactMap (Leaflet, lazy-loaded)
    seo/                 Seo (<head> tags + JSON-LD)
    admin/               Admin-only pieces (rich-text editors, route guard)

  hooks/                 useEmailForm, useIsClient
  lib/                   Non-UI code: Supabase, posts API, email, sanitizing, structured data
  data/                  Shared types and option lists (blog types, donation options)
  context/               AuthContext (admin sign-in)

scripts/prerender.mjs    Prerender step (see "SEO" below)
supabase/                Database schema + setup guide for the blog
public/                  Static files served as-is (images, logo, robots.txt)
```

## Conventions

- **Never hard-code colours.** Use the tokens in `src/index.css` as Tailwind classes:
  `text-brand-blue`, `bg-brand-red`, `bg-surface`, `text-body`, `text-muted`, `border-line`, …
  For per-item accent colours (program areas), set a `--accent` CSS variable and use
  `bg-(--accent)` / `text-(--accent)`; `IconTile`, `Button variant="accent"` and friends read it.
- **Never build a button by hand.** Use `Button` (text) or `IconButton` (icon only, requires
  a `label`). Icons come from `react-icons` via the `icon` / `trailingIcon` props.

  ```tsx
  <Button to="/donate">Donate Now</Button>                                   // router link
  <Button href="https://…" target="_blank">Open</Button>                     // external link
  <Button variant="outline-light" trailingIcon={FiArrowRight}>Partner</Button>
  <Button type="submit" fullWidth disabled={sending}>Send Message</Button>
  <Button variant="link" trailingIcon={FiArrowRight}>Our Full Story</Button>
  <IconButton icon={FiTrash2} label="Delete" tone="danger" onClick={…} />
  ```

  Variants: `primary` (red), `secondary` (blue), `accent`, `outline`, `outline-light`,
  `subtle`, `link`, `link-red`, `ghost`. Sizes: `sm`, `md`, `lg`.
- **A new page** = `src/pages/X.tsx` wrapped in `<PageLayout seo={PAGES.x}>`, usually starting
  with `<PageHero>` and built from `<Section>` + `<SectionHeading>`. Add its route in `App.tsx`
  and its metadata in `src/config/seo.ts` — it is then prerendered and added to the sitemap.
- **Contact details / social links / nav items** live only in `src/config/site.ts`.
- `className` is appended, not merged, so don't pass classes that conflict with a
  component's own (e.g. a second padding or `display`); add a prop or variant instead.
- Files use tabs; components are one per file, default-exported.

## SEO

- `npm run build` runs `scripts/prerender.mjs`, which renders each page to its own HTML file
  (`about.html`, `blog/<slug>.html`, …) containing the full content, a unique title and
  description, canonical URL, Open Graph/Twitter tags and schema.org JSON-LD
  (organisation, FAQ, blog posts, breadcrumbs). In the browser React takes over as usual.
- Published blog posts are fetched from Supabase during the build. **Posts published after a
  deploy still work** (they render in the browser) but only get static HTML and a sitemap
  entry on the next deploy — trigger a redeploy after publishing (a Netlify build hook is ideal).
- The build also writes `dist/sitemap.xml` and `dist/_redirects` (Netlify routing: each page
  → its HTML file, `/admin` and new posts → the app shell, anything else → a real 404).
- `robots.txt` (in `public/`) blocks `/admin` and `/checkout`; those pages are also `noindex`.

## Forms (EmailJS)

The contact form (`pages/Contact.tsx`) and volunteer form (`pages/GetInvolved.tsx`) send
through one EmailJS template via `useEmailForm`. The template should use these variables:

| Variable  | Sent by                      |
| --------- | ---------------------------- |
| `name`    | both                         |
| `email`   | both                         |
| `message` | both                         |
| `phone`   | volunteer form               |
| `role`    | volunteer form ("Not specified" if empty) |
| `subject` | contact form ("General Enquiry" if empty) |

Mark variables a form doesn't send as optional in the EmailJS template. Restart the dev
server after changing `.env`.

## Blog admin

See [`supabase/README.md`](./supabase/README.md) for the one-time database setup. Admins sign
in at `/admin/login`.

**Keep-alive:** Supabase's free plan pauses a project after 7 days without activity, which
takes the blog offline. `.github/workflows/supabase-keepalive.yml` reads one post every Monday
and Thursday to prevent that. It needs the `SUPABASE_URL` and `SUPABASE_ANON_KEY` repository
secrets (same values as the `VITE_` ones). If a run fails, GitHub emails the repo owner;
the usual cause is that the project is already paused — restore it in the Supabase dashboard.

## Deploying (Netlify)

`netlify.toml` sets the build command (`npm run build`) and publish directory (`dist`).
Set the five `VITE_*` variables from `.env.example` in Netlify's environment settings.

# Blog admin — Supabase setup

The blog is backed by Supabase (Postgres + Auth + Storage). Follow these steps once.

## 1. Create a project
- Go to [supabase.com](https://supabase.com) → **New project**.
- Wait for it to finish provisioning.

## 2. Add your keys to `.env`
- In the dashboard: **Project Settings → API**.
- Copy **Project URL** and the **anon / public** key into the project's `.env`:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

- Restart the dev server after editing `.env` (`npm run dev`).
- The anon key is safe to expose in the frontend — access is controlled by the
  Row Level Security policies created in the next step.

## 3. Create the database + storage
- Dashboard → **SQL Editor → New query**.
- Paste the contents of [`schema.sql`](./schema.sql) and click **Run**.
- This creates the `posts` table, security policies, the `blog-images`
  storage bucket, and (optionally) seeds the first Kibuli story.

## 4. Create your admin account
There is **no public sign-up** — you add admins yourself:
- Dashboard → **Authentication → Users → Add user**.
- Enter an email + password, and tick **Auto Confirm User** (so it can log in immediately).
- Repeat for any other admins.

## 5. Sign in and write
- Visit `/admin/login` on the site, sign in, and you're in the dashboard.
- **New Post** opens the editor: fill in the fields, upload a cover image,
  add body blocks (paragraph / heading / list / image / quote), and **Save**.
- Uncheck **Published** to keep something as a draft (hidden from the public site).

## Notes

- For an existing database, run [`post-impact-stats.sql`](./post-impact-stats.sql)
  once before saving posts with this version of the editor.
- Each post has an optional **Impact stats** list in the editor. Add a value
  (such as `130+`) and label for each result, then save the post. Removing all
  rows hides its impact card. Existing posts have no stats until entered;
  the previous shared numbers are not copied into individual stories.
- Public blog pages (`/blog`, `/blog/:slug`) read **published** posts only.
- Uploaded images are stored in the `blog-images` bucket and served via public URLs.
- Existing `/public/*.jpg` paths still work as image values (used by the seed).

-- ============================================================
-- Acts of Love Empowerment Foundation — Blog backend (Supabase)
-- Run this whole file in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================================

-- 1. POSTS TABLE ---------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  category     text not null,
  title        text not null,
  excerpt      text,
  image        text,
  date         date not null default current_date,
  author_name  text not null default 'Acts of Love Team',
  author_role  text,
  author_avatar text,
  read_time    text,
  body         jsonb not null default '[]'::jsonb,
  impact_stats jsonb not null default '[]'::jsonb,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Also update installations created before per-post stats were added.
alter table public.posts
  add column if not exists impact_stats jsonb not null default '[]'::jsonb;

-- keep updated_at fresh on every update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- 2. ROW LEVEL SECURITY --------------------------------------
alter table public.posts enable row level security;

-- Anyone (anon) may read published posts
drop policy if exists "Public reads published posts" on public.posts;
create policy "Public reads published posts"
  on public.posts for select
  using (published = true);

-- Signed-in admins may read every post (incl. drafts) and write
drop policy if exists "Admins read all posts" on public.posts;
create policy "Admins read all posts"
  on public.posts for select to authenticated using (true);

drop policy if exists "Admins insert posts" on public.posts;
create policy "Admins insert posts"
  on public.posts for insert to authenticated with check (true);

drop policy if exists "Admins update posts" on public.posts;
create policy "Admins update posts"
  on public.posts for update to authenticated using (true) with check (true);

drop policy if exists "Admins delete posts" on public.posts;
create policy "Admins delete posts"
  on public.posts for delete to authenticated using (true);

-- 3. STORAGE BUCKET FOR IMAGES -------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "Public reads blog images" on storage.objects;
create policy "Public reads blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

drop policy if exists "Admins upload blog images" on storage.objects;
create policy "Admins upload blog images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists "Admins update blog images" on storage.objects;
create policy "Admins update blog images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

drop policy if exists "Admins delete blog images" on storage.objects;
create policy "Admins delete blog images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images');

-- 4. SEED THE FIRST STORY (optional) -------------------------
-- Uses existing images from the site's /public folder so the blog
-- isn't empty after switching to Supabase. Delete this block if unwanted.
insert into public.posts
  (slug, category, title, excerpt, image, date, author_name, author_role, read_time, body, published)
values (
  'first-outreach-police-children-school-kibuli',
  'Field Stories',
  'Our First Outreach: 50 Children Equipped for School in Kibuli',
  'In April 2026 we walked through the gates of the Police Children School in Kibuli for our very first mission — and left with a clear sense of the work ahead.',
  '/D-4231r_18.jpg',
  '2026-04-18',
  'Team Lead',
  'Led the Kibuli outreach',
  '4 min read',
  $json$[
    {"type":"p","text":"There is a particular quiet that settles over a classroom when children are handed something that is truly theirs. In April 2026, at the Police Children School in Kibuli, Wakiso District, we watched fifty children open packages of exercise books, pens, pencils, and mathematical sets — and that quiet was the first thing we noticed."},
    {"type":"p","text":"It was our first outreach mission as a foundation, and we had spent weeks preparing. But no amount of planning quite prepares you for the moment a child who has been sharing a single pencil suddenly has a full set of their own."},
    {"type":"image","src":"/D-4231r_54.jpg","caption":"Pupils at the Police Children School in Kibuli with their new learning materials.","align":"full"},
    {"type":"h2","text":"Why scholastic materials matter"},
    {"type":"image","src":"/D-4231r_41.jpg","caption":"Inside a classroom at the Police Children School, Kibuli.","align":"right"},
    {"type":"p","text":"For families stretched thin, the cost of basic learning supplies is often the difference between a child attending school and staying home. A missing exercise book is rarely just a missing book — it is a missed lesson, a lower mark, and slowly, a lost sense that school is a place where you belong."},
    {"type":"ul","items":["Exercise books for every core subject","Pens, pencils, and mathematical sets","Rulers and other daily classroom supplies","Enough for a full term of steady learning"]},
    {"type":"p","text":"By meeting that need directly, we remove one of the smallest but most persistent barriers to a child's education. It is not dramatic work. It is steady, practical, and it changes what a school day feels like."},
    {"type":"quote","text":"No amount of planning prepares you for the moment a child who has been sharing a single pencil suddenly has a full set of their own."},
    {"type":"h2","text":"What we learned"},
    {"type":"image","src":"/IMG_0934.jpg","caption":"Volunteers handing out exercise books and pens to pupils.","align":"full"},
    {"type":"p","text":"Our work starts with listening, and this first mission taught us to listen more closely. Teachers told us which supplies ran out fastest. Parents told us what a term's worth of materials would mean for their household budget. Those conversations now shape how we plan every outreach that follows."},
    {"type":"image","src":"/D-4231r_30.jpg","caption":"Every mission teaches us how to serve the next community better.","align":"right"},
    {"type":"p","text":"Fifty children is a beginning, not a finish line. But it is a real beginning — and we are grateful to everyone who helped make it possible."}
  ]$json$::jsonb,
  true
)
on conflict (slug) do nothing;

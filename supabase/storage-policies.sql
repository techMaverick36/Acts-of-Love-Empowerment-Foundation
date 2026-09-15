-- ============================================================
-- Acts of Love — Storage policies for the blog-images bucket
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
--
-- Fixes: image upload failing with
--   "new row violates row-level security policy"
--
-- Cause: a Storage bucket has row-level security ON by default. If it
-- has no INSERT policy, EVERY upload is denied — even for signed-in
-- admins. This adds the missing policies. Safe to re-run.
-- ============================================================

-- 1. Make sure the bucket exists and is publicly readable.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

-- 2. Anyone may READ objects in this bucket (public images).
drop policy if exists "Public reads blog images" on storage.objects;
create policy "Public reads blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- 3. Signed-in admins may UPLOAD (this is the one that was missing).
drop policy if exists "Admins upload blog images" on storage.objects;
create policy "Admins upload blog images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images');

-- 4. Signed-in admins may REPLACE / OVERWRITE.
drop policy if exists "Admins update blog images" on storage.objects;
create policy "Admins update blog images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

-- 5. Signed-in admins may DELETE.
drop policy if exists "Admins delete blog images" on storage.objects;
create policy "Admins delete blog images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images');

-- Verify — should list the four policies above:
--   select policyname, cmd, roles
--   from pg_policies
--   where schemaname = 'storage' and tablename = 'objects'
--   order by policyname;

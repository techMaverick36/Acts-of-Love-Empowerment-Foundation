-- Run once in the Supabase SQL editor for an existing installation.
-- Existing posts start with no stats; editors enter verified results per story.
alter table public.posts
  add column if not exists impact_stats jsonb not null default '[]'::jsonb;

notify pgrst, 'reload schema';

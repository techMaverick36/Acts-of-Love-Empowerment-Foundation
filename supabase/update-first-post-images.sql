-- ============================================================
-- Add more in-body images to the first Kibuli story.
-- Run this in the Supabase SQL Editor ONLY if you already seeded the
-- post (so schema.sql's "on conflict do nothing" left it unchanged).
--
-- ⚠ This overwrites the post's body with the version below. If you have
-- edited the story in the admin editor, make those image edits there
-- instead of running this (this would discard those edits).
-- ============================================================

update public.posts
set body = $json$[
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
  ]$json$::jsonb
where slug = 'first-outreach-police-children-school-kibuli';

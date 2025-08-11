create table blog_posts (
  "id" uuid primary key default gen_random_uuid(),
  "slug" varchar,
  "title" varchar,
  "author" varchar,
  "mainImageUrl" text,
  "description" text,
  "content" text,
  "updatedAt" timestamptz default now(),
  "createdAt" timestamptz default now()
);

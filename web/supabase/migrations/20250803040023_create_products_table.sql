create table products (
    "id" uuid primary key default gen_random_uuid(),
    "stripePriceId" varchar,
    "name" varchar,
    "price" int4,
    "assetUrl" text,
    "description" text,
    "updatedAt" timestamptz default now(),
    "createdAt" timestamptz default now()
);
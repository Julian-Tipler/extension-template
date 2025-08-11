-- Create the plans table
create table plans (
    "id" uuid primary key default gen_random_uuid(),
    "stripePriceId" varchar,
    "name" varchar,
    "price" int4,
    "description" text,
    "features" jsonb,
    "color" text,
    "updatedAt" timestamptz default now(),
    "createdAt" timestamptz default now()
);
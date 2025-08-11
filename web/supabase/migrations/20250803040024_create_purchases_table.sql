create table purchases (
  "id" uuid primary key default gen_random_uuid(),
  "userId" uuid not null references public.users(id) on delete cascade,
  "productId" uuid not null references products(id),
  "stripePurchaseId" varchar,
  "status" text not null check ("status" in ('active', 'unpaid')),
  "updatedAt" timestamptz default now(),
  "createdAt" timestamptz default now()
);
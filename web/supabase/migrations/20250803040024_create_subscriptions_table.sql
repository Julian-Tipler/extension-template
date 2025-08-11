create table subscriptions (
  "id" uuid primary key default gen_random_uuid(),

  "userId" uuid not null references public.users(id) on delete cascade,
  "planId" uuid not null references plans(id),

  "stripeSubscriptionId" varchar,

  "status" text not null check ("status" in ('active', 'canceled', 'trialing', 'unpaid')),

  "trialEnd" timestamptz,
  "subscriptionExpiry" timestamptz,
  "lastPaymentAt" timestamptz,


  "updatedAt" timestamptz default now(),
  "createdAt" timestamptz default now()
);
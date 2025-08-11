create table public.users (
  "id" uuid primary key references auth.users(id) on delete cascade,
  "email" text unique not null,
  "goodWebsites" text[] default '{}'::text[],
  "badWebsites" text[] default '{}'::text[],
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- Function to create public.users entry
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to run after insert on auth.users
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();
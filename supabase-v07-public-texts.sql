-- Writing Empire v0.7: shared public text library
create table if not exists public.public_texts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  content text not null check (char_length(content) between 1 and 20000),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.public_texts enable row level security;
drop policy if exists "Anyone can read public texts" on public.public_texts;
create policy "Anyone can read public texts" on public.public_texts
  for select to anon, authenticated using (true);
drop policy if exists "Admins can publish public texts" on public.public_texts;
create policy "Admins can publish public texts" on public.public_texts
  for insert to authenticated
  with check (auth.uid() = created_by and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins can delete public texts" on public.public_texts;
create policy "Admins can delete public texts" on public.public_texts
  for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- API permissions; row-level security above still restricts who may publish/delete.
grant select on public.public_texts to anon, authenticated;
grant insert, delete on public.public_texts to authenticated;

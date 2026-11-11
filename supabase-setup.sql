-- Writing Empire: Supabase setup
-- Run once in Supabase Dashboard -> SQL Editor.

create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  game_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.player_saves enable row level security;

drop policy if exists "Players can read their own save" on public.player_saves;
create policy "Players can read their own save"
  on public.player_saves for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Players can insert their own save" on public.player_saves;
create policy "Players can insert their own save"
  on public.player_saves for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Players can update their own save" on public.player_saves;
create policy "Players can update their own save"
  on public.player_saves for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Players can delete their own save" on public.player_saves;
create policy "Players can delete their own save"
  on public.player_saves for delete to authenticated
  using (auth.uid() = user_id);

-- Run as project owner after registering your account to grant admin:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'DEINE-LOGIN-E-MAIL';
-- The app checks app_metadata.role. Never use user_metadata for admin authorization.

-- Community texts: everyone can read published texts; only admins can publish or delete.
create table if not exists public.public_texts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.public_texts enable row level security;

drop policy if exists "Anyone can read public texts" on public.public_texts;
create policy "Anyone can read public texts"
  on public.public_texts for select to anon, authenticated
  using (true);

drop policy if exists "Admins can publish public texts" on public.public_texts;
create policy "Admins can publish public texts"
  on public.public_texts for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete public texts" on public.public_texts;
create policy "Admins can delete public texts"
  on public.public_texts for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

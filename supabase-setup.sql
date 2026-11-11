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

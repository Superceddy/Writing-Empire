-- Writing Empire v0.4: sichere Tabelle für persönliche Spielstände
create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  game_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.player_saves enable row level security;

-- Nutzer dürfen ausschließlich den eigenen Spielstand lesen.
create policy "Players can read own save"
on public.player_saves
for select
using (auth.uid() = user_id);

-- Nutzer dürfen ausschließlich den eigenen Spielstand anlegen.
create policy "Players can insert own save"
on public.player_saves
for insert
with check (auth.uid() = user_id);

-- Nutzer dürfen ausschließlich den eigenen Spielstand aktualisieren.
create policy "Players can update own save"
on public.player_saves
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Nutzer dürfen ausschließlich den eigenen Spielstand löschen.
create policy "Players can delete own save"
on public.player_saves
for delete
using (auth.uid() = user_id);

-- Fii Polițist.Ro — baza de date pentru utilizatori și progres
-- Rulează acest script în Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  exam_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_key text not null,
  mode text not null default 'test',
  total_questions integer not null default 0,
  correct_answers integer not null default 0,
  score numeric(6,2),
  duration_seconds integer,
  completed_at timestamptz not null default now()
);

create table if not exists public.question_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.test_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  subject_id text,
  chapter text,
  selected_answer text,
  correct boolean not null default false,
  answered_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_key text not null,
  subject_id text not null,
  questions_answered integer not null default 0,
  correct_answers integer not null default 0,
  tests_completed integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, exam_key, subject_id)
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.wrong_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  last_answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'inactive',
  plan text,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists idx_attempts_user_completed on public.test_attempts(user_id, completed_at desc);
create index if not exists idx_answers_user on public.question_answers(user_id);
create index if not exists idx_progress_user_exam on public.user_progress(user_id, exam_key);
create index if not exists idx_wrong_user on public.wrong_questions(user_id);

-- RLS: fiecare utilizator își poate vedea/modifica doar datele proprii.
alter table public.profiles enable row level security;
alter table public.test_attempts enable row level security;
alter table public.question_answers enable row level security;
alter table public.user_progress enable row level security;
alter table public.favorites enable row level security;
alter table public.wrong_questions enable row level security;
alter table public.subscriptions enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "attempts own rows" on public.test_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "answers own rows" on public.question_answers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress own rows" on public.user_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "favorites own rows" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "wrong own rows" on public.wrong_questions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "subscriptions own rows" on public.subscriptions for select using (auth.uid() = user_id);

-- Creează automat profilul când apare un utilizator nou în Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

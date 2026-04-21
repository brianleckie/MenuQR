-- ═══════════════════════════════════════════════════════════════
--  MenuQR — Schema completo con RLS
--  Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════

-- ── Extensiones ──────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 1. businesses ────────────────────────────────────────────────
-- Cada fila = un restaurante. El dueño es el auth.uid() que lo creó.
create table public.businesses (
  id            uuid primary key default uuid_generate_v4(),
  owner_id      uuid not null references auth.users(id) on delete cascade,
  slug          text not null unique,           -- URL-friendly, ej: "la-estancia"
  name          text not null,
  tagline       text,
  logo_url      text,                           -- Cloudinary URL
  cover_url     text,                           -- Cloudinary URL
  primary_color text not null default '#D4622A',
  whatsapp      text,                           -- "595981234567"
  address       text,
  hours         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- ── 2. categories ────────────────────────────────────────────────
create table public.categories (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name        text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ── 3. items ─────────────────────────────────────────────────────
create table public.items (
  id          uuid primary key default uuid_generate_v4(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  name        text not null,
  short_desc  text,
  description text,
  price       numeric(10, 0) not null check (price >= 0),
  image_url   text,                             -- Cloudinary URL
  available   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Índices ───────────────────────────────────────────────────────
create index idx_businesses_owner  on public.businesses(owner_id);
create index idx_businesses_slug   on public.businesses(slug);
create index idx_categories_biz    on public.categories(business_id);
create index idx_items_biz         on public.items(business_id);
create index idx_items_category    on public.items(category_id);

-- ── Trigger updated_at ───────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_businesses_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

create trigger trg_items_updated_at
  before update on public.items
  for each row execute function public.set_updated_at();

-- ═══════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY (RLS)
--
--  Analogía Python: es como tener un middleware en FastAPI que
--  filtra automáticamente TODOS los queries según el usuario
--  logueado — no hace falta filtrar a mano en el código.
--
--  La regla de oro:
--    • Vista pública → cualquiera puede leer (SELECT)
--    • Escritura     → solo el dueño (INSERT/UPDATE/DELETE)
-- ═══════════════════════════════════════════════════════════════

alter table public.businesses enable row level security;
alter table public.categories  enable row level security;
alter table public.items       enable row level security;

-- ── businesses policies ──────────────────────────────────────────

-- Cualquiera puede leer cualquier negocio (necesario para /menu/:slug)
create policy "businesses: public read"
  on public.businesses for select
  using (true);

-- Solo el dueño puede insertar su negocio
create policy "businesses: owner insert"
  on public.businesses for insert
  with check (auth.uid() = owner_id);

-- Solo el dueño puede editar su negocio
create policy "businesses: owner update"
  on public.businesses for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Solo el dueño puede eliminar su negocio
create policy "businesses: owner delete"
  on public.businesses for delete
  using (auth.uid() = owner_id);

-- ── categories policies ──────────────────────────────────────────

create policy "categories: public read"
  on public.categories for select
  using (true);

create policy "categories: owner write"
  on public.categories for insert
  with check (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

create policy "categories: owner update"
  on public.categories for update
  using (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

create policy "categories: owner delete"
  on public.categories for delete
  using (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

-- ── items policies ───────────────────────────────────────────────

create policy "items: public read"
  on public.items for select
  using (true);

create policy "items: owner write"
  on public.items for insert
  with check (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

create policy "items: owner update"
  on public.items for update
  using (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

create policy "items: owner delete"
  on public.items for delete
  using (
    auth.uid() = (
      select owner_id from public.businesses where id = business_id
    )
  );

-- ═══════════════════════════════════════════════════════════════
--  Datos de ejemplo — LA ESTANCIA (opcional, para testear)
--  Reemplazá <TU_USER_ID> con tu auth.users.id real
-- ═══════════════════════════════════════════════════════════════

/*
insert into public.businesses (owner_id, slug, name, tagline, primary_color, whatsapp, address, hours)
values (
  '<TU_USER_ID>',
  'la-estancia',
  'La Estancia',
  'Cocina paraguaya con alma',
  '#D4622A',
  '595981234567',
  'Mcal. López 1250, Asunción',
  'Lun–Sáb 11:00–23:00 · Dom 11:00–16:00'
);
*/

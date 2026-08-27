begin;

create table if not exists public.catalogos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nome text not null,
  tipo text not null default 'catalogo',
  ativo boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catalogo_usuarios (
  catalogo_id uuid not null references public.catalogos(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  papel text not null default 'editor' check (papel in ('owner','editor')),
  created_at timestamptz not null default now(),
  primary key (catalogo_id, user_id)
);

create table if not exists public.catalogo_itens (
  id uuid primary key default gen_random_uuid(),
  catalogo_id uuid not null references public.catalogos(id) on delete cascade,
  titulo text not null,
  subtitulo text,
  descricao text,
  imagem_url text not null default '',
  link_principal text,
  link_secundario text,
  preco numeric(12,2),
  categoria text,
  destaque boolean not null default false,
  ativo boolean not null default true,
  ordem integer not null default 0,
  extras jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalogo_itens_catalogo_ordem_idx on public.catalogo_itens (catalogo_id, ordem);
create index if not exists catalogo_usuarios_user_idx on public.catalogo_usuarios (user_id);

alter table public.catalogos enable row level security;
alter table public.catalogo_usuarios enable row level security;
alter table public.catalogo_itens enable row level security;

revoke all on table public.catalogos from anon, authenticated;
revoke all on table public.catalogo_usuarios from anon, authenticated;
revoke all on table public.catalogo_itens from anon, authenticated;

grant select on table public.catalogos to anon, authenticated;
grant select on table public.catalogo_usuarios to authenticated;
grant select on table public.catalogo_itens to anon, authenticated;
grant insert, update, delete on table public.catalogo_itens to authenticated;

drop policy if exists "catalogos_public_or_member_read" on public.catalogos;
create policy "catalogos_public_or_member_read"
on public.catalogos for select
to anon, authenticated
using (
  ativo = true
  or exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogos.id
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_usuarios_read_own" on public.catalogo_usuarios;
create policy "catalogo_usuarios_read_own"
on public.catalogo_usuarios for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "catalogo_itens_public_read" on public.catalogo_itens;
create policy "catalogo_itens_public_read"
on public.catalogo_itens for select
to anon
using (
  ativo = true
  and exists (
    select 1 from public.catalogos c
    where c.id = catalogo_itens.catalogo_id and c.ativo = true
  )
);

drop policy if exists "catalogo_itens_member_read" on public.catalogo_itens;
create policy "catalogo_itens_member_read"
on public.catalogo_itens for select
to authenticated
using (
  ativo = true
  or exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogo_itens.catalogo_id
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_itens_member_insert" on public.catalogo_itens;
create policy "catalogo_itens_member_insert"
on public.catalogo_itens for insert
to authenticated
with check (
  exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogo_itens.catalogo_id
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_itens_member_update" on public.catalogo_itens;
create policy "catalogo_itens_member_update"
on public.catalogo_itens for update
to authenticated
using (
  exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogo_itens.catalogo_id
      and cu.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogo_itens.catalogo_id
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_itens_member_delete" on public.catalogo_itens;
create policy "catalogo_itens_member_delete"
on public.catalogo_itens for delete
to authenticated
using (
  exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogo_itens.catalogo_id
      and cu.user_id = (select auth.uid())
  )
);

insert into storage.buckets (id, name, public)
values ('catalogo-media', 'catalogo-media', true)
on conflict (id) do update set public = true;

drop policy if exists "catalogo_media_public_read" on storage.objects;
create policy "catalogo_media_public_read"
on storage.objects for select
to public
using (bucket_id = 'catalogo-media');

drop policy if exists "catalogo_media_member_insert" on storage.objects;
create policy "catalogo_media_member_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'catalogo-media'
  and exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id::text = (storage.foldername(name))[1]
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_media_member_update" on storage.objects;
create policy "catalogo_media_member_update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'catalogo-media'
  and exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id::text = (storage.foldername(name))[1]
      and cu.user_id = (select auth.uid())
  )
)
with check (
  bucket_id = 'catalogo-media'
  and exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id::text = (storage.foldername(name))[1]
      and cu.user_id = (select auth.uid())
  )
);

drop policy if exists "catalogo_media_member_delete" on storage.objects;
create policy "catalogo_media_member_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'catalogo-media'
  and exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id::text = (storage.foldername(name))[1]
      and cu.user_id = (select auth.uid())
  )
);

insert into public.catalogos (slug, nome, tipo, config)
values (
  'new-rocket-play',
  'New Rocket Play',
  'assessorados',
  '{"labels":{"titulo":"Nome artístico","subtitulo":"Função","link_principal":"Instagram","link_secundario":"Vídeo / Reel"},"campos":{"preco":false,"categoria":false,"descricao":false,"destaque":false}}'::jsonb
)
on conflict (slug) do update set
  nome = excluded.nome,
  tipo = excluded.tipo,
  config = excluded.config,
  ativo = true,
  updated_at = now();

insert into public.catalogo_itens (
  catalogo_id, titulo, subtitulo, imagem_url, link_principal, link_secundario, ativo, ordem
)
select c.id, seed.titulo, seed.subtitulo, seed.imagem_url, seed.link_principal, seed.link_secundario, true, seed.ordem
from public.catalogos c
cross join (values
  ('Diego Marçal', 'Cantor / Preletor', '/assets/img/diegomarcal.jpeg', null::text, 'https://www.instagram.com/reel/DXH3Vx2j_8y/?igsh=MnhqN3A1cmptdHR5', 1),
  ('Paloma César', 'Preletora', '/assets/img/Paloma%20C%C3%A9sar.jpeg', null::text, null::text, 2),
  ('Tainah Oliver', 'Cantora', '/assets/img/Tainah%20Oliver.jpeg', null::text, null::text, 3),
  ('Eduardo Silva', 'Cantor', '/assets/img/Eduardo%20Silva.jpeg', null::text, null::text, 4),
  ('Irmãs Miguel', 'Dupla', '/assets/img/Irm%C3%A3s%20Miguel.jpeg', null::text, null::text, 5),
  ('Marilene e Gabriela', 'Dupla', '/assets/img/Marilene%20e%20Gabriela.jpeg', null::text, null::text, 6),
  ('Natanael Santos', 'Preletor', '/assets/img/Natanael%20Santos.jpeg', null::text, null::text, 7)
) as seed(titulo, subtitulo, imagem_url, link_principal, link_secundario, ordem)
where c.slug = 'new-rocket-play'
  and not exists (
    select 1 from public.catalogo_itens ci where ci.catalogo_id = c.id
  );

commit;

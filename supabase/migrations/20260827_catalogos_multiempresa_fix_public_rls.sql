drop policy if exists "catalogos_public_or_member_read" on public.catalogos;

drop policy if exists "catalogos_public_read" on public.catalogos;
create policy "catalogos_public_read"
on public.catalogos for select
to anon
using (ativo = true);

drop policy if exists "catalogos_authenticated_read" on public.catalogos;
create policy "catalogos_authenticated_read"
on public.catalogos for select
to authenticated
using (
  ativo = true
  or exists (
    select 1 from public.catalogo_usuarios cu
    where cu.catalogo_id = catalogos.id
      and cu.user_id = (select auth.uid())
  )
);

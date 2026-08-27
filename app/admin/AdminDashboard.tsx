"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { CatalogoItem } from "@/lib/catalogo";

type FormState = {
  nome: string;
  funcao: string;
  foto_url: string;
  instagram_url: string;
  video_url: string;
  ativo: boolean;
  ordem: number;
};

const emptyForm: FormState = {
  nome: "",
  funcao: "",
  foto_url: "",
  instagram_url: "",
  video_url: "",
  ativo: true,
  ordem: 0,
};

export default function AdminDashboard({ email, catalogoId }: { email: string; catalogoId: string }) {
  const supabase = createClient();
  const [items, setItems] = useState<CatalogoItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  async function loadItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from("catalogo_itens")
      .select("id,catalogo_id,titulo,subtitulo,descricao,imagem_url,link_principal,link_secundario,preco,categoria,destaque,ativo,ordem,extras")
      .eq("catalogo_id", catalogoId)
      .order("ordem", { ascending: true });

    if (error) setMessage(error.message);
    else setItems((data ?? []) as CatalogoItem[]);
    setLoading(false);
  }

  useEffect(() => { void loadItems(); }, [catalogoId]);

  const visibleItems = useMemo(() => {
    const value = query.toLocaleLowerCase("pt-BR").trim();
    if (!value) return items;
    return items.filter((item) => `${item.titulo} ${item.subtitulo ?? ""}`.toLocaleLowerCase("pt-BR").includes(value));
  }, [items, query]);

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, ordem: items.length + 1 });
    setMessage("");
    setDrawerOpen(true);
  }

  function startEdit(item: CatalogoItem) {
    setEditingId(item.id);
    setForm({
      nome: item.titulo,
      funcao: item.subtitulo ?? "",
      foto_url: item.imagem_url,
      instagram_url: item.link_principal ?? "",
      video_url: item.link_secundario ?? "",
      ativo: item.ativo,
      ordem: item.ordem,
    });
    setMessage("");
    setDrawerOpen(true);
  }

  async function uploadImage(file: File) {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) throw new Error("Use uma imagem JPG, PNG ou WebP.");
    if (file.size > 5 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 5 MB.");

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${catalogoId}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("catalogo-media").upload(path, file, { upsert: false });
    if (error) throw error;

    const { data } = supabase.storage.from("catalogo-media").getPublicUrl(path);
    setForm((current) => ({ ...current, foto_url: data.publicUrl }));
  }

  async function saveItem(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      catalogo_id: catalogoId,
      titulo: form.nome.trim(),
      subtitulo: form.funcao.trim(),
      imagem_url: form.foto_url,
      link_principal: form.instagram_url.trim() || null,
      link_secundario: form.video_url.trim() || null,
      ativo: form.ativo,
      ordem: form.ordem,
    };

    const result = editingId
      ? await supabase.from("catalogo_itens").update(payload).eq("id", editingId).eq("catalogo_id", catalogoId)
      : await supabase.from("catalogo_itens").insert(payload);

    if (result.error) setMessage(result.error.message);
    else {
      setDrawerOpen(false);
      setMessage(editingId ? "Assessorado atualizado com sucesso." : "Assessorado cadastrado com sucesso.");
      await loadItems();
    }
    setSaving(false);
  }

  async function toggleVisibility(item: CatalogoItem) {
    const { error } = await supabase
      .from("catalogo_itens")
      .update({ ativo: !item.ativo })
      .eq("id", item.id)
      .eq("catalogo_id", catalogoId);

    if (error) setMessage(error.message);
    else {
      setItems((current) => current.map((row) => row.id === item.id ? { ...row, ativo: !row.ativo } : row));
      setMessage(item.ativo ? "Assessorado ocultado do site." : "Assessorado publicado no site.");
    }
  }

  async function deleteItem(item: CatalogoItem) {
    if (!window.confirm(`Excluir definitivamente “${item.titulo}”?`)) return;
    const { error } = await supabase
      .from("catalogo_itens")
      .delete()
      .eq("id", item.id)
      .eq("catalogo_id", catalogoId);

    if (error) setMessage(error.message);
    else {
      setItems((current) => current.filter((row) => row.id !== item.id));
      setMessage("Assessorado excluído.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const activeCount = items.filter((item) => item.ativo).length;

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div className="admin-brand">
          <img src="/assets/img/IMG_1661.PNG" alt="New Rocket Play" />
          <div><strong>New Rocket Play</strong><span>Gestão do site</span></div>
        </div>
        <div className="admin-actions">
          <a className="ghost-btn" href="/" target="_blank">Ver site ↗</a>
          <button className="ghost-btn" type="button" onClick={() => void signOut()}>Sair</button>
        </div>
      </header>

      <section className="admin-shell">
        <div className="admin-heading">
          <div><span className="section-tag">ASSESSORADOS</span><h1>Painel de gestão</h1><p>Logado como {email}. Cadastre, edite e controle quem aparece no site.</p></div>
          <button className="btn-primary" type="button" onClick={startCreate}>＋ Novo assessorado</button>
        </div>

        <div className="admin-stats">
          <article className="admin-stat"><span>Cadastrados</span><strong>{items.length}</strong></article>
          <article className="admin-stat"><span>Publicados</span><strong>{activeCount}</strong></article>
          <article className="admin-stat"><span>Ocultos</span><strong>{items.length - activeCount}</strong></article>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-head"><div><h2>Assessorados</h2>{message && <p>{message}</p>}</div><input className="admin-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome ou função" /></div>
          {loading ? <div className="empty-state">Carregando…</div> : visibleItems.length === 0 ? <div className="empty-state">Nenhum assessorado encontrado.</div> : (
            <div className="admin-list">
              {visibleItems.map((item) => (
                <article className="admin-row" key={item.id}>
                  <div className="admin-person"><img src={item.imagem_url || "/assets/img/IMG_1661.PNG"} alt="" /><div><strong>{item.titulo}</strong><small>{item.subtitulo}</small></div></div>
                  <div>Ordem {item.ordem}</div>
                  <div><button className={item.ativo ? "status-pill live" : "status-pill"} type="button" onClick={() => void toggleVisibility(item)}>{item.ativo ? "Publicado" : "Oculto"}</button></div>
                  <div className="row-actions"><button className="ghost-btn" type="button" onClick={() => startEdit(item)}>Editar</button><button className="danger-btn" type="button" onClick={() => void deleteItem(item)}>Excluir</button></div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      {drawerOpen && (
        <div className="admin-overlay" onMouseDown={(event) => event.target === event.currentTarget && setDrawerOpen(false)}>
          <section className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="assessorado-form-title">
            <div className="drawer-head"><div><span className="section-tag">ASSESSORADOS</span><h2 id="assessorado-form-title">{editingId ? "Editar assessorado" : "Novo assessorado"}</h2></div><button type="button" onClick={() => setDrawerOpen(false)}>×</button></div>
            <form className="admin-form" onSubmit={saveItem}>
              <label>Nome artístico<input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Diego Marçal" /></label>
              <div className="form-grid"><label>Função<input required value={form.funcao} onChange={(e) => setForm({ ...form, funcao: e.target.value })} placeholder="Cantor, Pregador, Dupla…" /></label><label>Ordem<input type="number" min="0" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} /></label></div>
              <label>Instagram oficial<input type="url" value={form.instagram_url} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} placeholder="https://instagram.com/..." /></label>
              <label>Vídeo / Reel<input type="url" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://instagram.com/reel/..." /></label>
              <label>Foto<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file).catch((error) => setMessage(error instanceof Error ? error.message : "Falha no upload.")); }} /></label>
              <label>Ou URL da foto<input type="url" value={form.foto_url} onChange={(e) => setForm({ ...form, foto_url: e.target.value })} placeholder="https://..." /></label>
              {form.foto_url && <img className="preview-image" src={form.foto_url} alt="Prévia" />}
              <label className="check-row"><input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} /> Publicar no site</label>
              <div className="drawer-actions"><button className="ghost-btn" type="button" onClick={() => setDrawerOpen(false)}>Cancelar</button><button className="btn-primary" type="submit" disabled={saving}>{saving ? "Salvando…" : "Salvar assessorado"}</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

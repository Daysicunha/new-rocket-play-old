import { createClient } from "@/lib/supabase/server";

export const NEW_ROCKET_SLUG = "new-rocket-play";

export type CatalogoItem = {
  id: string;
  catalogo_id: string;
  titulo: string;
  subtitulo: string | null;
  descricao: string | null;
  imagem_url: string;
  link_principal: string | null;
  link_secundario: string | null;
  preco: number | null;
  categoria: string | null;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
  extras: Record<string, unknown>;
};

export type Assessorado = {
  id: string;
  catalogo_id: string;
  nome: string;
  funcao: string;
  foto_url: string;
  instagram_url: string | null;
  video_url: string | null;
  ativo: boolean;
  ordem: number;
};

const fallbackAssessorados: Assessorado[] = [
  { id: "fallback-1", catalogo_id: "", nome: "Diego Marçal", funcao: "Cantor / Preletor", foto_url: "/assets/img/diegomarcal.jpeg", instagram_url: null, video_url: "https://www.instagram.com/reel/DXH3Vx2j_8y/?igsh=MnhqN3A1cmptdHR5", ativo: true, ordem: 1 },
  { id: "fallback-2", catalogo_id: "", nome: "Paloma César", funcao: "Preletora", foto_url: "/assets/img/Paloma%20C%C3%A9sar.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 2 },
  { id: "fallback-3", catalogo_id: "", nome: "Tainah Oliver", funcao: "Cantora", foto_url: "/assets/img/Tainah%20Oliver.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 3 },
  { id: "fallback-4", catalogo_id: "", nome: "Eduardo Silva", funcao: "Cantor", foto_url: "/assets/img/Eduardo%20Silva.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 4 },
  { id: "fallback-5", catalogo_id: "", nome: "Irmãs Miguel", funcao: "Dupla", foto_url: "/assets/img/Irm%C3%A3s%20Miguel.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 5 },
  { id: "fallback-6", catalogo_id: "", nome: "Marilene e Gabriela", funcao: "Dupla", foto_url: "/assets/img/Marilene%20e%20Gabriela.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 6 },
  { id: "fallback-7", catalogo_id: "", nome: "Natanael Santos", funcao: "Preletor", foto_url: "/assets/img/Natanael%20Santos.jpeg", instagram_url: null, video_url: null, ativo: true, ordem: 7 },
];

function toAssessorado(item: CatalogoItem): Assessorado {
  return {
    id: item.id,
    catalogo_id: item.catalogo_id,
    nome: item.titulo,
    funcao: item.subtitulo ?? "",
    foto_url: item.imagem_url,
    instagram_url: item.link_principal,
    video_url: item.link_secundario,
    ativo: item.ativo,
    ordem: item.ordem,
  };
}

export async function getCatalogoBySlug(slug: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("catalogos")
    .select("id,slug,nome,tipo,ativo,config")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return null;
  return data;
}

export async function getAssessorados(): Promise<Assessorado[]> {
  const supabase = await createClient();
  if (!supabase) return fallbackAssessorados;

  const catalogo = await getCatalogoBySlug(NEW_ROCKET_SLUG);
  if (!catalogo) return fallbackAssessorados;

  const { data, error } = await supabase
    .from("catalogo_itens")
    .select("id,catalogo_id,titulo,subtitulo,descricao,imagem_url,link_principal,link_secundario,preco,categoria,destaque,ativo,ordem,extras")
    .eq("catalogo_id", catalogo.id)
    .eq("ativo", true)
    .order("ordem", { ascending: true });

  if (error) return fallbackAssessorados;
  return ((data ?? []) as CatalogoItem[]).map(toAssessorado);
}

import { createClient } from "@/lib/supabase/server";

export type Assessorado = {
  id: number;
  nome: string;
  funcao: string;
  foto_url: string;
  instagram_url: string | null;
  video_url: string | null;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
};

export const assessoradosIniciais: Assessorado[] = [
  { id: 1, nome: "Diego Marçal", funcao: "Cantor / Preletor", foto_url: "/assets/img/diegomarcal.jpeg", instagram_url: null, video_url: "https://www.instagram.com/reel/DXH3Vx2j_8y/?igsh=MnhqN3A1cmptdHR5", destaque: true, ativo: true, ordem: 1 },
  { id: 2, nome: "Paloma César", funcao: "Preletora", foto_url: "/assets/img/Paloma%20C%C3%A9sar.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 2 },
  { id: 3, nome: "Tainah Oliver", funcao: "Cantora", foto_url: "/assets/img/Tainah%20Oliver.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 3 },
  { id: 4, nome: "Eduardo Silva", funcao: "Cantor", foto_url: "/assets/img/Eduardo%20Silva.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 4 },
  { id: 5, nome: "Irmãs Miguel", funcao: "Dupla", foto_url: "/assets/img/Irm%C3%A3s%20Miguel.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 5 },
  { id: 6, nome: "Marilene e Gabriela", funcao: "Dupla", foto_url: "/assets/img/Marilene%20e%20Gabriela.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 6 },
  { id: 7, nome: "Natanael Santos", funcao: "Preletor", foto_url: "/assets/img/Natanael%20Santos.jpeg", instagram_url: null, video_url: null, destaque: false, ativo: true, ordem: 7 },
];

export async function getAssessorados(): Promise<Assessorado[]> {
  const supabase = await createClient();
  if (!supabase) return assessoradosIniciais;

  const { data, error } = await supabase
    .from("assessorados")
    .select("id,nome,funcao,foto_url,instagram_url,video_url,destaque,ativo,ordem")
    .eq("ativo", true)
    .order("ordem", { ascending: true });

  if (error) return assessoradosIniciais;
  return (data ?? []) as Assessorado[];
}

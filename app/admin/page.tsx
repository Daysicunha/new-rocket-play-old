import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { createClient } from "@/lib/supabase/server";
import { NEW_ROCKET_SLUG } from "@/lib/catalogo";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/login?config=missing");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: catalogo } = await supabase
    .from("catalogos")
    .select("id")
    .eq("slug", NEW_ROCKET_SLUG)
    .maybeSingle();

  if (!catalogo) redirect("/login?access=denied");

  const { data: membership } = await supabase
    .from("catalogo_usuarios")
    .select("papel")
    .eq("catalogo_id", catalogo.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) redirect("/login?access=denied");

  return <AdminDashboard email={user.email ?? "usuário"} catalogoId={catalogo.id} />;
}

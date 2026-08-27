import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/login?config=missing");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !admin) redirect("/login?unauthorized=1");

  return <AdminDashboard email={user.email ?? "usuário"} />;
}

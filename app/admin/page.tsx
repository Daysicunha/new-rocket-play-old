import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/login?config=missing");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <AdminDashboard email={user.email ?? "usuário"} />;
}

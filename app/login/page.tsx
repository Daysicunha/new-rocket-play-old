"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <img src="/assets/img/IMG_1661.PNG" alt="New Rocket Play" />
        <h1>Acesso administrativo</h1>
        <p>Entre com a conta autorizada para gerenciar os assessorados do site.</p>
        <form onSubmit={handleSubmit}>
          <label>E-mail<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Senha<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error && <div className="login-error" role="alert">{error}</div>}
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>
        </form>
      </section>
    </main>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas digitadas não são iguais.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Este link de recuperação não é válido ou expirou. Solicite um novo link.");
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível atualizar a senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <img src="/assets/img/IMG_1661.PNG" alt="New Rocket Play" />
        {success ? (
          <>
            <h1>Senha atualizada</h1>
            <p>Sua nova senha foi salva. Você já pode entrar no painel da New Rocket Play.</p>
            <a className="btn-primary" href="/login">Ir para o login</a>
          </>
        ) : (
          <>
            <h1>Criar nova senha</h1>
            <p>Defina uma nova senha para sua conta administrativa.</p>
            <form onSubmit={handleSubmit}>
              <label>Nova senha<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
              <label>Confirmar nova senha<input type="password" minLength={8} autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label>
              {error && <div className="login-error" role="alert">{error}</div>}
              <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Salvando…" : "Salvar nova senha"}</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = requestUrl.searchParams.get("next");
  const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/reset-password";
  const redirectTo = new URL(next, requestUrl.origin);

  if (!code) {
    return NextResponse.redirect(new URL("/login?recovery=invalid", requestUrl.origin));
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/login?config=missing", requestUrl.origin));
  }

  const flowId = requestUrl.searchParams.get("sb_flow_id");
  const { error } = await supabase.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
  if (error) {
    return NextResponse.redirect(new URL("/login?recovery=invalid", requestUrl.origin));
  }

  return NextResponse.redirect(redirectTo);
}

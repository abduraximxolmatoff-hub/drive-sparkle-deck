import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Kirish — AutoINFO" },
      { name: "description", content: "AutoINFO hisobingizga kiring va servis eslatmalarini oling." },
      { property: "og:title", content: "Kirish — AutoINFO" },
      { property: "og:description", content: "AutoINFO hisobingizga kiring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/profile", replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Email yoki parol noto'g'ri");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/profile" },
      });
      if (error) toast.error(error.message);
      else toast.success("Emailingizni tekshiring va tasdiqlash havolasini bosing.");
    }
    setBusy(false);
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error("Google orqali kirib bo'lmadi");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-sm space-y-5 rounded-3xl border border-border bg-card-gradient p-6 shadow-card backdrop-blur-md">
        <AutoInfoLogo size="sm" />
        <h1 className="font-display text-2xl font-bold">
          {mode === "in" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}
        </h1>
        <button
          onClick={google}
          className="w-full rounded-xl border border-border bg-background/60 py-2.5 text-sm font-semibold hover:border-primary/60"
        >
          Google bilan davom etish
        </button>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm"
          />
          <button
            disabled={busy}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {mode === "in" ? "Kirish" : "Ro'yxatdan o'tish"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="w-full text-center text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "in" ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" : "Hisobingiz bormi? Kiring"}
        </button>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Pencil, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/i18n/LanguageContext";

export function ProfileHeader() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return setName("");
    const fallback =
      (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "";
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setName(data?.display_name || fallback));
  }, [user]);

  const save = async () => {
    const v = draft.trim();
    if (!v) return setError(t("profile.nameEmpty"));
    if (v.length < 2 || v.length > 40) return setError(t("profile.nameError"));
    setSaving(true);
    const { error: e } = await supabase
      .from("profiles")
      .upsert({ user_id: user!.id, display_name: v, updated_at: new Date().toISOString() });
    setSaving(false);
    if (e) return toast.error(t("profile.saveError"));
    setName(v);
    setEditing(false);
    toast.success(t("profile.nameSaved"));
  };

  const shown = user ? name : t("profile.guest");
  const initial = user && name ? name.charAt(0).toUpperCase() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 rounded-3xl border border-border bg-card-gradient p-5 backdrop-blur-md shadow-card"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-2xl font-bold text-primary">
        {initial ?? <User className="h-7 w-7" />}
      </div>
      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="space-y-2">
            <input
              autoFocus
              maxLength={60}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && save()}
              className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-base"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <div className="flex gap-2">
              <button disabled={saving} onClick={save} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
                {t("profile.save")}
              </button>
              <button onClick={() => { setEditing(false); setError(""); }} className="rounded-lg border border-border px-3 py-1.5 text-sm">
                {t("profile.cancel")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-2xl font-bold">{loading ? "…" : shown}</h1>
              {user && (
                <button
                  aria-label={t("profile.edit")}
                  onClick={() => { setDraft(name); setEditing(true); }}
                  className="rounded-lg p-1.5 text-muted-foreground hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>
            {user ? (
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            ) : (
              !loading && (
                <Link to="/auth" className="mt-2 inline-block rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  {t("profile.signIn")}
                </Link>
              )
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

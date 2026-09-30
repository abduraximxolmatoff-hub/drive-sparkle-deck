import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthValue {
  user: User | null;
  loading: boolean;
}
const AuthContext = createContext<AuthValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthValue>({ user: null, loading: true });
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ user: session?.user ?? null, loading: false });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ user: session?.user ?? null, loading: false });
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

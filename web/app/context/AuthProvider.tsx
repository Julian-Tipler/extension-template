"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (chrome.runtime) {
          console.log('chrome runtime')
          if (session) {
            chrome.runtime.sendMessage(
              process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
              {
                action: "saveYourMomSessionToken",
                token: session.access_token,
              }
            );
          } else {
            chrome.runtime.sendMessage(
              process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
              {
                action: "removeYourMomSessionToken",
              }
            );
          }
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

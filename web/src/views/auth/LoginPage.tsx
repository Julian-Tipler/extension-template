import supabase from "../../supabase/supabase-client";

export const LoginPage = () => {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo:
          import.meta.env.VITE_WEB_AUTH_URL || "http://localhost:5173",
      },
    });
  };
  
  return (
    <div>
      <div>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
    </div>
  );
};

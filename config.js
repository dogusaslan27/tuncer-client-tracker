/**
 * Central app config. All env vars are read here with sane fallback
 * defaults so the rest of the codebase never touches `import.meta.env`
 * directly.
 */
export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
};

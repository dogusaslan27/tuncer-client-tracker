import { createClient } from "@supabase/supabase-js";
import { config } from "../../config.js";
import type { Client } from "@/types";

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Copy .env.example to .env and fill in your project credentials."
  );
}

/** Database schema shape, scoped to the `clients` table. */
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: Client;
        Insert: Omit<Client, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Client>;
      };
    };
  };
}

/** Shared Supabase client instance used across the app. */
export const supabase = createClient<Database>(
  config.supabaseUrl,
  config.supabaseAnonKey
);

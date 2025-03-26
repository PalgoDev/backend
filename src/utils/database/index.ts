import { createClient } from "@supabase/supabase-js";
import { useUserDb } from "./user";
import { useEntityDb } from "./entity";
import { useGameDb } from "./game";
import { useLeaderBoardDb } from "./leaderBoard";

import dotenv from "dotenv";
// dotenv.config();

const SUPABASE_URL = "https://t327057.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InQzMjcwNTciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4NTQ3ODEyMywiZXhwIjoyMDAxMDU0MTIzfQ.AbCdEfGhIjKlMnOpQrStUvWxYz"

export const createDbClient = () => {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
    },
  });
};

export const useUserDbClient = useUserDb(createDbClient);
export const useEntityDbClient = useEntityDb(createDbClient);
export const useGameDbClient = useGameDb(createDbClient);
export const useLeaderBoardDbClient = useLeaderBoardDb(createDbClient);

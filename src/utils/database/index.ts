import { createClient } from "@supabase/supabase-js";
import { useUserDb } from "./user";
import { useEntityDb } from "./entity";
import { useGameDb } from "./game";
import { useLeaderBoardDb } from "./leaderBoard";

import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

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

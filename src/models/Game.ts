import { z } from "zod";

export const GameSchema = z.object({
  id: z.number(),
  created_at: z.string().optional(),
  player_1_id: z.string(),
  player_2_id: z.string(),
  result: z.number(),
  remarks: z.string().optional(),
});

export type Game = z.infer<typeof GameSchema>;

export const createGame = (game: Game) => {
  return Object.freeze({
    player_1_id: game.player_1_id,
    player_2_id: game.player_2_id,
    result: game.result,
    remarks: game.remarks,
  });
};

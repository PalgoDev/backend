import { z } from "zod";

export const LeaderBoardSchema = z.object({
  id: z.number(),
  created_at: z.string().optional(),
  email: z.string(),
  wallet_address: z.string(),
  wins: z.number().optional(),
  losses: z.number().optional(),
  draws: z.number().optional(),
});

export type LeaderBoard = z.infer<typeof LeaderBoardSchema>;

export const createLeaderBoard = (leaderBoard: LeaderBoard) => {
  return Object.freeze({
    wallet_address: leaderBoard.wallet_address,
    email: leaderBoard.email,
    wins: leaderBoard.wins,
    losses: leaderBoard.losses,
    draws: leaderBoard.draws,
  });
};

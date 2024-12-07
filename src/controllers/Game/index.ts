import { Result, createGame, Game } from "../../models";
import {
  createGameService,
  getAllGameService,
  getGameService,
} from "../../services/Game";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const createGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    let input = req.body;
    const game = createGame(input);
    return await createGameService(game);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    const game_id: string = req.params?.id;
    if (!game_id || game_id.length == 0 || isNaN(+game_id)) {
      throw Error("No/Invalid game_id found. game_id:" + game_id);
    }

    return await getGameService(game_id);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getAllGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    return await getAllGameService();
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

import { Result, createGame, Game } from "../../models";
import {
  createGameService,
  getAllGameService,
  getGameService,
  simulateGameService,
  updateGameService,
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
    console.log(e);
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
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getAllGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    return await getAllGameService();
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const simulateGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    const game_id: string = req.params?.id;
    if (!game_id || game_id.length == 0 || isNaN(+game_id)) {
      throw Error("No/Invalid game_id found. game_id:" + game_id);
    }

    return await simulateGameService(game_id, req.params?.chainId);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const createAndSimulateGameController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    let input = req.body;
    const game = createGame(input);
    const gameResponse: any = await createGameService(game);
    if (gameResponse.status != 201) {
      return gameResponse;
    }
    return await simulateGameService(
      gameResponse.data[0].id as string,
      input.chainId
    );
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const updateGameController = async (
  req: Request
): Promise<Result<Game[] | string>> => {
  try {
    let input = req.body;
    return await updateGameService(input);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

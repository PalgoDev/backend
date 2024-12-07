import { Game, Result } from "../../models";
import { useGameDbClient } from "../../utils/database";

export const createGameService = async (
  game: Pick<Game, Exclude<keyof Game, "id">>
): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.insertGame(game);
  return { status: response.status, data: response.data };
};

export const getGameService = async (id: string): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.findById(id);
  return { status: response.status, data: response.data };
};

export const getAllGameService = async (): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.getAll();
  return { status: response.status, data: response.data };
};

import { Game, Result } from "../../../models";

export const useGameDb = (getDbClient: Function) => {
  async function getAll(): Promise<Result<Game[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance.from("Game").select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function findById(id: string): Promise<Result<Game[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance
        .from("Game")
        .select()
        .match({ id: id });
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "Game not Found" };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function insertGame(
    game: Pick<Game, Exclude<keyof Game, "id">>
  ): Promise<Result<Game[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.from("Game").insert(game).select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function findDetailGameInfoById(id: string): Promise<Result<Game[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("Game")
        .select(
          `
          *,
          player1:player_1_id (
            id,
            name,
            health,
            attack,
            defense
          ),
          player2:player_2_id (
            id,
            name,
            health,
            attack,
            defense
          )
        `
        )
        .eq("id", id);

      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "Game not Found" };
      }
      return { status: 200, data: response.data };
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function updateGame(game: Game): Promise<Result<Game[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.from("Game").upsert(game).select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  return Object.freeze({
    getAll,
    findById,
    insertGame,
    findDetailGameInfoById,
    updateGame,
  });
};

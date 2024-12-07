import { LeaderBoard, Result } from "../../../models";

export const useLeaderBoardDb = (getDbClient: Function) => {
  async function getAll(): Promise<Result<LeaderBoard[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.from("LeaderBoard").select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function findById(id: string): Promise<Result<LeaderBoard[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .select()
        .match({ id: id });
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "LeaderBoard not Found" };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function insertLeaderBoard(
    leaderBoard: Pick<LeaderBoard, Exclude<keyof LeaderBoard, "id">>
  ): Promise<Result<LeaderBoard[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .insert(leaderBoard)
        .select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function updateLeaderBoard(
    leaderBoard: LeaderBoard
  ): Promise<Result<LeaderBoard[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .update(leaderBoard)
        .match({ id: leaderBoard.id })
        .select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function getLeaderBoardsFromParams(
    searchParams: any
  ): Promise<Result<any[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .select()
        .match(searchParams);
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "LeaderBoards not Found" };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function getLeaderBoardsFromEmail(email: any): Promise<Result<any[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .select()
        .match({ email: email });
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "LeaderBoards not Found" };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function getTopNRanks(limit: number): Promise<Result<LeaderBoard[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("LeaderBoard")
        .select()
        .order("wins", { ascending: false })
        .limit(limit);
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "LeaderBoards not Found" };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  return Object.freeze({
    getAll,
    findById,
    insertLeaderBoard,
    updateLeaderBoard,
    getLeaderBoardsFromParams,
    getLeaderBoardsFromEmail,
    getTopNRanks,
  });
};

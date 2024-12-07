import { LeaderBoard, Result } from "../../models";
import { useLeaderBoardDbClient } from "../../utils/database";

export const createLeaderBoardService = async (
  leaderBoard: Pick<LeaderBoard, Exclude<keyof LeaderBoard, "id">>
): Promise<Result<LeaderBoard[]>> => {
  const response: any = await useLeaderBoardDbClient.insertLeaderBoard(
    leaderBoard
  );
  return { status: response.status, data: response.data };
};

export const getLeaderBoardService = async (
  id: string
): Promise<Result<LeaderBoard[]>> => {
  const response = await useLeaderBoardDbClient.findById(id);
  return { status: response.status, data: response.data };
};

export const getAllLeaderBoardService = async (): Promise<
  Result<LeaderBoard[]>
> => {
  const response = await useLeaderBoardDbClient.getAll();
  return { status: response.status, data: response.data };
};

export const updateLeaderBoardService = async (
  leaderBoard: LeaderBoard
): Promise<Result<LeaderBoard[]>> => {
  const response = await useLeaderBoardDbClient.updateLeaderBoard(leaderBoard);
  return { status: response.status, data: response.data };
};

export const getLeaderBoardsFromParamsService = async (
  searchParams: any
): Promise<Result<any[]>> => {
  const response = await useLeaderBoardDbClient.getLeaderBoardsFromParams(
    searchParams
  );
  return { status: response.status, data: response.data };
};

export const getLeaderBoardByEmailService = async (
  email: string
): Promise<Result<LeaderBoard[]>> => {
  const response = await useLeaderBoardDbClient.getLeaderBoardsFromEmail(email);
  return { status: response.status, data: response.data };
};

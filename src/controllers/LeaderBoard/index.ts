import { Result, createLeaderBoard, LeaderBoard } from "../../models";
import {
  createLeaderBoardService,
  getAllLeaderBoardService,
  getLeaderBoardService,
  updateLeaderBoardService,
  getLeaderBoardsFromParamsService,
  getLeaderBoardByEmailService,
} from "../../services/LeaderBoard";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const createLeaderBoardController = async (
  req: Request
): Promise<Result<LeaderBoard[] | string>> => {
  try {
    let input = req.body;
    const leaderBoard = createLeaderBoard(input);
    const response = await createLeaderBoardService(leaderBoard);
    console.log("RESPONSE", response);
    return response;
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getLeaderBoardController = async (
  req: Request
): Promise<Result<LeaderBoard[] | string>> => {
  try {
    const leaderBoard_id: string = req.params?.id;
    if (
      !leaderBoard_id ||
      leaderBoard_id.length == 0 ||
      isNaN(+leaderBoard_id)
    ) {
      throw Error(
        "No/Invalid leaderBoard_id found. leaderBoard_id:" + leaderBoard_id
      );
    }
    return await getLeaderBoardService(leaderBoard_id);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getAllLeaderBoardController = async (
  req: Request
): Promise<Result<LeaderBoard[] | string>> => {
  try {
    return await getAllLeaderBoardService();
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const updateLeaderBoardController = async (
  req: Request
): Promise<Result<LeaderBoard[] | string>> => {
  try {
    let input = req.body;
    return await updateLeaderBoardService(input);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getLeaderBoardsFromParamsController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    let input = req.query;
    return await getLeaderBoardsFromParamsService(input);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

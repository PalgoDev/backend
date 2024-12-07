import { Result, createUser, User } from "../../models";
import {
  mintTokensForUserService,
  getTokenBalanceForUser,
} from "../../services/Contract";
import { Request } from "express";

import dotenv from "dotenv";
import { ChainId } from "config";
dotenv.config();

export const mintTokensForUserController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    return await mintTokensForUserService(
      input.user_id,
      input.chainId,
      input.tokenId,
      input.amount
    );
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getTokenBalanceForUserController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    return await getTokenBalanceForUser(
      req.query.user_id as string,
      req.query.chainId as any,
      parseInt(req.query.token_id as string)
    );
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

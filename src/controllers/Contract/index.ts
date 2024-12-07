import { Result, createUser, User } from "../../models";
import { mintTokensForUserService } from "../../services/Contract";
import { Request } from "express";

import dotenv from "dotenv";
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

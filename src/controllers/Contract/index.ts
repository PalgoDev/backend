import { Result, createUser, User } from "../../models";
import {
  mintTokensForUserService,
  getContractData,
} from "../../services/Contract";
import { getUsersFromParamsService } from "../../services/User";
import { Request } from "express";

import dotenv from "dotenv";
import { parseEther } from "viem";
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

export const getContractDataController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    return await getContractData(
      req.query.user_id as string,
      req.query.chainId as any
    );
  } catch (e: any) {
    console.log(e);
    console.log("HERE");
    return { status: 400, data: e };
  }
};

export const mintClaimOrbController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    const user: any = await getUsersFromParamsService({ email: input.email });
    if (!user || user.status !== 200) {
      return { status: 400, data: "User not found" };
    }
    await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      0,
      parseEther("300").toString()
    );
    await mintTokensForUserService(user.data[0].id, input.chainId, 1, 10);
    await mintTokensForUserService(user.data[0].id, input.chainId, 2, 3);
    await mintTokensForUserService(user.data[0].id, input.chainId, 3, 1);
    return { status: 200, data: "Tokens minted" };
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

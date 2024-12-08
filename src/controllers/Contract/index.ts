import { Result, createUser, User } from "../../models";
import {
  mintTokensForUserService,
  getContractData,
  burnTokensForUserService,
} from "../../services/Contract";
import {
  getUsersFromParamsService,
  updateUserService,
} from "../../services/User";
import { Request } from "express";

import dotenv from "dotenv";
import { parseEther } from "viem";
import { USER_ITEM } from "../../config";
dotenv.config();

export const mintTokensForUserController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    const tokenResponse = await mintTokensForUserService(
      input.user_id,
      input.chainId,
      input.tokenId,
      input.amount
    );
    console.log("TOKEN RESPONSE", tokenResponse);
    return tokenResponse;
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const burnTokensForUserController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    const burn_res = await burnTokensForUserService(
      input.user_id,
      input.chainId,
      input.tokenId,
      input.amount
    );
    console.log("BURN RES", burn_res);
    return burn_res;
  } catch (e: any) {
    console.log(e);
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
    console.log(e);
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
      console.log("USER NOT FOUND");
      return { status: 400, data: "User not found" };
    }
    const user_res = user.data[0];
    const updated_user = await updateUserService({
      ...user_res,
      health: user_res.health + 100,
      attack: user_res.attack + 10,
      defense: user_res.defense + 5,
    });
    const cashRes = await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      USER_ITEM.CASH,
      parseEther("300").toString()
    );
    console.log("CASH RES", cashRes);
    const healthRes = await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      USER_ITEM.HEALTH,
      10
    );
    console.log("HEALTH RES", healthRes);
    const attackRes = await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      USER_ITEM.ATTACK,
      3
    );
    console.log("ATTACK RES", attackRes);
    const defenseRes = await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      USER_ITEM.DEFENSE,
      1
    );
    console.log("DEFENSE RES", defenseRes);
    return { status: 200, data: updated_user.data };
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const mintClaimPotionController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    const user: any = await getUsersFromParamsService({ email: input.email });
    if (!user || user.status !== 200) {
      console.log("USER NOT FOUND");
      return { status: 400, data: "User not found" };
    }
    const potionRes = await mintTokensForUserService(
      user.data[0].id,
      input.chainId,
      USER_ITEM.POTION,
      1
    );
    console.log("POTION RES", potionRes);

    return { status: 200, data: "Potions minted" };
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const mintUsePotionController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const input = req.body;
    const user: any = await getUsersFromParamsService({ email: input.email });
    if (!user || user.status !== 200) {
      console.log("USER NOT FOUND");
      return { status: 400, data: "User not found" };
    }
    const user_res = user.data[0];
    if (input.is_super_potion) {
      const super_potion_res = await burnTokensForUserService(
        user.data[0].id,
        input.chainId,
        USER_ITEM.SUPER_POTION,
        1
      );
      console.log("SUPER POTION RES", super_potion_res);
      const super_potion_health_increase_res = await mintTokensForUserService(
        user.data[0].id,
        input.chainId,
        USER_ITEM.HEALTH,
        50
      );
      console.log("SUPER POTION HEALTH RES", super_potion_health_increase_res);
      await updateUserService({ ...user_res, health: user_res.health + 50 });
    } else {
      const potion_res = await burnTokensForUserService(
        user.data[0].id,
        input.chainId,
        USER_ITEM.POTION,
        1
      );
      console.log("POTION RES", potion_res);
      const potion_health_increase_res = await mintTokensForUserService(
        user.data[0].id,
        input.chainId,
        USER_ITEM.HEALTH,
        20
      );
      console.log("POTION HEALTH RES", potion_health_increase_res);
      await updateUserService({ ...user_res, health: user_res.health + 20 });
    }

    return { status: 200, data: "Potions used" };
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

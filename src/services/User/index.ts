import { USER_ITEM } from "../../config";
import { User, Result } from "../../models";
import { useLeaderBoardDbClient, useUserDbClient } from "../../utils/database";
import { mintTokensForUserService } from "../Contract";
import { parseEther } from "viem";

export const createUserService = async (
  user: Pick<User, Exclude<keyof User, "id">>
): Promise<Result<User[]>> => {
  const response: any = await useUserDbClient.insertUser(user);
  const userRes = response.data[0];
  await useLeaderBoardDbClient.insertLeaderBoard({
    wallet_address: userRes.wallet_address,
    email: userRes.email,
  });
  await mintTokensForUserService(
    userRes.id as string,
    137,
    USER_ITEM.HEALTH,
    userRes.health
  );
  await mintTokensForUserService(
    userRes.id as string,
    137,
    USER_ITEM.ATTACK,
    userRes.attack
  );
  await mintTokensForUserService(
    userRes.id as string,
    137,
    USER_ITEM.DEFENSE,
    userRes.defense
  );
  await mintTokensForUserService(
    userRes.id as string,
    137,
    USER_ITEM.CASH,
    parseEther("100").toString()
  );
  return { status: response.status, data: response.data };
};

export const getUserService = async (id: string): Promise<Result<User[]>> => {
  const response = await useUserDbClient.findById(id);
  return { status: response.status, data: response.data };
};

export const getAllUserService = async (): Promise<Result<User[]>> => {
  const response = await useUserDbClient.getAll();
  return { status: response.status, data: response.data };
};

export const updateUserService = async (
  user: User
): Promise<Result<User[]>> => {
  const response = await useUserDbClient.updateUser(user);
  return { status: response.status, data: response.data };
};

export const getUsersFromParamsService = async (
  searchParams: any
): Promise<Result<any[]>> => {
  const response = await useUserDbClient.getUsersFromParams(searchParams);
  return { status: response.status, data: response.data };
};

export const getUserByEmailService = async (
  email: string
): Promise<Result<User[]>> => {
  const response = await useUserDbClient.getUsersFromEmail(email);
  return { status: response.status, data: response.data };
};

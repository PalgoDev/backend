import { Result, createUser, User } from "../../models";
import {
  createUserService,
  getAllUserService,
  getUserService,
  updateUserService,
} from "../../services/User";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const createUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    let input = req.body;
    const user = createUser(input);
    return await createUserService(user);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    const user_id: string = req.params?.id;
    if (!user_id || user_id.length == 0 || isNaN(+user_id)) {
      throw Error("No/Invalid user_id found. user_id:" + user_id);
    }
    return await getUserService(user_id);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getAllUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    return await getAllUserService();
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const updateUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    let input = req.body;
    return await updateUserService(input);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

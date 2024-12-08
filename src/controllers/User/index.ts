import { Result, createUser, User } from "../../models";
import {
  createUserService,
  getAllUserService,
  getUserService,
  updateUserService,
  getUsersFromParamsService,
  getUserByEmailService,
} from "../../services/User";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const createUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    const input = { ...req.body };
    const chainId = input.chainId;
    delete input.chainId;
    const user = createUser(input);
    const response = await createUserService(user, chainId);
    console.log("RESPONSE", response);
    return response;
  } catch (e: any) {
    console.log(e);
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
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getAllUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    return await getAllUserService();
  } catch (e: any) {
    console.log(e);
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
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getUsersFromParamsController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    let input = req.query;
    return await getUsersFromParamsService(input);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

// export const getUserByEmailController = async (
//   req: Request
// ): Promise<Result<User[] | string>> => {
//   try {
//     let input = req.query;
//     return await getUserByEmailService(input.email);
//   } catch (e: any) {
//     console.log(e)
// return { status: 400, data: e };
//   }
// };

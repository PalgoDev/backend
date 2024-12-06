import { Result, createUser, User } from "../../models";
import {
  createUserService,
  getAllUserService,
  getUserService,
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

    // TODO: check if auth needed for getting blocks
    // const typeOfAuthorization = req.headers.authorization?.split(" ")[0];
    // const accessToken = req.headers.authorization?.split(" ")[1];
    // if (!(typeOfAuthorization && accessToken)) {
    //   return { status: 400, data: "No access token found" };
    // }
    return await getUserService(user_id);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const getAllUserController = async (
  req: Request
): Promise<Result<User[] | string>> => {
  try {
    // TODO: remove this
    // TODO: check if auth needed for getting blocks
    // const typeOfAuthorization = req.headers.authorization?.split(" ")[0];
    // const accessToken = req.headers.authorization?.split(" ")[1];
    // if (!(typeOfAuthorization && accessToken)) {
    //   return { status: 400, data: "No access token found" };
    // }

    return await getAllUserService();
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

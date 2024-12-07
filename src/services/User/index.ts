import { User, Result } from "../../models";
import { useUserDbClient } from "../../utils/database";

export const createUserService = async (
  user: Pick<User, Exclude<keyof User, "id">>
): Promise<Result<User[]>> => {
  const response = await useUserDbClient.insertUser(user);
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

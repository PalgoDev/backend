import { User, Result } from "../../../models";

export const useUserDb = (getDbClient: Function) => {
  async function getAll(): Promise<Result<User[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance.from("User").select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function findById(id: string): Promise<Result<User[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance
        .from("User")
        .select()
        .match({ id: id });
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "User not Found" };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  async function insertUser(
    user: Pick<User, Exclude<keyof User, "id">>
  ): Promise<Result<User[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.from("User").insert(user).select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      return { status: 400, data: e.message };
    }
  }

  return Object.freeze({
    getAll,
    findById,
    insertUser,
  });
};

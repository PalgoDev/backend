import { Entity, Result } from "../../../models";

export const useEntityDb = (getDbClient: Function) => {
  async function getAll(): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance.from("Entity").select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function findById(id: string): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();

      const response = await clientInstance
        .from("Entity")
        .select()
        .match({ id: id });
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      if (response.data.length === 0) {
        return { status: 404, data: "Entity not Found" };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function insertEntity(
    entity: Pick<Entity, Exclude<keyof Entity, "id">>
  ): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance
        .from("Entity")
        .insert(entity)
        .select();
      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      return response;
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function insertMultipleEntities(
    entities: Pick<Entity, Exclude<keyof Entity, "id">>[]
  ): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.from("Entity").upsert(entities, {
        onConflict: ["longitude_latitude"],
      });
      if (response.error) {
        // Handle conflict error
        if (response.error.code === "23505") {
          // 23505 is the PostgreSQL error code for unique violation
          console.warn(
            "Conflict detected, some entities were not inserted due to duplicate longitude_latitude."
          );
          return {
            status: 409,
            data: "Conflict detected, some entities were not inserted due to duplicate longitude_latitude.",
          };
        }
        return { status: response.status, data: response.error.message };
      }
      return { status: 200, data: "Entities inserted successfully" };
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function getClosestEntities(
    longitude: number,
    latitude: number,
    limit: number
  ): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.rpc("get_closest_entities", {
        lon: longitude,
        lat: latitude,
        lim: limit,
      });

      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      console.log(`fetched ${response.data.length} entities`);
      return { status: 200, data: response.data };
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  async function getClosestEntitiesIndividually(
    longitude: number,
    latitude: number,
    limit: number,
    entity_type: number
  ): Promise<Result<Entity[]>> {
    try {
      const clientInstance = await getDbClient();
      const response = await clientInstance.rpc(
        "get_closest_entities_individually",
        {
          lon: longitude,
          lat: latitude,
          lim: limit,
          entity_type: entity_type,
        }
      );

      if (response.error) {
        return { status: response.status, data: response.error.message };
      }
      console.log(`fetched ${response.data.length} entities`);
      return { status: 200, data: response.data };
    } catch (e: any) {
      console.log(e);
      return { status: 400, data: e.message };
    }
  }

  return Object.freeze({
    getAll,
    findById,
    insertEntity,
    insertMultipleEntities,
    getClosestEntities,
    getClosestEntitiesIndividually,
  });
};

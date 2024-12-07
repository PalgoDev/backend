import axios from "axios";
import { Entity, createEntity, Result } from "../../models";
import { useEntityDbClient } from "../../utils/database";

export const getNearbyPlacesToCordinateService = async (
  longitude,
  latitude,
  limit = 10
): Promise<Result<Entity[]>> => {
  try {
    const response = await useEntityDbClient.getClosestEntities(
      parseFloat(longitude),
      parseFloat(latitude),
      limit
    );

    return { status: 200, data: response.data };
  } catch (e: any) {
    return { status: 400, data: e.message };
  }
};

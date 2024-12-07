import axios from "axios";
import { Entity, createEntity, Result } from "../../models";
import { useEntityDbClient } from "../../utils/database";

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const entity_type_map = {
  0: "restaurant",
  1: "park",
  2: "landmark",
};

export const getNearbyPlacesService = async (
  latitude,
  longitude,
  radius = 1000,
  entity_type = 0
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entity_type_map[entity_type]}.json`;
  const params = {
    access_token: MAPBOX_ACCESS_TOKEN,
    proximity: `${longitude},${latitude}`,
    limit: 10,
    types: "poi",
    radius,
  };

  try {
    console.log(`fetching ${entity_type_map[entity_type]}`);
    const response = await axios.get(url, { params });
    const entities = response.data.features.map((place: any) => {
      return {
        place_name: place.place_name,
        address: place.properties?.address,
        longitude_latitude: `${place.center[0]},${place.center[1]}`,
        latitude: place.center[1],
        longitude: place.center[0],
      };
    });
    return { status: 200, data: entities };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return { status: 400, data: error };
  }
};

export const getNearbyPlacesStorageService = async (
  latitude: number,
  longitude: number,
  bfs_depth = 3,
  entity_type = 0
): Promise<Result<Entity[]>> => {
  const visited = new Set();
  const queue = [{ latitude, longitude }];
  const places: ReturnType<typeof createEntity>[] = [];

  const latOffset = 1000 / 111000;
  const lonOffset = 1000 / (111000 * Math.cos(latitude * (Math.PI / 180)));

  for (let depth = 0; depth < bfs_depth; depth++) {
    const { latitude, longitude }: any = queue.shift();

    const key = `${longitude},${latitude}`;
    visited.add(key);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entity_type_map[entity_type]}.json`;
    const params = {
      access_token: MAPBOX_ACCESS_TOKEN,
      proximity: key,
      limit: 10,
      types: "poi",
    };

    try {
      console.log(
        `Fetching ${entity_type_map[entity_type]} for:`,
        key,
        " for depth: ",
        depth
      );
      const response = await axios.get(url, { params });
      response.data.features.forEach((place: any) => {
        const placeKey = `${place.center[0]},${place.center[1]}`;
        if (!visited.has(placeKey)) {
          places.push({
            place_name: place.place_name,
            address: place.properties?.address,
            longitude_latitude: placeKey,
            latitude: place.center[1],
            longitude: place.center[0],
            type: entity_type,
          });
          visited.add(placeKey);
        }
      });

      // Add neighboring points to the queue if queue has less than bfs_depth elements
      if (queue.length >= bfs_depth) continue;
      if (!visited.has(`${longitude},${latitude + latOffset}`)) {
        queue.push({ latitude: latitude + latOffset, longitude });
        visited.add(`${longitude},${latitude + latOffset}`);
      }
      if (!visited.has(`${longitude},${latitude - latOffset}`)) {
        queue.push({ latitude: latitude - latOffset, longitude });
        visited.add(`${longitude},${latitude - latOffset}`);
      }
      if (!visited.has(`${longitude + lonOffset},${latitude}`)) {
        queue.push({ latitude, longitude: longitude + lonOffset });
        visited.add(`${longitude + lonOffset},${latitude}`);
      }
      if (!visited.has(`${longitude - lonOffset},${latitude}`)) {
        queue.push({ latitude, longitude: longitude - lonOffset });
        visited.add(`${longitude - lonOffset},${latitude}`);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  // Store in Supabase
  const response = await useEntityDbClient.insertMultipleEntities(places);

  return { status: 200, data: response.data };
};

import { z } from "zod";

export const EntitySchema = z.object({
  id: z.number(),
  created_at: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  latitude_longitude: z.string(),
  place_name: z.string(),
  address: z.string(),
});

export type Entity = z.infer<typeof EntitySchema>;

export const createEntity = (entity: Entity) => {
  return Object.freeze({
    latitude: entity.latitude,
    longitude: entity.longitude,
    latitude_longitude: entity.latitude_longitude,
    place_name: entity.place_name,
    address: entity.address,
  });
};

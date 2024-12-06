import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  created_at: z.string().optional(),
  wallet_address: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const createUser = (user: User) => {
  return Object.freeze({
    wallet_address: user.wallet_address,
    email: user.email,
    name: user.name,
    description: user.description,
  });
};

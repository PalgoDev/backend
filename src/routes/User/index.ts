import { makeCallback } from "../../utils";
import {
  getUserController,
  createUserController,
  getAllUserController,
  getUsersFromParamsController,
  updateUserController,
} from "../../controllers/User";

import express from "express";
export const userRouter = express.Router();

userRouter.get("/:id", makeCallback(getUserController));

userRouter.get("/", makeCallback(getAllUserController));

userRouter.post("/", makeCallback(createUserController));

userRouter.put("/", makeCallback(updateUserController));

userRouter.get("/search/params", makeCallback(getUsersFromParamsController));

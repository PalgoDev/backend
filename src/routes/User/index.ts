import { makeCallback } from "../../utils";
import {
  getUserController,
  createUserController,
  getAllUserController,
} from "../../controllers/User";

import express from "express";
export const userRouter = express.Router();

userRouter.get("/:id", makeCallback(getUserController));

userRouter.get("/", makeCallback(getAllUserController));

userRouter.post("/", makeCallback(createUserController));

// module.exports = blockRouter;

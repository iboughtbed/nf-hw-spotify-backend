import { Router } from "express";

import { authRouter } from "./auth/auth-router";
import { songsRouter } from "./songs/songs-router";

export const globalRouter = Router();

globalRouter.use("/auth", authRouter);
globalRouter.use("/", songsRouter);

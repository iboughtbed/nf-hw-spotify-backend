import { Router } from "express";
import multer from "multer";

import SongsController from "./songs-controller";
import SongsService from "./songs-service";

export const songsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const songsService = new SongsService();
const songsController = new SongsController(songsService);

const uploadSongFiles = upload.fields([
  { name: "audio", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

songsRouter
  .get("/songs", songsController.getSongs)
  .post("/songs", uploadSongFiles, songsController.createSong);

songsRouter
  .get("/songs/:id", songsController.getSong)
  .put("/songs/:id", songsController.updateSong)
  .delete("/songs/:id", songsController.deleteSong);

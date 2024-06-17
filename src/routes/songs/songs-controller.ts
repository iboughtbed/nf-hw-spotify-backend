import { Request, Response } from "express";

import { CreateSongDto } from "./dtos/CreateSong.dto";
import { UpdateSongDto } from "./dtos/UpdateSong.dto";
import SongsService from "./songs-service";

class SongsController {
  private songsService: SongsService;

  constructor(songsService: SongsService) {
    this.songsService = songsService;
  }

  getSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const song = await this.songsService.getSong(id);
      res.status(200).json(song);
    } catch (err) {
      res.status(500).json({ message: "Error getting a song" });
    }
  };

  getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const songs = await this.songsService.getSongs();
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json({ message: "Error getting songs" });
    }
  };

  createSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const createSongDto: CreateSongDto = { ...req.body, ...req.files };
      const newSong = await this.songsService.createSong(createSongDto);
      res.status(201).json(newSong);
    } catch (err: any) {
      console.log(err.message);
      res.status(500).json({ message: "Error creating a song" });
    }
  };

  updateSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateSongDto: UpdateSongDto = req.body;
      const updatedSong = await this.songsService.updateSong(id, updateSongDto);
      res.status(200).json(updatedSong);
    } catch (err) {
      res.status(500).json({ message: "Error updating a song" });
    }
  };

  deleteSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedSong = await this.songsService.deleteSong(id);
      res.status(200).json(deletedSong);
    } catch (err) {
      res.status(500).json({ message: "Error deleting a song" });
    }
  };
}

export default SongsController;

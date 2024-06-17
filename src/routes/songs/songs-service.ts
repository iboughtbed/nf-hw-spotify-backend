import { decode } from "base64-arraybuffer";

import { supabase } from "../../supabase";
import { generateId } from "../../utils";
import { CreateSongDto } from "./dtos/CreateSong.dto";
import { UpdateSongDto } from "./dtos/UpdateSong.dto";
import SongModel, { ISong } from "./models/Song";

class SongsService {
  async getSong(id: string): Promise<ISong | null> {
    return await SongModel.findById(id).exec();
  }

  async getSongs(): Promise<ISong[]> {
    return await SongModel.find().exec();
  }

  async createSong(createSongDto: CreateSongDto) {
    const { name, artist, image, audio } = createSongDto;

    const audioFile = audio[0];
    const imageFile = image[0];

    if (!audioFile || !imageFile || !name) throw new Error("Invalid fields");

    const audioId = generateId();
    const imageId = generateId();

    const audioBase64 = decode(audioFile.buffer.toString("base64"));
    const imageBase64 = decode(imageFile.buffer.toString("base64"));

    const storage = supabase.storage.from("spotify-clone");

    await storage.upload(audioId, audioBase64);
    await storage.upload(imageId, imageBase64);

    const {
      data: { publicUrl: audioUrl },
    } = storage.getPublicUrl(audioId);

    const {
      data: { publicUrl: imageUrl },
    } = storage.getPublicUrl(audioId);

    const newSong = new SongModel({
      name,
      artist,
      audio: audioUrl,
      image: imageUrl,
    });

    await newSong.save();
    return newSong;
  }

  async updateSong(
    id: string,
    updateSongDto: UpdateSongDto
  ): Promise<ISong | void> {
    const { name, artist } = updateSongDto;

    const updatedSong = await SongModel.findByIdAndUpdate(id, {
      name,
      artist,
    }).exec();

    if (!updatedSong) return;

    updatedSong.save();
    return updatedSong;
  }

  async deleteSong(id: string): Promise<ISong | null> {
    const deletedSong = await SongModel.findByIdAndDelete(id).exec();

    return deletedSong;
  }
}

export default SongsService;

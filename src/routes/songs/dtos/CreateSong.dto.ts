export interface CreateSongDto {
  name: string;
  artist: string;
  image: Express.Multer.File[];
  audio: Express.Multer.File[];
}

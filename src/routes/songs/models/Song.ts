import mongoose, { Schema } from "mongoose";

export interface ISong {
  name: string;
  artist: string;
  image: string;
  audio: string;
  createdAt: Date;
}

const SongSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<ISong>("Song", SongSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

interface MusicData extends Document {
  id: string;
  imgUrl: string;
  artistId: string;
  artistImgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
  duration: number;
  tracks: number;
  score: number;
}

const musicSchema = new mongoose.Schema({
  id: String,
  imgUrl: String,
  artistId: String,
  artistImgUrl: String,
  artist: String,
  album: String,
  label: String,
  releaseDate: String,
  genre: String,
  link: String,
  text: String,
  uploadDate: String,
  duration: Number,
  tracks: Number,
  score: Number,
});

const Music: Model<MusicData> =
  mongoose.models.Music || mongoose.model<MusicData>("Music", musicSchema);

export default Music;

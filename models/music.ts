import mongoose, { Schema, Document, Model } from "mongoose";

interface Video extends Document {
  title: string;
  url: string;
}

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
  musicVideoTitle: string;
  musicVideoUrl: string;
  videos: Video[];
}

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
});

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
  musicVideoTitle: String,
  musicVideoUrl: String,
  videos: [videoSchema],
});

const Music: Model<MusicData> =
  mongoose.models.Music || mongoose.model<MusicData>("Music", musicSchema);

export default Music;

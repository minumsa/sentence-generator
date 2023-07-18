import mongoose, { Schema, Document, Model } from "mongoose";

interface MusicData extends Document {
  albumId: string;
  text: string;
}

const musicSchema = new mongoose.Schema({
  albumId: String,
  genre: String,
  link: String,
  text: String,
});

const Music: Model<MusicData> = mongoose.model<MusicData>("Music", musicSchema);

export default Music;

import mongoose, { Schema, Document, Model } from "mongoose";

interface MusicData extends Document {
  albumId: string;
  text: string;
}

const musicSchema: Schema<MusicData> = new Schema(
  {
    albumId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // date created, updated
);

const Music: Model<MusicData> = mongoose.model<MusicData>("Music", musicSchema);

export default Music;

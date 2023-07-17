import mongoose, { Schema, Document, Model } from "mongoose";

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      trim: true, // 공백 제거
      maxLength: 30,
    },
    name: {
      type: String,
      minlength: 5,
    },
    password: {
      type: String,
      maxlength: 20,
    },
  },
  { timestamps: true } // date created, updated
);

let User: Model<UserDocument>;

try {
  User = mongoose.model<UserDocument>("User");
} catch {
  User = mongoose.model<UserDocument>("User", userSchema);
}

export default User;

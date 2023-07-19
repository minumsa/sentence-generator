import mongoose from "mongoose";

const connectMongoDB = async () => {
  require("dotenv").config();

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;

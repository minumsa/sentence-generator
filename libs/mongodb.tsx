import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    // await mongoose.connect(
    //   "mongodb+srv://carver1014:carver1014@cluster0.wxopfcr.mongodb.net/?retryWrites=true&w=majority"
    // );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;

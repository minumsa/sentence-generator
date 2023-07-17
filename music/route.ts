import connectMongoDB from "@/libs/mongodb";
import Music from "@/models/music";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createMusic(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      await connectMongoDB();

      const { albumId, text } = request.body;

      const existingMusic = await Music.findOne({ albumId });
      if (existingMusic) {
        return response.status(409).json({ message: "album already exists" });
      }

      const newMusic = new Music({ albumId, text });
      await newMusic.save();

      return response.status(201).json({ message: "Music created" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}

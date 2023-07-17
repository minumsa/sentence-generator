import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createUser(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      await connectMongoDB();

      const { email, name, password } = request.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(409).json({ message: "Email already exists" });
      }

      const newUser = new User({ email, name, password });
      await newUser.save();

      return response.status(201).json({ message: "User created" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}

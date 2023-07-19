import connectMongoDB from "@/libs/mongodb";
import Music from "@/models/music";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// 문서가 어디??

export async function POST(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // body: JSON.stringify(newItem) <=== 얘를 변수로 설정한 것!
    const { data, password } = await request.json();
    const { imgUrl, artist, album, label, releaseDate, genre, link, text } =
      data;

    if (password !== process.env.UPROAD_PASSWORD)
      return NextResponse.json(
        { message: "password is not correct" },
        { status: 400 }
      );

    const existingData = await Music.findOne({ imgUrl });

    // NextResponse.json({ message: "Music created" }, { status: 201 });
    // NextResponse.json({ message: "Server Error" }, { status: 500 });

    // return하는 값에 따라 next.js가 밑으로 내려준다?!..
    // return 값에 써있는 내용물을 응답으로 내려준다!

    if (existingData) {
      return NextResponse.json(
        { message: "album already exists" },
        { status: 409 }
      );
    }

    const newData = new Music({
      imgUrl,
      artist,
      album,
      label,
      releaseDate,
      genre,
      link,
      text,
    });
    await newData.save();
    return NextResponse.json(newData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();
    const dataArr = await Music.find();
    return NextResponse.json(dataArr.map(data => data.toJSON()));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

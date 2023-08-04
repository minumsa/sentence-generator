import connectMongoDB from "@/libs/mongodb";
import Music from "@/models/music";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // body: JSON.stringify(newItem) <=== 얘를 변수로 설정한 것!
    const { data, password } = await request.json();
    const {
      id,
      imgUrl,
      artist,
      album,
      label,
      releaseDate,
      genre,
      link,
      text,
      uploadDate,
      duration,
      tracks,
    } = data;

    if (password !== process.env.UPROAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const existingData = await Music.findOne({ id });

    // NextResponse.json({ message: "Music created" }, { status: 201 });
    // NextResponse.json({ message: "Server Error" }, { status: 500 });

    // return하는 값에 따라 next.js가 밑으로 내려준다?!..
    // return 값에 써있는 내용물을 응답으로 내려준다!

    if (existingData) {
      return NextResponse.json({ message: "album already exists" }, { status: 409 });
    }

    const newData = new Music({
      id,
      imgUrl,
      artist,
      album,
      label,
      releaseDate,
      genre,
      link,
      text,
      uploadDate,
      duration,
      tracks,
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

export async function DELETE(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const { id, password } = await request.json();

    if (password !== process.env.UPROAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const existingData = await Music.findOne({ id });

    if (!existingData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    await existingData.deleteOne();

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const { albumId, data, password } = await request.json();
    const {
      id,
      imgUrl,
      artist,
      album,
      label,
      releaseDate,
      genre,
      link,
      text,
      uploadDate,
      duration,
      tracks,
    } = data;

    if (password !== process.env.UPROAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const existingData = await Music.findOne({ id });

    if (!existingData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

    existingData.id = id;
    existingData.imgUrl = imgUrl;
    existingData.artist = artist;
    existingData.album = album;
    existingData.label = label;
    existingData.releaseDate = releaseDate;
    existingData.genre = genre;
    existingData.link = link;
    existingData.text = text;
    existingData.uploadDate = uploadDate;
    existingData.duration = duration;
    existingData.tracks = tracks;

    await existingData.save();
    return NextResponse.json(existingData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

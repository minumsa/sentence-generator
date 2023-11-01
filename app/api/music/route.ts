import connectMongoDB from "@/app/music/lib/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

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

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const existingData = await Music.findOne({ id });

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

// export async function GET(request: Request) {
//   try {
//     require("dotenv").config();
//     await connectMongoDB();
//     const dataArr = await Music.find();

//     // 배열의 1~5번째 요소를 추출
//     const slicedData = dataArr.map(data => data.toJSON()).slice(0, 5);
//     return NextResponse.json(slicedData);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }

export async function DELETE(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const { id, password } = await request.json();

    if (password !== process.env.UPLOAD_PASSWORD)
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

    if (password !== process.env.UPLOAD_PASSWORD)
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

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

    // 기본 데이터 가져오기

    const url = new URL(request.url);
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const currentPage = Number(url.searchParams.get("currentPage"));
    const pathName = url.searchParams.get("pathName");

    // pathName이 있는 경우 해당 장르로 필터링, 그렇지 않으면 모든 데이터 가져오기
    const query = pathName ? { genre: pathName } : {};
    const genreDataLength = await Music.find(query).count();

    // 페이지별 필터링 (MongoDB 메서드 사용)
    // TODO: 몽고DB 메서드 skip, limit 등 나중에 블로그에 정리
    const startIndex = perPageCount * currentPage - perPageCount;
    const slicedData = await Music.find(query) //
      .skip(startIndex) //
      .limit(perPageCount);

    return NextResponse.json({ slicedData, genreDataLength });
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

    // 수정할 데이터를 id로 찾아 originalData라는 변수에 할당
    const originalData = await Music.findOne({ id });

    if (!originalData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

    // TODO: Object.assign 메서드 나중에 블로그에 정리
    Object.assign(originalData, {
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

    await originalData.save();
    return NextResponse.json(originalData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // 몽고DB에서 데이터 가져오기
    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("currentPage"));
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const pathName = url.searchParams.get("pathName");
    const currentMethod = url.searchParams.get("currentMethod");
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;

    let sortKey = {};

    if (currentMethod === "발매일") {
      sortKey = { releaseDate: currentCriteria };
    } else if (currentMethod === "작성일") {
      sortKey = { uploadDate: currentCriteria };
    } else if (currentMethod === "아티스트") {
      sortKey = { artist: currentCriteria };
    } else if (currentMethod === "앨범") {
      sortKey = { album: currentCriteria };
    } else if (currentMethod === "평점") {
      sortKey = { score: currentCriteria, artist: 1 };
    }

    // pathName이 장르(pop, kpop...)인 경우 해당 장르로 필터링
    // 그렇지 않으면 모든 데이터 가져오기(query === {})
    let query = undefined;

    if (pathName === "") {
      query = {};
    } else {
      query = { genre: pathName };
    }

    let genreDataLength = await Music.find(query).count();

    // 페이지, 정렬 상태에 따라 데이터 필터링해서 가져오기
    // TODO: 몽고DB 메서드 skip, limit 등 나중에 블로그에 정리
    const startIndex = perPageCount * currentPage - perPageCount;
    let slicedData = undefined;

    if (pathName === "") {
      slicedData = await Music.find().sort(sortKey).skip(startIndex).limit(perPageCount);
    } else {
      slicedData = await Music.find(query).sort(sortKey).skip(startIndex).limit(perPageCount);
    }

    return NextResponse.json({ slicedData, genreDataLength });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const { data, score, password } = await request.json();
    const {
      id,
      imgUrl,
      artistImgUrl,
      artistId,
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
      artistImgUrl,
      artistId,
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
      score,
    });
    await newData.save();
    return NextResponse.json(newData.toJSON());
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

    const { currentId, data, score, password } = await request.json();
    const {
      id,
      imgUrl,
      artistImgUrl,
      artistId,
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
    const originalData = await Music.findOne({ id: currentId });

    if (!originalData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

    // TODO: Object.assign 메서드 나중에 블로그에 정리
    Object.assign(originalData, {
      id,
      imgUrl,
      artistId,
      artistImgUrl,
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
      score,
    });

    await originalData.save();
    return NextResponse.json(originalData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

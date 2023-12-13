import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // 몽고DB에서 데이터 가져오기
    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");
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
    }

    const genreDataLength = await Music.find({ artistId: artistId }).count();
    const slicedData = await Music.find({ artistId: artistId });

    return NextResponse.json({ slicedData, genreDataLength });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

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
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const currentMethod = url.searchParams.get("currentMethod");
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;

    let currentPage = 0;

    currentPage = Number(url.searchParams.get("currentPage"));

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
    const startIndex = perPageCount * currentPage - perPageCount;
    const slicedData = await Music.find({ artistId: artistId })
      .skip(startIndex)
      .limit(perPageCount);

    return NextResponse.json({ slicedData, genreDataLength });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

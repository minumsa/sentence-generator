import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const currentPage = Number(url.searchParams.get("currentPage"));
    const startIndex = perPageCount * currentPage - perPageCount;

    type ReleaseDate = 1 | -1;
    const sortKey: { [key: string]: ReleaseDate } = { releaseDate: -1 };

    const artistData = await Music.find({ artistId: artistId })
      .sort(sortKey)
      .skip(startIndex)
      .limit(perPageCount);
    const artistDataCount = await Music.find({ artistId: artistId }).count();

    return NextResponse.json({ artistData, artistDataCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

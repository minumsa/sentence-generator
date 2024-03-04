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

    type ReleaseDate = 1 | -1;
    const sortKey: { [key: string]: ReleaseDate } = { releaseDate: -1 };

    const artistData = await Music.find({ artistId: artistId }).sort(sortKey);
    const artistDataCount = await Music.find({ artistId: artistId }).count();

    return NextResponse.json({ artistData, artistDataCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

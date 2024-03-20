import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";
import { SUB_PER_PAGE_COUNT } from "../../modules/constants";

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // 몽고DB에서 데이터 가져오기
    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("currentPage"));
    const currentKeyword: any = url.searchParams.get("currentKeyword");

    type SortOrder = 1 | -1;
    const sortKey: { [key: string]: SortOrder } = { artist: 1, releaseDate: 1 };
    const query = {};

    let totalDataLength = await Music.find(query).count();
    let startIndex = SUB_PER_PAGE_COUNT * currentPage - SUB_PER_PAGE_COUNT;
    let slicedData = undefined;

    // 'i' 옵션은 대소문자를 구별하지 않도록 설정
    slicedData = await Music.find({
      $or: [
        { text: { $regex: new RegExp(currentKeyword, "i") } },
        { artist: { $regex: new RegExp(currentKeyword, "i") } },
        { album: { $regex: new RegExp(currentKeyword, "i") } },
      ],
    })
      .sort(sortKey)
      .skip(startIndex)
      .limit(SUB_PER_PAGE_COUNT);
    totalDataLength = await Music.find({
      $or: [
        { text: { $regex: new RegExp(currentKeyword, "i") } }, // 'i' 옵션은 대소문자를 구별하지 않도록 설정
        { artist: { $regex: new RegExp(currentKeyword, "i") } },
        { album: { $regex: new RegExp(currentKeyword, "i") } },
      ],
    }).count();

    return NextResponse.json({ slicedData, genreDataLength: totalDataLength });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

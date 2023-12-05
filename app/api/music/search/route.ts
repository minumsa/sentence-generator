import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    // 몽고DB에서 데이터 가져오기
    const url = new URL(request.url);
    const artistId = url.searchParams.get("currentPage");
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const pathName = url.searchParams.get("pathName");
    const currentMethod = url.searchParams.get("currentMethod");
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;
    const currentPage = Number(url.searchParams.get("currentPage"));
    const currentKeyword: any = url.searchParams.get("currentKeyword");

    const isArtistPage = pathName === "artist";
    const isSearchPage = pathName === "search";

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

    // pathName이 장르(pop, kpop...)인 경우 해당 장르로 필터링
    // 그렇지 않으면(post, artist, "") 모든 데이터 가져오기(query === {})
    let query = undefined;

    if (pathName === "artist" || pathName === "search" || pathName === "") {
      query = {};
    } else {
      query = { genre: pathName };
    }

    let dataLength = await Music.find(query).count();
    let startIndex = perPageCount * currentPage - perPageCount;
    let slicedData = undefined;

    slicedData = await Music.find({
      $or: [
        { text: { $regex: new RegExp(currentKeyword, "i") } }, // 'i' 옵션은 대소문자를 구별하지 않도록 설정
        { artist: { $regex: new RegExp(currentKeyword, "i") } },
        { album: { $regex: new RegExp(currentKeyword, "i") } },
      ],
    })
      .sort(sortKey)
      .skip(startIndex)
      .limit(perPageCount);
    dataLength = await Music.find({
      $or: [
        { text: { $regex: new RegExp(currentKeyword, "i") } }, // 'i' 옵션은 대소문자를 구별하지 않도록 설정
        { artist: { $regex: new RegExp(currentKeyword, "i") } },
        { album: { $regex: new RegExp(currentKeyword, "i") } },
      ],
    }).count();

    // startIndex = perPageCount * currentPage - perPageCount;
    //   slicedData = await Music.find(query) //
    //     .sort(sortKey)
    //     .skip(startIndex) //
    //     .limit(perPageCount);

    return NextResponse.json({ slicedData, genreDataLength: dataLength });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

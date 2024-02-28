import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // MongoDB 연결
    await connectMongoDB();

    // URL 파싱
    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("currentPage"));
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const pathName = url.searchParams.get("pathName");
    const currentMethod = url.searchParams.get("currentMethod");
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;
    const currentTagKey = url.searchParams.get("currentTagKey");

    // 정렬 키 설정
    let sortKey = {};
    if (currentMethod === "발매일") {
      sortKey = { releaseDate: currentCriteria };
    } else if (currentMethod === "작성일") {
      sortKey = { uploadDate: currentCriteria };
    } else if (currentMethod === "아티스트") {
      sortKey = { artist: currentCriteria };
    } else if (currentMethod === "앨범") {
      sortKey = { album: currentCriteria };
    } else if (currentMethod === "별점") {
      sortKey = { score: currentCriteria, artist: 1 };
    }

    // 쿼리 구성
    let query: any = {};

    // 메인 페이지인 경우
    const isMainPage = pathName === "";

    // 검색, 태그, 아티스트 페이지인 경우
    const isSearchPage = pathName === "search";

    if (isMainPage || isSearchPage) {
      if (currentTagKey) {
        query.tagKeys = currentTagKey;
      }
    } else {
      query.genre = pathName;
    }

    // MongoDB 쿼리 실행
    const genreDataLength = await Music.find(query).count();
    const startIndex = perPageCount * currentPage - perPageCount;

    let slicedData: any;

    if (isMainPage) {
      slicedData = await Music.find(query).sort(sortKey);
    } else {
      slicedData = await Music.find(query).sort(sortKey).skip(startIndex).limit(perPageCount);
    }

    // 결과 반환
    return NextResponse.json({ slicedData, genreDataLength });
  } catch (error) {
    console.error(error);
    // 클라이언트에게 더 유용한 에러 메시지를 반환
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const { data, score, videos, tagKeys, password } = await request.json();
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
      videos,
      tagKeys,
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

    const { currentId, newSpotifyAlbumData, score, videos, tagKeys, password } =
      await request.json();
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
    } = newSpotifyAlbumData;

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
      videos,
      tagKeys,
    });

    await originalData.save();
    return NextResponse.json(originalData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

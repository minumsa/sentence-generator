import connectMongoDB from "@/app/music/modules/mongodb";
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

    // 몽고DB에서 데이터 가져오기
    const url = new URL(request.url);
    const artistId = url.searchParams.get("currentPage");
    const perPageCount = Number(url.searchParams.get("perPageCount"));
    const pathName = url.searchParams.get("pathName");
    const currentMethod = url.searchParams.get("currentMethod");
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;

    const isArtistPage = pathName === "artist";
    const isSearchPage = pathName === "search";

    let currentPage = 0;
    let keyword: any = "";

    if (isSearchPage) {
      keyword = url.searchParams.get("currentPage");
    } else {
      currentPage = Number(url.searchParams.get("currentPage"));
    }

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

    // const query = pathName ? { genre: pathName } : {};
    let genreDataLength = await Music.find(query).count();

    // 페이지, 정렬 상태에 따라 데이터 필터링해서 가져오기
    // TODO: 몽고DB 메서드 skip, limit 등 나중에 블로그에 정리

    let startIndex = undefined;
    let slicedData = undefined;

    // FIXME: artistId 가 있는지 여부로 확인하는게?
    if (isArtistPage) {
      startIndex = 0;
      slicedData = await Music.find({ artistId: artistId });
      // .skip(startIndex)
      // .limit(perPageCount);
    } else if (isSearchPage) {
      startIndex = 0;
      slicedData = await Music.find({
        $or: [
          { text: { $regex: new RegExp(keyword, "i") } }, // 'i' 옵션은 대소문자를 구별하지 않도록 설정
          { artist: { $regex: new RegExp(keyword, "i") } },
          { album: { $regex: new RegExp(keyword, "i") } },
        ],
      });
      genreDataLength = await Music.find({
        $or: [
          { text: { $regex: new RegExp(keyword, "i") } }, // 'i' 옵션은 대소문자를 구별하지 않도록 설정
          { artist: { $regex: new RegExp(keyword, "i") } },
          { album: { $regex: new RegExp(keyword, "i") } },
        ],
      }).count();
      // .skip(startIndex)
      // .limit(perPageCount);
    } else {
      startIndex = perPageCount * currentPage - perPageCount;
      slicedData = await Music.find(query) //
        .sort(sortKey)
        .skip(startIndex) //
        .limit(perPageCount);
    }

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

    const { originalId, artistId, data, password } = await request.json();
    const {
      id,
      imgUrl,
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
    });

    await originalData.save();
    return NextResponse.json(originalData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

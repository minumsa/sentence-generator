import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";
import { isMainPage, isSearchPage } from "../modules/utils";
import { PER_PAGE_COUNT, SUB_PER_PAGE_COUNT } from "../modules/constants";
import { SortOrder } from "mongoose";

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("currentPage"));
    const pathName = url.searchParams.get("pathName") ?? "";
    const currentCriteria = url.searchParams.get("currentCriteria") === "오름차순" ? 1 : -1;
    const currentTagKey = url.searchParams.get("currentTagKey");
    let perPageCount: number;

    if (pathName === "") {
      perPageCount = PER_PAGE_COUNT;
    } else {
      perPageCount = SUB_PER_PAGE_COUNT;
    }

    interface SortKey {
      [key: string]: SortOrder;
    }

    const sortKey: SortKey = { score: currentCriteria, artist: 1 };

    interface Query {
      tagKeys?: string;
      genre?: string;
    }

    let query: Query = {};

    if (isMainPage(pathName) || isSearchPage(pathName)) {
      if (currentTagKey) {
        query.tagKeys = currentTagKey;
      }
    } else {
      query.genre = pathName;
    }

    const genreDataLength = await Music.find(query).count();

    // const skipCount = (currentPage - 1) * perPageCount;

    const skipCount = PER_PAGE_COUNT * currentPage - PER_PAGE_COUNT + 1;
    const slicedData =
      currentPage === 1
        ? await Music.find(query)
            .sort(sortKey)
            .skip(skipCount)
            .limit(PER_PAGE_COUNT - 1)
        : await Music.find(query).sort(sortKey).skip(skipCount).limit(PER_PAGE_COUNT);

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

    const {
      newSpotifyAlbumData,
      genre,
      link,
      text,
      uploadDate,
      score,
      videos,
      tagKeys,
      blurHash,
      password,
    } = await request.json();
    const {
      id,
      imgUrl,
      artistImgUrl,
      artistId,
      artist,
      album,
      label,
      releaseDate,
      duration,
      tracks,
    } = newSpotifyAlbumData;

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
      blurHash,
    });
    await newData.save();
    return NextResponse.json(newData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// 수정 API
export async function PUT(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const {
      newSpotifyAlbumData,
      genre,
      link,
      text,
      uploadDate,
      score,
      videos,
      tagKeys,
      blurHash,
      password,
    } = await request.json();
    const {
      id,
      imgUrl,
      artistImgUrl,
      artistId,
      artist,
      album,
      label,
      releaseDate,
      duration,
      tracks,
    } = newSpotifyAlbumData;

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    // 수정할 데이터를 id로 찾아 originalData에 할당
    const originalData = await Music.findOne({ id });

    if (!originalData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

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
      blurHash,
    });

    await originalData.save();
    return NextResponse.json(originalData.toJSON());
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

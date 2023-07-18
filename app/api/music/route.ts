import connectMongoDB from "@/libs/mongodb";
import Music from "@/models/music";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// 문서가 어디??

export async function POST(request: Request) {
  // NextResponse.json.("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Methods", "POST");
  // return NextResponse.json(
  //   { message: "yooil" },
  //   {
  //     headers: {
  //       // "Access-Control-Allow-Origin": "*",
  //       // cors 때문에 넣음, 보안 정책
  //       // 신경 쓸 필요 x ===> 없어도 됨!
  //       "Access-Control-Allow-Methods": "POST",
  //     },
  //   }
  // );

  // http 요청에 대한 응답 ===> 내용물 + 추가 정보
  // 추가 정보를 넣는 방법 ===> http는 http header를 사용
  // 요청 응답 시 http header 사용

  // NextResponse.json({ data })

  try {
    await connectMongoDB();

    // body: JSON.stringify(newItem) <=== 얘를 변수로 설정한 것!
    const { albumId, genre, link, text } = await request.json();
    const existingMusic = await Music.findOne({ albumId });

    // NextResponse.json({ message: "Music created" }, { status: 201 });
    // NextResponse.json({ message: "Server Error" }, { status: 500 });

    // return하는 값에 따라 next.js가 밑으로 내려준다?!..
    // return 값에 써있는 내용물을 응답으로 내려준다!

    if (existingMusic) {
      return NextResponse.json(
        { message: "album already exists" },
        { status: 409 }
      );
    }

    const newMusic = new Music({ albumId, genre, link, text });
    await newMusic.save();
    return NextResponse.json(newMusic.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const musicList = await Music.find();
    return NextResponse.json(musicList.map(data => data.toJSON()));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

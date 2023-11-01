import connectMongoDB from "@/app/music/lib/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

// FIXME: 폴더명 수정 및 리팩토링
export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const url = new URL(request.url);
    const variablePathName = url.searchParams.get("variablePathName");

    // 몽고디비에서 id가 variablePathName과 일치하는 데이터를 찾는다
    const data = await Music.findOne({ id: variablePathName });

    if (!data) {
      return NextResponse.json({ message: "데이터를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}

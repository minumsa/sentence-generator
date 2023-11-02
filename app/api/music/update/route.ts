import connectMongoDB from "@/app/music/lib/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";

// FIXME: 폴더명 수정 및 리팩토링
export async function GET(request: Request) {
  try {
    require("dotenv").config();
    await connectMongoDB();

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // 몽고디비 아이템의 id와 파라미터로 받아온 id가 일치하는 데이터를 찾음
    const data = await Music.findOne({ id: id });

    if (!data) {
      return NextResponse.json({ message: "데이터를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}

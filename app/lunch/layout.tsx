import React from "react";
import Lunch from "./Lunch";

export const metadata = {
  title: "오늘의 점심",
  // description:
  //   "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
  openGraph: {
    images: [{ url: "/lunch_thumbnail.webp", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "오늘의 점심",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "오늘의 점심을 추천해드립니다.",
    images: ["https://divdivdiv.com/lunch_thumbnail"],
    title: "오늘의 점심",
  },
};

type Props = {
  children: React.ReactNode;
};

function Layout() {
  return (
    <div>
      <Lunch />
    </div>
  );
}

export default Layout;

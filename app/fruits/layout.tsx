import React from "react";
import Fruits from "./Fruits";

export const metadata = {
  title: "과일 생성기",
  openGraph: {
    images: [{ url: "/pu-thumbnail-1800x945.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "과일 생성기",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "화면의 특정 위치에 랜덤하게 과일이 생성된다.",
    images: ["https://divdivdiv.com/pu-thumbnail-1800x945.png"],
    title: "과일 생성기",
  },
};

type Props = {
  children: React.ReactNode;
};

function Layout() {
  return (
    <div>
      <Fruits />
    </div>
  );
}

export default Layout;

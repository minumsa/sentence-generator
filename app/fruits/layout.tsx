import React from "react";

export const metadata = {
  title: "과일 생성기",
  openGraph: {
    images: [{ url: "/fruits-thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "과일 생성기",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "화면의 특정 위치에 랜덤하게 과일이 생성된다.",
    images: ["https://divdivdiv.com/fruits-thumbnail.png"],
    title: "과일 생성기",
  },
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;

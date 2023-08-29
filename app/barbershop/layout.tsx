import React from "react";

export const metadata = {
  title: "바버샵",
  openGraph: {
    title: "바버샵",
    // images: [{ url: "/cinephile/thumbnail.webp", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    type: "website",
    // description: "나의 시네필 평점은 몇 점일까?",
  },
  twitter: {
    title: "바버샵",
    card: "summary_large_image",
    creator: "@dev_carver",
    // description: "나의 시네필 평점은 몇 점일까?",
    // images: ["https://divdivdiv.com/cinephile/thumbnail.webp"],
  },
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;

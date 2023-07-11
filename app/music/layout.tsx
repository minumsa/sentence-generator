import React from "react";

export const metadata = {
  title: "카버 차트",
  // description:
  //   "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
  openGraph: {
    // images: [{ url: "/lunch_thumbnail.webp", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "카버 차트",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "카버 차트",
    // images: ["https://divdivdiv.com/lunch_thumbnail"],
    title: "카버 차트",
  },
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
  // return <Music />;
};

export default Layout;

import React from "react";

export const metadata = {
  title: "직유법 생성기",
  // description:
  //   "데이터베이스에 있는 약 100개의 단어들이 경우의 수에 따라 랜덤하게 조합되며 화면에 다양한 직유법을 만들어냅니다.",
  openGraph: {
    // images: [{ url: "/words/thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "직유법 생성기",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description:
      "데이터베이스에 있는 약 100개의 단어들이 경우의 수에 따라 랜덤하게 조합되며 화면에 다양한 직유법을 만들어냅니다.",
    // images: ["https://divdivdiv.com/words/thumbnail.png"],
    title: "직유법 생성기",
  },
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <body>{children}</body>;
};

export default Layout;

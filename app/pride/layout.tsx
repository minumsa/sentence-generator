import React from "react";

export const metadata = {
  title: "퀴어 문장 생성기",
  // description:
  //   "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
  openGraph: {
    images: [{ url: "/pride/thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "퀴어 문장 생성기",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description:
      "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
    images: ["https://divdivdiv.com/pride/thumbnail.png"],
    title: "퀴어 문장 생성기",
  },
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;

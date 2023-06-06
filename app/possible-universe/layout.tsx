import React from "react";
import RandomSentenceGenerator from "./RandomSentenceGenerator";

export const metadata = {
  title: "가능세계: 퀴어 문장 생성기",
  // description:
  //   "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
  openGraph: {
    // ...openGraphImage,
    images: [{ url: "/pu-thumbnail.png", width: 800, height: 600 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    title: "가능세계: 퀴어 문장 생성기",
    type: "website",
    // description:
    //   "데이터에 입력된 주어, 동사, 목적어가 무작위하게 조합되며 다양한 퀴어 문장을 생성한다. 모든 문장은 미래형이며 아직은 완성되지 못한 가능세계를 암시한다.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    images: ["/pu-thumbnail.png"],
    title: "가능세계: 퀴어 문장 생성기",
  },
};

type Props = {
  children: React.ReactNode;
};

// function TestLayout({ children }: Props) {
function TestLayout() {
  return (
    <div>
      <RandomSentenceGenerator
        initialSubject={"Pride"}
        initialObject={"Month"}
        initialVerb={"2023"}
      />
      {/* <div className="w-full">{children}</div> */}
    </div>
  );
}

export default TestLayout;

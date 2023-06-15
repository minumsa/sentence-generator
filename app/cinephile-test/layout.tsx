import React from "react";
import Cinephile from "./Cinephile";

export const metadata = {
  title: "씨네필 테스트",
  openGraph: {
    title: "씨네필 테스트",
    // images: [{ url: "/cinephile-thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    type: "website",
  },
  twitter: {
    title: "씨네필 테스트",
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "당신의 씨네필 레벨을 테스트 해보세요.",
    // images: ["https://divdivdiv.com/cinephile-thumbnail.png"],
  },
};

type Props = {
  children: React.ReactNode;
};

function Layout() {
  return (
    <div>
      <Cinephile />
    </div>
  );
}

export default Layout;

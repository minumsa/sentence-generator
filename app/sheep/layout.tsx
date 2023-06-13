import React from "react";
import Sheep from "./Sheep";

export const metadata = {
  title: "복제양 뽀모도로",
  openGraph: {
    title: "복제양 뽀모도로",
    images: [{ url: "/sheep-thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "divdivdiv",
    type: "website",
  },
  twitter: {
    title: "복제양 뽀모도로",
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "집중에 성공해 양을 최대한 많이 만드세요.",
    images: ["https://divdivdiv.com/sheep-thumbnail.png"],
  },
};

type Props = {
  children: React.ReactNode;
};

function Layout() {
  return (
    <div>
      <Sheep />
    </div>
  );
}

export default Layout;

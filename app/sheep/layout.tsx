import React from "react";
import Lambs from "./Sheep";

export const metadata = {
  title: "I am a sheep",
  openGraph: {
    images: [{ url: "/lambs-thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "",
    title: "Sheep",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_carver",
    description: "I am a sheep",
    images: ["https://divdivdiv.com/lambs-thumbnail.png"],
    title: "I am a sheep",
  },
};

type Props = {
  children: React.ReactNode;
};

function Layout() {
  return (
    <div>
      <Lambs />
    </div>
  );
}

export default Layout;

import React from "react";
import Lambs from "./Lambs";

export const metadata = {
  title: "양 한 마리",
  openGraph: {
    images: [{ url: "/pu-thumbnail-1800x945.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    siteName: "",
    title: "양 한 마리",
    type: "website",
  },
  twitter: {
    card: "",
    creator: "@dev_carver",
    description: "",
    images: ["https://divdivdiv.com/pu-thumbnail-1800x945.png"],
    title: "",
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

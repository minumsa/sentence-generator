import React from "react";
import Lambs from "./Lambs";

export const metadata = {
  title: "양 한 마리",
  openGraph: {
    images: [{ url: "/lambs-thumbnail.png", width: 1800, height: 945 }],
    locale: "ko_KR",
    siteName: "",
    title: "양 한 마리",
    type: "website",
  },
  twitter: {
    card: "",
    creator: "@dev_carver",
    description: "",
    images: ["https://divdivdiv.com/lambs-thumbnail.png"],
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

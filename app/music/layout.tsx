/* eslint-disable react/no-children-prop */
import React from "react";
import styles from "./music.module.css";

export const metadata = {
  title: "카버 차트",
  // description:
  //   "",
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
  return <body className={styles["body"]}>{children}</body>;
};

export default Layout;

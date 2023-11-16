"use client";

import { usePathname } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, isMainPage } from "../modules/data";
import Content from "../components/Content";
import { Hamburger } from "../components/Hamburger";
import { MobileTitle } from "../components/MobileTitle";
import { Category } from "../components/Category";
import { Post } from "../components/Post";
import Snowfall from "react-snowfall";
import { isMobile } from "react-device-detect";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();
  const isPostPage = pathName.length > 20;

  return (
    <div className={styles["container"]}>
      <div className={styles["snowfall-container"]}>
        <Snowfall
          snowflakeCount={isMobile ? 90 : 110}
          speed={isMobile ? [0, 2] : [0, 2.5]}
          radius={isMobile ? [0.1, 1.2] : undefined}
        />
      </div>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        {isPostPage ? (
          <Post pathName={pathName} isPostPage={isPostPage} />
        ) : (
          <Content
            pathName={isMainPage(pathName) ? "" : pathName}
            fullPathName={fullPathName}
            currentPage={isMainPage(pathName) ? Number(pathName) : 1}
          />
        )}
      </div>
    </div>
  );
}

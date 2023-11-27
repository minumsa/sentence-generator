"use client";

import { usePathname } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, isMainPage } from "../modules/data";
import Content from "../components/Content";
import { Hamburger } from "../components/Hamburger";
import { MobileTitle } from "../components/MobileTitle";
import { Category } from "../components/Category";
import { Post } from "../components/Post";
import { Snow } from "../components/Snow";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();
  // const isSearchPage = pathName.length > 20;
  const isPostPage = pathName.length > 20;

  return (
    <div className={styles["container"]}>
      <Snow />
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

"use client";

import { usePathname } from "next/navigation";
import styles from "../../music.module.css";
import { PageProps, isMainPage } from "../../modules/data";
import Content from "../../components/Content";
import { Hamburger } from "../../components/Hamburger";
import { MobileTitle } from "../../components/MobileTitle";
import { Category } from "../../components/Category";
import { Snow } from "../../components/Snow";
import { Post } from "../../components/Post";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const currentPage: any = params.page;
  const fullPathName = usePathname();
  const isPostPage = pathName.includes("post");
  const isArtistPage = pathName.includes("artist");
  const isSearchPage = pathName.includes("search");

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
          <Post pathName={currentPage} isPostPage={isPostPage} />
        ) : (
          <Content
            pathName={isMainPage(pathName) ? "" : pathName}
            fullPathName={fullPathName}
            currentPage={
              isArtistPage || isPostPage || isSearchPage ? currentPage : Number(currentPage)
            }
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import styles from "../../../music.module.css";
import { PageProps, isMainPage, isUploadPage } from "@/app/music/modules/data";
import Upload from "@/app/music/components/Upload";
import Content from "@/app/music/components/Content";
import { Category } from "@/app/music/components/Category";
import { MobileTitle } from "@/app/music/components/MobileTitle";
import { Hamburger } from "@/app/music/components/Hamburger";
import { Snow } from "@/app/music/components/Snow";
import { Post } from "@/app/music/components/Post";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const currentPage: any = params.page;
  const fullPathName = usePathname();
  const isPostPage = pathName.includes("post");
  const isArtistPage = pathName.includes("artist");
  const isSearchPage = pathName.includes("search");

  // http://localhost:3000/music/admin/search/earth

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        {isUploadPage(pathName) ? (
          <Upload idByPathName={pathName} />
        ) : isPostPage ? (
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

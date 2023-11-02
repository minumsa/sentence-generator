"use client";

import { usePathname } from "next/navigation";
import styles from "../../../music.module.css";
import { PageProps, isMainPage, isUploadPage } from "@/app/music/modules/data";
import Upload from "@/app/music/components/Upload";
import Content from "@/app/music/components/Content";
import { Category } from "@/app/music/components/Category";
import { MobileTitle } from "@/app/music/components/MobileTitle";
import { Hamburger } from "@/app/music/components/Hamburger";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        {isUploadPage(pathName) ? (
          <Upload idByPathName={pathName} />
        ) : (
          <Content pathName={isMainPage(pathName) ? "" : pathName} fullPathName={fullPathName} />
        )}
      </div>
    </div>
  );
}

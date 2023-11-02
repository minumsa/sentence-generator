"use client";

import { usePathname } from "next/navigation";
import styles from "../../music.module.css";
import { PageProps, isMainPage, isUploadPage } from "../../modules/data";
import Content from "../../components/Content";
import Upload from "../../components/Upload";
import { MobileTitle } from "../../components/MobileTitle";
import { Hamburger } from "../../components/Hamburger";
import { Category } from "../../components/Category";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} />
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

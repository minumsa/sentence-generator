"use client";

import { usePathname } from "next/navigation";
import { Category } from "./Category";
import { MobileHamburgerMenu } from "./MobileHamburgerMenu";
import { MobileTitle } from "./MobileTitle";
import styles from "../music.module.css";
import { isUploadPage } from "../modules/data";
import ScrollBar from "./ScrollBar";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center" }}>
      <div className={styles["container"]}>
        {/* FIXME: 나중에 TopNav 살리기 */}
        {/* <TopNav isVisible={isUploadPage(pathName) || isPostPage(pathName) ? false : true} /> */}
        <header className={styles["category-container"]}>
          {/* <MobileHamburgerMenu />
          <MobileTitle />
          <MobileHamburgerMenu /> */}
          <Category />
        </header>
        <main
          className={styles["content-container"]}
          style={{ alignItems: isUploadPage(pathName) ? "center" : undefined }}
        >
          {children}
        </main>
        {/* 스크롤 바 추가 */}
        {/* <ScrollBar /> */}
      </div>
    </div>
  );
};

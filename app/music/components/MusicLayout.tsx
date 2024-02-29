"use client";

import { usePathname } from "next/navigation";
import { Category } from "./Category";
import styles from "../music.module.css";
import { isUploadPage } from "../modules/data";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center" }}>
      <div className={styles["container"]}>
        <header className={styles["category-container"]}>
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

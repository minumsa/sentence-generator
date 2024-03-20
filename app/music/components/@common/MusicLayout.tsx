"use client";

import { usePathname } from "next/navigation";
import { Category } from "./header/Category";
import styles from "../../music.module.css";
import { Snow } from "./Snow";
import { isUploadPage } from "../../modules/utils";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center" }}>
      {/* <Snow /> */}
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
      </div>
    </div>
  );
};

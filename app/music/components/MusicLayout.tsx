"use client";

import { usePathname } from "next/navigation";
import { Category } from "./Category";
import { Hamburger } from "./Hamburger";
import { MobileTitle } from "./MobileTitle";
import styles from "../music.module.css";
import { Snow } from "./Snow";
import { TopNav } from "./TopNav";
import { isAdminPage, isUploadPage } from "../modules/data";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const fullPathName = usePathname();

  console.log(pathName);

  return (
    <div className={styles["container"]}>
      <TopNav isVisible={isUploadPage(pathName) ? false : true} />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

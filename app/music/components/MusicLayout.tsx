"use client";

import { usePathname } from "next/navigation";
import { Category } from "./Category";
import { Hamburger } from "./Hamburger";
import { MobileTitle } from "./MobileTitle";
import { Snow } from "./Snow";
import styles from "../music.module.css";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

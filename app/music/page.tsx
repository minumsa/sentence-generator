"use client";

import { usePathname } from "next/navigation";
import styles from "./music.module.css";
import Content from "./components/Content";
import { MobileTitle } from "./components/MobileTitle";
import { Hamburger } from "./components/Hamburger";
import { Category } from "./components/Category";

export default function Page() {
  const pathName = "";
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} currentPage={1} />
      </div>
    </div>
  );
}

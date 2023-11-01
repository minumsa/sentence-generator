"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents, initialCurrentPage } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";
import { useState } from "react";
import { useAtom } from "jotai";
import { MobileTitle } from "./lib/MobileTitle";
import { Hamburger } from "./lib/Hamburger";
import { Category } from "./lib/Category";

export default function Page() {
  const pathName = "";
  const fullPathName = usePathname();
  const isMainPage = Number(pathName) > 0;

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} />
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={isMainPage ? "" : pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

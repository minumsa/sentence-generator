"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../../music.module.css";
import { useEffect, useState } from "react";
import { PageProps, activeStyle, contents, initialCurrentPage } from "../../lib/data";
import Content from "../../lib/Content";
import { Hamburger } from "../../lib/Hamburger";
import { MobileTitle } from "../../lib/MobileTitle";
import { Category } from "../../lib/Category";

export default function Page({ params }: PageProps) {
  const currentCategory = params.genre;
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
        <Content pathName={currentCategory} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

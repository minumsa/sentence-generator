"use client";

import { usePathname } from "next/navigation";
import styles from "../../music.module.css";
import { PageProps, isMainPage } from "../../modules/data";
import { Snow } from "../../components/Snow";
import { MobileTitle } from "../../components/MobileTitle";
import { Hamburger } from "../../components/Hamburger";
import { Category } from "../../components/Category";
import Content from "../../components/Content";

export default function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={"search"} />
        <Category pathName={"search"} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={"search"} fullPathName={fullPathName} currentPage={currentKeyword} />
      </div>
    </div>
  );
}

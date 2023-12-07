"use client";

import { usePathname } from "next/navigation";
import styles from "../music.module.css";
import { Snow } from "../components/Snow";
import { PageProps } from "../modules/data";
import { MobileTitle } from "../components/MobileTitle";
import { Hamburger } from "../components/Hamburger";
import { Category } from "../components/Category";
import Upload from "../components/Upload";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Upload />
      </div>
    </div>
  );
}

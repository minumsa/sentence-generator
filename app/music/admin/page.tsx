"use client";

import { usePathname } from "next/navigation";
import styles from "../music.module.css";
import { Snow } from "../components/Snow";
import { MobileTitle } from "../components/MobileTitle";
import { Hamburger } from "../components/Hamburger";
import { Category } from "../components/Category";
import { Grid } from "../components/Grid";

export default function Page() {
  const pathName = "";
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
        <Grid />
      </div>
    </div>
  );
}

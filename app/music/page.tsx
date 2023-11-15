"use client";

import { usePathname } from "next/navigation";
import styles from "./music.module.css";
import Content from "./components/Content";
import { MobileTitle } from "./components/MobileTitle";
import { Hamburger } from "./components/Hamburger";
import { Category } from "./components/Category";
import { Grid } from "./components/Grid";
import Snowfall from "react-snowfall";

export default function Page() {
  const pathName = "";
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snowfall snowflakeCount={150} speed={[0, 2]} />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Grid />
        {/* <Content pathName={pathName} fullPathName={fullPathName} currentPage={1} /> */}
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import styles from "../../music.module.css";
import { Snow } from "../../components/Snow";
import { PageProps } from "../../modules/data";
import { MobileTitle } from "../../components/MobileTitle";
import { Hamburger } from "../../components/Hamburger";
import { Category } from "../../components/Category";
import Update from "../../components/Update";

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={""} />
        <Category pathName={""} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Update currentId={currentId} />
      </div>
    </div>
  );
}

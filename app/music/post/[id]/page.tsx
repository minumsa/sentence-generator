"use client";

import { usePathname } from "next/navigation";
import styles from "../../music.module.css";
import { PageProps } from "../../modules/data";
import { Hamburger } from "../../components/Hamburger";
import { MobileTitle } from "../../components/MobileTitle";
import { Category } from "../../components/Category";
import { Snow } from "../../components/Snow";
import { Post } from "../../components/Post";

export default function Page({ params }: PageProps) {
  const pathName = params.id;
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
        <Post pathName={pathName} isPostPage={true} />
      </div>
    </div>
  );
}

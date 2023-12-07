"use client";

import { usePathname } from "next/navigation";
import styles from "../../../music.module.css";
import { Snow } from "@/app/music/components/Snow";
import { MobileTitle } from "@/app/music/components/MobileTitle";
import { Hamburger } from "@/app/music/components/Hamburger";
import { Category } from "@/app/music/components/Category";
import { Post } from "@/app/music/components/Post";
import { PageProps } from "@/app/music/modules/data";

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={"post"} />
        <Category pathName={"post"} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <Post pathName={currentId} />
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import styles from "../../../music.module.css";
import { Snow } from "@/app/music/components/Snow";
import { MobileTitle } from "@/app/music/components/MobileTitle";
import { Hamburger } from "@/app/music/components/Hamburger";
import { Category } from "@/app/music/components/Category";
import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";

export default function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const currentPage: number = params.page;
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
        <SearchContent
          pathName={"search"}
          fullPathName={fullPathName}
          currentKeyword={currentKeyword}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

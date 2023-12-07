"use client";

import { usePathname } from "next/navigation";
import styles from "../../../../music.module.css";
import { Snow } from "@/app/music/components/Snow";
import { PageProps } from "@/app/music/modules/data";
import { MobileTitle } from "@/app/music/components/MobileTitle";
import { Hamburger } from "@/app/music/components/Hamburger";
import { Category } from "@/app/music/components/Category";
import ArtistContent from "@/app/music/components/ArtistContent";

export default function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <Snow />
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={"artist"} />
        <Category pathName={"artist"} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>
        <ArtistContent fullPathName={fullPathName} artistId={artistId} currentPage={currentPage} />
      </div>
    </div>
  );
}

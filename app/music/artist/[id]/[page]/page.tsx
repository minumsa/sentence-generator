"use client";

import { usePathname } from "next/navigation";
import styles from "../../../music.module.css";
import { PageProps } from "../../../modules/data";
import { Hamburger } from "../../../components/Hamburger";
import { MobileTitle } from "../../../components/MobileTitle";
import { Category } from "../../../components/Category";
import { Snow } from "../../../components/Snow";
import ArtistContent from "../../../components/ArtistContent";

export default function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;
  const fullPathName = usePathname();

  console.log(artistId);

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

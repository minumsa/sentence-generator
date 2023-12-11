"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, PageProps, initialAlbumInfo } from "../modules/data";
import { Album } from "./Album";
import styles from "../music.module.css";
import { useRouter } from "next/navigation";

interface PostProps {
  currentId: string;
}

export const Post = ({ currentId }: PostProps) => {
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setData(result);
    }
    getData();
  }, []);

  return (
    <>
      <div className={styles["top-menu-container"]}>
        <div
          className={`${styles["admin-button"]} ${styles["close-button"]}`}
          onClick={() => {
            window.history.length < 2 ? router.push("/music") : router.back();
          }}
        >
          {data.text && "✕"}
        </div>
      </div>
      <Album data={data} isAdminMainPage={false} isPostPage={true} />
    </>
  );
};

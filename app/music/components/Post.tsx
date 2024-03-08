"use client";

import { useEffect, useState } from "react";
import { fetchAlbumById } from "../modules/api";
import { AlbumInfo } from "../modules/data";
import { Loading } from "./Loading";
import styles from "../music.module.css";
import { PostAlbumMetadata } from "./PostAlbumMetadata";
import { PostText } from "./PostAlbumText";

interface PostProps {
  albumId: string;
}

export const Post = ({ albumId }: PostProps) => {
  const [albumData, setAlbumData] = useState<AlbumInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const result = await fetchAlbumById(albumId);
      setAlbumData(result);
      setIsLoading(false);
    }
    getData();
  }, [albumId]);

  return (
    <>
      {albumData && (
        <section className={styles["album-container"]}>
          <PostAlbumMetadata albumData={albumData} />
          <PostText albumData={albumData} />
        </section>
      )}
    </>
  );
};

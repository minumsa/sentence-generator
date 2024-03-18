"use client";

import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";
import { PostAlbumMetadata } from "./PostAlbumMetadata";
import { PostText } from "./PostAlbumText";

interface PostProps {
  albumData: AlbumInfo;
}

export const Post = ({ albumData }: PostProps) => {
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

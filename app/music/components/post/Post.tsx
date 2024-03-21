"use client";

import { AlbumInfo } from "../../modules/types";
import styles from "./Post.module.css";
import { PostAlbumMetadata } from "./PostAlbumMetadata";
import { PostText } from "./PostAlbumText";

interface PostProps {
  albumData: AlbumInfo;
}

export const Post = ({ albumData }: PostProps) => {
  return (
    <>
      {albumData && (
        <section className={styles["container"]}>
          <PostAlbumMetadata albumData={albumData} />
          <PostText albumData={albumData} />
        </section>
      )}
    </>
  );
};

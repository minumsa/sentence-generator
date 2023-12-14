"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo } from "../modules/data";
import { PostCloseButton } from "./PostCloseButton";
import { PostAlbum } from "./PostAlbum";
import { Loading } from "./Loading";

interface PostProps {
  currentId: string;
}

export const Post = ({ currentId }: PostProps) => {
  const [albumData, setAlbumData] = useState<AlbumInfo | undefined>();
  const isLoading = albumData === undefined;

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setAlbumData(result);
    }
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading dataLength={undefined} />
      ) : (
        <>
          <PostCloseButton albumData={albumData} />
          <PostAlbum albumData={albumData} />
        </>
      )}
    </>
  );
};

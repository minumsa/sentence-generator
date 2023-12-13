"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, initialAlbumInfo } from "../modules/data";
import { PostCloseButton } from "./PostCloseButton";
import { PostAlbum } from "./PostAlbum";
import { Loading } from "./Loading";

interface PostProps {
  currentId: string;
}

export const Post = ({ currentId }: PostProps) => {
  const [albumData, setAlbumData] = useState<AlbumInfo>(initialAlbumInfo);
  const isLoading = albumData.id === "";

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

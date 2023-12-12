"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, initialAlbumInfo } from "../modules/data";
import { PostCloseButton } from "./PostCloseButton";
import { PostAlbum } from "./PostAlbum";

interface PostProps {
  currentId: string;
}

export const Post = ({ currentId }: PostProps) => {
  const [albumData, setAlbumData] = useState<AlbumInfo>(initialAlbumInfo);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setAlbumData(result);
    }
    getData();
  }, []);

  return (
    <>
      <PostCloseButton albumData={albumData} />
      <PostAlbum albumData={albumData} />
    </>
  );
};

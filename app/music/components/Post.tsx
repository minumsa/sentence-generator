"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, initialAlbumInfo } from "../modules/data";
import { Album } from "./Album";
import { PostCloseButton } from "./PostCloseButton";

interface PostProps {
  currentId: string;
}

export const Post = ({ currentId }: PostProps) => {
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setData(result);
    }
    getData();
  }, []);

  return (
    <>
      <PostCloseButton data={data} />
      <Album data={data} isAdminMainPage={false} isPostPage={true} />
    </>
  );
};

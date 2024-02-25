"use client";

import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo } from "../modules/data";
import { PostAlbum } from "./PostAlbum";
import { Loading } from "./Loading";

interface PostProps {
  albumId: string;
}

export const Post = ({ albumId }: PostProps) => {
  const [albumData, setAlbumData] = useState<AlbumInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(albumId);
      setAlbumData(result);
      setIsLoading(false);
    }
    getData();
  }, [albumId]);

  return (
    <>
      {isLoading && <Loading isEmpty={false} />}
      {albumData && <PostAlbum albumData={albumData} />}
    </>
  );
};

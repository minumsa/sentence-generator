"use client";

import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";

export async function generateMetadata({ params }: PageProps) {
  const currentId = params.id;
  const data = await fetchDataById(currentId);

  return {
    title: data.album,
    description: data.text,
    images: [{ url: data.imgUrl }],
  };
}

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setData(result);
    }
    getData();
  }, []);

  return (
    <MusicLayout>
      <Post pathName={currentId} />
    </MusicLayout>
  );
}

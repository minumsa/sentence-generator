"use client";

import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";
import { metadata } from "../../layout";

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(currentId);
      setData(result);
    }
    getData();

    metadata.title = data.album;
    metadata.description = data.text;
    metadata.openGraph.images[0].url = data.imgUrl;
  }, []);

  return (
    <MusicLayout>
      <Post pathName={currentId} />
    </MusicLayout>
  );
}

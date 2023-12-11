"use client";

import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";
import Head from "next/head";

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
    <>
      <Head>
        <title>{data.album}</title>
        <meta name="description" content={data.text}></meta>
        <meta name="images" content={data.imgUrl}></meta>
      </Head>
      <MusicLayout>
        <Post pathName={currentId} />
      </MusicLayout>
    </>
  );
}

"use client";

import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";
import { metadata } from "../../layout";
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
        <meta property="og:title" content={data.album} key="title" />
      </Head>
      <MusicLayout>
        <Post pathName={currentId} />
      </MusicLayout>
    </>
  );
}

// export async function generateMetadata({ params }: any) {
//   const id = params.id;
//   const result = await fetchDataById(id);

//   return {
//     title: result.album,
//     description: result.text,
//   };
// }

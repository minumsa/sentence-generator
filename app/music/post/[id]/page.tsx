import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";
import { metadata } from "../../layout";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  // const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  // useEffect(() => {
  //   async function getData() {
  //     const result = await fetchDataById(currentId);
  //     setData(result);
  //   }
  //   getData();
  // }, []);

  return (
    <MusicLayout>
      <Post pathName={currentId} />
    </MusicLayout>
  );
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentId = params.id;
  const data = await fetchDataById(currentId);
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.album,
    description: data.text,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

// Remove the "use client" directive
// "use client";

import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { useEffect, useState } from "react";
import { fetchDataById } from "../../modules/api";
import { metadata } from "../../layout";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Post pathName={currentId} />
    </MusicLayout>
  );
}

export async function generateMetadata({ params }: any) {
  const id = params.id;
  const result = await fetchDataById(id);

  return {
    title: result.album,
    description: result.text,
  };
}

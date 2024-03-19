"use client";

import React, { useState } from "react";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";
import { AlbumInfo } from "../modules/types";

interface ArtistContentProps {
  artistData: AlbumInfo[];
  artistDataCount: number;
  currentPage: number;
}

export default function ArtistContent({
  artistData,
  artistDataCount,
  currentPage,
}: ArtistContentProps) {
  const [perPageCount, setDataPerPage] = useState<number>(5);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={artistDataCount}
    >
      <ArtistPageImage artistData={artistData} />
      <AlbumContents artistData={artistData} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

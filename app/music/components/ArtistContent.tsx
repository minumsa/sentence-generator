"use client";

import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";
import { AlbumInfo } from "../modules/types";
import { SUB_PER_PAGE_COUNT } from "../modules/constants";

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
  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={SUB_PER_PAGE_COUNT}
      totalDataLength={artistDataCount}
    >
      <ArtistPageImage artistData={artistData} />
      <AlbumContents artistData={artistData} perPageCount={SUB_PER_PAGE_COUNT} />
    </ContentLayout>
  );
}

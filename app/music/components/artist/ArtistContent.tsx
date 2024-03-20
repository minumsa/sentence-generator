"use client";

import { AlbumContents } from "../AlbumContents";
import { ContentLayout } from "../ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";
import { AlbumInfo } from "../../modules/types";

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
    <ContentLayout currentPage={currentPage} totalDataLength={artistDataCount}>
      <ArtistPageImage artistData={artistData} />
      <AlbumContents albumData={artistData} />
    </ContentLayout>
  );
}

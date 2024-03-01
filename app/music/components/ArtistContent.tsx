"use client";

import React, { useEffect, useState } from "react";
import { AlbumInfo } from "../modules/data";
import { FetchArtistData } from "../modules/api";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";

interface ArtistContentProps {
  artistId: string;
  currentPage: number;
}

export default function ArtistContent({ artistId, currentPage }: ArtistContentProps) {
  const [artistData, setArtistData] = useState<AlbumInfo[]>([]);
  const [perPageCount, setDataPerPage] = useState(5);
  const [artistDataCount, setArtistDataCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const tmp = await FetchArtistData({ artistId, currentPage, perPageCount });

        if (tmp) {
          setArtistData(tmp.artistData);
          setArtistDataCount(tmp.artistDataCount);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [artistId, currentPage, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={artistDataCount}
    >
      {artistDataCount > 0 && (
        <>
          <ArtistPageImage artistData={artistData} />
          <AlbumContents artistData={artistData} perPageCount={perPageCount} />
        </>
      )}
    </ContentLayout>
  );
}

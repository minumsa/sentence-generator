"use client";

import React, { useEffect, useState } from "react";
import { AlbumInfo, criteriaAtom, methodAtom } from "../modules/data";
import { FetchArtistData } from "../modules/api";
import { useAtomValue } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";

interface ArtistContentProps {
  artistId: string;
  currentPage: number;
}

export default function ArtistContent({ artistId, currentPage }: ArtistContentProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(0);

  useEffect(() => {
    async function loadData() {
      const result = await FetchArtistData({
        pathName: "search",
        perPageCount,
        currentPage,
        artistId,
        currentMethod: method,
        currentCriteria: criteria,
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setTotalDataLength(genreDataLength);
    }

    loadData();
  }, [artistId, method, criteria, currentPage, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
    >
      <ArtistPageImage albumData={data} />
      <AlbumContents albumData={data} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

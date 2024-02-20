"use client";

import React, { useEffect, useState } from "react";
import { AlbumInfo, CriteriaType, MethodType, criteriaAtom, methodAtom } from "../modules/data";
import { FetchArtistData } from "../modules/api";
import { useAtom, useAtomValue } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { ArtistPageImage } from "./ArtistPageImage";

interface PageProps {
  artistId: string;
  currentPage: number;
}

export default function ArtistContent({ artistId, currentPage }: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  // TODO: 타입(유니언)으로 빼기 - 발매일, 앨범, 아티스트...
  // FIXME: jotai 타입 오류 해결해야 함 MethodType 또는 Criteria 타입으로
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      const result = await FetchArtistData({
        pathName: "",
        perPageCount,
        currentPage,
        artistId,
        currentMethod: method,
        currentCriteria: criteria,
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setTotalDataLength(genreDataLength);
      setTotalPage(Math.max(1, Math.ceil(genreDataLength / 5)));
    }

    loadData();
  }, [artistId, method, criteria, currentPage, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
    >
      <ArtistPageImage data={data} />
      <AlbumContents data={data} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

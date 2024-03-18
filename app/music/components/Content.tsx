"use client";

import { AlbumInfo } from "../modules/data";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";

interface ContentProps {
  data: AlbumInfo[];
  totalDataLength: number;
  currentPage: number;
}

export default function Content({ data, totalDataLength, currentPage }: ContentProps) {
  const perPageCount = 5;
  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
    >
      <AlbumContents artistData={data} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

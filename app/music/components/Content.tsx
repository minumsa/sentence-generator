"use client";

import { SUB_PER_PAGE_COUNT } from "../modules/constants";
import { AlbumInfo } from "../modules/types";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";

interface ContentProps {
  data: AlbumInfo[];
  totalDataLength: number;
  currentPage: number;
}

export default function Content({ data, totalDataLength, currentPage }: ContentProps) {
  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={SUB_PER_PAGE_COUNT}
      totalDataLength={totalDataLength}
    >
      <AlbumContents artistData={data} perPageCount={SUB_PER_PAGE_COUNT} />
    </ContentLayout>
  );
}

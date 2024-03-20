"use client";

import { AlbumInfo } from "../../modules/types";
import { AlbumContents } from "./album/AlbumContents";
import { ContentLayout } from "./ContentLayout";

interface ContentProps {
  data: AlbumInfo[];
  totalDataLength: number;
  currentPage: number;
}

export default function Content({ data, totalDataLength, currentPage }: ContentProps) {
  return (
    <ContentLayout currentPage={currentPage} totalDataLength={totalDataLength}>
      <AlbumContents albumData={data} />
    </ContentLayout>
  );
}

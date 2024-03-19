"use client";

import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentPage: number = params.page;
  const currentKeyword = "";
  const currentTagName = "";
  const totalDataLength = 0;
  const searchInfo = { currentKeyword, currentPage, currentTagName, totalDataLength };

  return (
    <MusicLayout>
      <SearchContent data={[]} searchInfo={searchInfo} />
    </MusicLayout>
  );
}

"use client";

import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentTagName: string = params.tagName;
  const currentPage: number = params.page;

  console.log(currentPage, currentPage);

  return (
    <MusicLayout>
      <SearchContent
        currentKeyword={""}
        currentTagName={currentTagName}
        currentPage={currentPage}
      />
    </MusicLayout>
  );
}

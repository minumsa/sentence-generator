"use client";

import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const currentPage: number = params.page;

  return (
    <MusicLayout>
      <SearchContent
        pathName={"search"}
        currentKeyword={currentKeyword}
        currentPage={currentPage}
      />
    </MusicLayout>
  );
}

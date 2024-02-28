"use client";

import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentPage: number = params.page;

  return (
    <MusicLayout>
      <SearchContent currentKeyword={""} currentPage={currentPage} />
    </MusicLayout>
  );
}

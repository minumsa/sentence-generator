"use client";

import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import Content from "@/app/music/components/Content";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const currentPage = Number(params.page);

  return (
    <MusicLayout>
      <Content pathName={currentGenre} currentPage={currentPage} />
    </MusicLayout>
  );
}

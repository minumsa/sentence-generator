"use client";

import { PageProps } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const currentPage = Number(params.page);

  return (
    <MusicLayout>
      <Content pathName={currentGenre} currentPage={currentPage} />
    </MusicLayout>
  );
}

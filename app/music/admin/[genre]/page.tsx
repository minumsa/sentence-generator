"use client";

import { PageProps } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;

  return (
    <MusicLayout>
      <Content pathName={currentGenre} currentPage={1} />
    </MusicLayout>
  );
}

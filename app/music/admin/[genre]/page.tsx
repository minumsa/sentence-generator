"use client";

import { usePathname } from "next/navigation";
import { PageProps } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <Content pathName={currentGenre} fullPathName={fullPathName} currentPage={1} />
    </MusicLayout>
  );
}

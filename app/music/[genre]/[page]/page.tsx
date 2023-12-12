"use client";

import { usePathname } from "next/navigation";
import { PageProps } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const currentPage = Number(params.page);
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <Content pathName={currentGenre} fullPathName={fullPathName} currentPage={currentPage} />
    </MusicLayout>
  );
}

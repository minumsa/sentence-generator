"use client";

import { usePathname } from "next/navigation";
import { PageProps, isMainPage } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <Content
        pathName={isMainPage(pathName) ? "" : pathName}
        fullPathName={fullPathName}
        currentPage={isMainPage(pathName) ? Number(pathName) : 1}
      />
    </MusicLayout>
  );
}

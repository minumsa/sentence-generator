"use client";

import { usePathname } from "next/navigation";
import { PageProps, isMainPage, isUploadPage } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import Content from "@/app/music/components/Content";

export default function Page({ params }: PageProps) {
  const pathName = params.genre;
  const currentPage = params.page;
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <Content
        pathName={isMainPage(pathName) ? "" : pathName}
        fullPathName={fullPathName}
        currentPage={Number(currentPage)}
      />
    </MusicLayout>
  );
}

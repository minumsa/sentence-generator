"use client";

import { usePathname } from "next/navigation";
import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const currentPage: number = params.page;
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <SearchContent
        pathName={"search"}
        fullPathName={fullPathName}
        currentKeyword={currentKeyword}
        currentPage={currentPage}
      />
    </MusicLayout>
  );
}

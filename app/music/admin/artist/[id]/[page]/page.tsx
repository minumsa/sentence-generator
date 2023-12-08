"use client";

import { usePathname } from "next/navigation";
import { PageProps } from "@/app/music/modules/data";
import ArtistContent from "@/app/music/components/ArtistContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;
  const fullPathName = usePathname();

  return (
    <MusicLayout>
      <ArtistContent fullPathName={fullPathName} artistId={artistId} currentPage={currentPage} />
    </MusicLayout>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { PageProps } from "../../../modules/data";
import ArtistContent from "../../../components/ArtistContent";
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

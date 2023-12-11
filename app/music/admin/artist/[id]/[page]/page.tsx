"use client";

import { PageProps } from "@/app/music/modules/data";
import ArtistContent from "@/app/music/components/ArtistContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;

  return (
    <MusicLayout>
      <ArtistContent isAdminPage={true} artistId={artistId} currentPage={currentPage} />
    </MusicLayout>
  );
}

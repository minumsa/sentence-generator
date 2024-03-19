"use client";

import Update from "@/app/music/components/Update";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { PageProps } from "@/app/music/modules/types";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Update currentId={currentId} />
    </MusicLayout>
  );
}

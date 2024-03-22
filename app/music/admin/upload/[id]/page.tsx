"use client";

import UploadUpdate from "@/app/music/components/upload/UploadUpdate";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <UploadUpdate currentId={currentId} />
    </MusicLayout>
  );
}

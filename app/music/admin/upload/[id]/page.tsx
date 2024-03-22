"use client";

import UploadAndUpdate from "@/app/music/components/upload/UploadAndUpdate";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <UploadAndUpdate currentId={currentId} />
    </MusicLayout>
  );
}

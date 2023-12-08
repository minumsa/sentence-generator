"use client";

import { Post } from "@/app/music/components/Post";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Post pathName={currentId} />
    </MusicLayout>
  );
}

"use client";

import { PageProps } from "../../modules/data";
import Update from "../../components/Update";
import { MusicLayout } from "../../components/MusicLayout";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Update currentId={currentId} />
    </MusicLayout>
  );
}

"use client";

import { PageProps } from "../modules/data";
import Upload from "../components/Upload";
import { MusicLayout } from "../components/MusicLayout";

export default function Page({ params }: PageProps) {
  return (
    <MusicLayout>
      <Upload />
    </MusicLayout>
  );
}

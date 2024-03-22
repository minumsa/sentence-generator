"use client";

import { MusicLayout } from "../../components/@common/MusicLayout";
import UploadAndUpdate from "../../components/upload/UploadAndUpdate";

export default function Page() {
  return (
    <MusicLayout>
      <UploadAndUpdate currentId={""} />
    </MusicLayout>
  );
}

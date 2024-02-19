"use client";

import { Provider, createStore } from "jotai";
import { Grid } from "../components/Grid";
import { MusicLayout } from "../components/MusicLayout";

export default function Page() {
  return (
    <MusicLayout>
      <Grid />
    </MusicLayout>
  );
}

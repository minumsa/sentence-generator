"use client";

import { PageProps } from "@/app/music/modules/data";
import ArtistContent from "@/app/music/components/ArtistContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default async function Page({ params }: PageProps) {
  const artistId = params.id;
  const perPageCount = 5;
  const currentPage = params.page;

  try {
    const queryString = `?artistId=${artistId}&perPageCount=${perPageCount}&currentPage=${currentPage}`;
    const url = `https://divdivdiv.com/music/api/artist${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const { artistData, artistDataCount } = await response.json();

    return (
      <MusicLayout>
        <ArtistContent
          artistData={artistData}
          artistDataCount={artistDataCount}
          currentPage={currentPage}
        />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

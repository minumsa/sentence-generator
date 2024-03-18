"use client";

import { PageProps } from "../../modules/data";
import Content from "../../components/Content";
import { MusicLayout } from "../../components/MusicLayout";

export default async function Page({ params }: PageProps) {
  const currentGenre = params.genre;
  const currentPage = Number(params.page);

  try {
    const perPageCount = 5;
    const pathName = currentGenre;
    const currentMethod = "별점";
    const currentCriteria = "내림차순";
    const currentTagKey = "";

    const queryString = `?pathName=${pathName}&perPageCount=${perPageCount}&currentPage=${currentPage}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}&currentTagKey=${currentTagKey}`;
    const url = `https://divdivdiv.com/music/api${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch music data");
    }

    const { slicedData, genreDataLength } = await response.json();

    return (
      <MusicLayout>
        <Content data={slicedData} totalDataLength={genreDataLength} currentPage={currentPage} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

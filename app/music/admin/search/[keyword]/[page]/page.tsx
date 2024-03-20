"use client";

import SearchContent from "@/app/music/components/SearchContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { PageProps } from "@/app/music/modules/types";
import { SUB_PER_PAGE_COUNT } from "@/app/music/modules/constants";

export default async function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const currentPage: number = params.page;

  try {
    const queryString = `?perPageCount=${SUB_PER_PAGE_COUNT}&currentPage=${currentPage}&currentKeyword=${currentKeyword}`;
    const url = `https://divdivdiv.com/music/api/search${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search data");
    }

    const { slicedData, genreDataLength } = await response.json();
    const currentTagName = "";
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName,
      totalDataLength: genreDataLength,
    };

    return (
      <MusicLayout>
        <SearchContent data={slicedData} searchInfo={searchInfo} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

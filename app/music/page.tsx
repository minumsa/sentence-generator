"use client";

import { useState, useEffect } from "react";
import { Grid } from "./components/Grid";
import { MusicLayout } from "./components/MusicLayout";
import { AlbumInfo, perPageCountAtom, scrollCountAtom } from "./modules/data";
import { useAtomValue } from "jotai";

interface AlbumFilters {
  perPageCount: number;
  scrollCount: number;
}

async function getData(albumFilters: AlbumFilters) {
  const { perPageCount, scrollCount } = albumFilters;
  const pathName = "";
  const currentMethod = "별점";
  const currentCriteria = "내림차순";
  const currentTagKey = "";

  const queryString = `?pathName=${pathName}&perPageCount=${perPageCount}&currentPage=${scrollCount}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}&currentTagKey=${currentTagKey}`;
  const url = `/music/api/${queryString}`;
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }

  return result.json();
}

export default function Page() {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [maxScrollCount, setMaxScrollCount] = useState<number>(10000);
  const perPageCount = useAtomValue(perPageCountAtom);
  const scrollCount = useAtomValue(scrollCountAtom);
  const albumFilters: AlbumFilters = { perPageCount, scrollCount };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(albumFilters);
        setMaxScrollCount(Math.max(1, Math.ceil(result.genreDataLength / perPageCount)) + 1);

        if (scrollCount === 1) {
          setData(result.slicedData);
        } else if (scrollCount > 1) {
          setData(prevData => [...prevData, ...result.slicedData]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (scrollCount < maxScrollCount) {
      fetchData();
    }
  }, [maxScrollCount, perPageCount, scrollCount]);

  return (
    <MusicLayout>
      <Grid data={data} />
    </MusicLayout>
  );
}

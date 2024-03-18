import React, { useEffect, useState } from "react";
import { AlbumInfo, criteriaAtom, methodAtom } from "../modules/data";
import { fetchAlbumData } from "../modules/api";
import { useAtomValue } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";

interface ContentProps {
  pathName: string;
  currentPage: number;
}

export default function Content({ pathName, currentPage }: ContentProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const [perPageCount, setPerPageCount] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(0);

  useEffect(() => {
    const albumFilters = {
      perPageCount,
      currentPage,
      currentMethod: method,
      currentCriteria: criteria,
      currentTagKey: "",
    };

    async function loadData() {
      const albumResult = await fetchAlbumData({
        pathName,
        albumFilters,
      });

      if (albumResult) {
        setData(albumResult.slicedData);
        setTotalDataLength(albumResult.genreDataLength);
      }
    }

    loadData();
  }, [pathName, currentPage, method, criteria, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
    >
      <AlbumContents artistData={data} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

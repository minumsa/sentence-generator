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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchAlbumData({
        pathName,
        perPageCount,
        currentPage,
        currentMethod: method,
        currentCriteria: criteria,
        currentTagKey: "",
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setTotalDataLength(genreDataLength);
      setIsLoading(false);
    }

    loadData();
  }, [pathName, currentPage, method, criteria, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
      isLoading={isLoading}
    >
      <AlbumContents albumData={data} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

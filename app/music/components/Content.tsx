import React, { useEffect, useState } from "react";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { fetchData } from "../modules/api";
import { useAtom } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { Loading } from "./Loading";

interface PageProps {
  pathName: string;
  currentPage: number;
}

export default function Content({ pathName, currentPage }: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  // TODO: 타입(유니언)으로 빼기 - 발매일, 앨범, 아티스트...
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const [perPageCount, setPerPageCount] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const isLoading = data.length === 0;

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({
        pathName,
        perPageCount,
        currentPage,
        currentMethod,
        currentCriteria,
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setTotalDataLength(genreDataLength);
    }

    loadData();
  }, [pathName, currentPage, currentMethod, currentCriteria, perPageCount]);

  return (
    <>
      {isLoading ? (
        <Loading dataLength={undefined} />
      ) : (
        <ContentLayout
          keyword={keyword}
          setKeyword={setKeyword}
          currentMethod={currentMethod}
          setCurrentMethod={setCurrentMethod}
          currentCriteria={currentCriteria}
          setCurrentCriteria={setCurrentCriteria}
          currentPage={currentPage}
          perPageCount={perPageCount}
          totalDataLength={totalDataLength}
        >
          <AlbumContents data={data} perPageCount={perPageCount} />
        </ContentLayout>
      )}
    </>
  );
}

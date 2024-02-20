import React, { useEffect, useState } from "react";
import { AlbumInfo, CriteriaType, MethodType, criteriaAtom, methodAtom } from "../modules/data";
import { SearchData } from "../modules/api";
import { useAtom } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { Loading } from "./Loading";
import { TopNav } from "./TopNav";

interface PageProps {
  pathName: string;
  currentKeyword: string;
  currentPage: number;
}

export default function SearchContent({ pathName, currentKeyword, currentPage }: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(methodAtom);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(criteriaAtom);
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmptyResult, setIsEmptyResult] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await SearchData({
        pathName,
        perPageCount,
        currentPage,
        currentKeyword,
        currentMethod,
        currentCriteria,
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setTotalDataLength(genreDataLength);
      setTotalPage(Math.max(1, Math.ceil(genreDataLength / 5)));
      setIsLoading(false);

      if (result?.slicedData.length > 0) {
        setIsEmptyResult(false);
      } else {
        setIsEmptyResult(true);
      }
    }

    setIsLoading(true);
    loadData();
  }, [
    pathName,
    currentKeyword,
    currentMethod,
    currentCriteria,
    perPageCount,
    currentPage,
    data.length,
  ]);

  return (
    <>
      {isEmptyResult ? (
        <>
          <TopNav isVisible={false} />
          <Loading isEmpty={isLoading} hasNoResult={isEmptyResult} />
        </>
      ) : (
        <ContentLayout
          currentPage={currentPage}
          perPageCount={perPageCount}
          totalDataLength={totalDataLength}
          isLoading={isLoading}
        >
          <AlbumContents data={data} perPageCount={perPageCount} />
        </ContentLayout>
      )}
    </>
  );
}

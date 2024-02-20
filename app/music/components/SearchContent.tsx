import React, { useEffect, useState } from "react";
import { AlbumInfo, CriteriaType, MethodType, criteriaAtom, methodAtom } from "../modules/data";
import { SearchData } from "../modules/api";
import { useAtom, useAtomValue } from "jotai";
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
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
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
        currentMethod: method,
        currentCriteria: criteria,
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
  }, [pathName, currentKeyword, method, criteria, perPageCount, currentPage, data.length]);

  return (
    <>
      {isEmptyResult ? (
        <>
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

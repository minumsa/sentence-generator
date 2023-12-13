import React, { useEffect, useState } from "react";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { SearchData } from "../modules/api";
import { useAtom } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";

interface PageProps {
  pathName: string;
  currentKeyword: string;
  currentPage: number;
}

export default function SearchContent({ pathName, currentKeyword, currentPage }: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [keyword, setKeyword] = useState<string>("");

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
    }

    loadData();
  }, [pathName, currentKeyword, currentMethod, currentCriteria, perPageCount, currentPage]);

  return (
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
  );
}

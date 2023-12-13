import React, { useEffect, useState } from "react";
import styles from "../music.module.css";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { SearchData } from "../modules/api";
import { useAtom } from "jotai";
import { Loading } from "./Loading";
import { Album } from "./Album";
import { PageNumbers } from "./PageNumbers";
import { TopNav } from "./TopNav";
import { AlbumContents } from "./AlbumContents";

interface PageProps {
  pathName: string;
  fullPathName: string;
  currentKeyword: string;
  currentPage: number;
}

export default function SearchContent({
  pathName,
  fullPathName,
  currentKeyword,
  currentPage,
}: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const isLoading = data.length === 0;
  const [perPageCount, setDataPerPage] = useState(5);
  const [dataLength, setDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [maxPageNumber, setMaxPage] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>("");
  const [isAdminPage, setIsAdminPage] = useState(false);

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
      setDataLength(genreDataLength);
      setTotalPage(Math.max(1, Math.ceil(genreDataLength / 5)));
    }

    loadData();
  }, [pathName, currentKeyword, currentMethod, currentCriteria]);

  useEffect(() => {
    setMaxPage(Math.ceil(currentPage / perPageCount) * perPageCount);
  }, [currentKeyword]);

  useEffect(() => {
    if (fullPathName.includes("admin")) setIsAdminPage(true);
  }, []);

  return (
    <>
      {isLoading && <Loading dataLength={dataLength} />}
      {!isLoading && (
        <>
          <TopNav
            pathName={pathName}
            keyword={keyword}
            currentKeyword={currentKeyword}
            setKeyword={setKeyword}
            currentMethod={currentMethod}
            setCurrentMethod={setCurrentMethod}
            currentCriteria={currentCriteria}
            setCurrentCriteria={setCurrentCriteria}
          />
          <AlbumContents data={data} isAdminPage={isAdminPage} perPageCount={perPageCount} />
          <PageNumbers
            pathName={
              isAdminPage ? `admin/${pathName}/${currentKeyword}` : `${pathName}/${currentKeyword}`
            }
            currentPage={currentPage}
            totalPage={totalPage}
            maxPageNumber={maxPageNumber}
            perPageCount={perPageCount}
          />
        </>
      )}
    </>
  );
}

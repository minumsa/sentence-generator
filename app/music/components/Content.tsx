import React, { useEffect, useState } from "react";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { useRouter } from "next/navigation";
import { fetchData } from "../modules/api";
import { useAtom } from "jotai";
import { PageNumbers } from "./PageNumbers";
import { Loading } from "./Loading";
import { AlbumContents } from "./AlbumContents";
import { TopNav } from "./TopNav";
import { ContentLayout } from "./ContentLayout";

interface PageProps {
  pathName: string;
  fullPathName: string;
  currentPage: any;
}

export default function Content({ pathName, fullPathName, currentPage }: PageProps) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  // TODO: 타입(유니언)으로 빼기 - 발매일, 앨범, 아티스트...
  // FIXME: jotai 타입 오류 해결해야 함 MethodType 또는 Criteria 타입으로
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const [perPageCount, setDataPerPage] = useState(5);
  const [dataLength, setDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [maxPageNumber, setMaxPage] = useState<number>(5);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    async function loadData() {
      // 검색 데이터를 fetch할 때는 currentPage를 keyword로 보내줌
      const result = await fetchData({
        pathName,
        perPageCount,
        currentPage: isSearching ? keyword : currentPage,
        currentMethod,
        currentCriteria,
      });
      setData(result?.slicedData);
      const genreDataLength = result?.genreDataLength;
      setDataLength(genreDataLength);
      setTotalPage(Math.max(1, Math.ceil(genreDataLength / 5)));
    }

    loadData();
  }, [pathName, currentPage, currentMethod, currentCriteria]);

  useEffect(() => {
    setMaxPage(Math.ceil(currentPage / perPageCount) * perPageCount);
  }, [currentPage]);

  useEffect(() => {
    if (fullPathName.includes("admin")) setIsAdminPage(true);
  }, []);

  return (
    <ContentLayout
      data={data}
      pathName={pathName}
      isAdminPage={isAdminPage}
      keyword={keyword}
      setKeyword={setKeyword}
      dataLength={dataLength}
      currentMethod={currentMethod}
      setCurrentMethod={setCurrentMethod}
      currentCriteria={currentCriteria}
      setCurrentCriteria={setCurrentCriteria}
      currentPage={currentPage}
      totalPage={totalPage}
      maxPageNumber={maxPageNumber}
      perPageCount={perPageCount}
    >
      <AlbumContents data={data} isAdminPage={isAdminPage} perPageCount={perPageCount} />
    </ContentLayout>
  );
}

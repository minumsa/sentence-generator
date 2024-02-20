import React, { useEffect, useState } from "react";
import { AlbumInfo, criteriaAtom, methodAtom } from "../modules/data";
import { SearchData } from "../modules/api";
import { useAtomValue } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import { Loading } from "./Loading";
import styles from "../music.module.css";

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
  const decodedKeyword = decodeURIComponent(currentKeyword);

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
          <Loading isEmpty={true} hasNoResult={isEmptyResult} keyword={decodedKeyword} />
        </>
      ) : (
        <ContentLayout
          currentPage={currentPage}
          perPageCount={perPageCount}
          totalDataLength={totalDataLength}
          isLoading={isLoading}
        >
          <div
            className={styles["search-result-container"]}
            // style={{ display: isLoading ? "none" : undefined }}
          >
            <div>
              {totalDataLength
                ? `"${decodedKeyword}"에 관련된 총 ${totalDataLength}건의 검색 결과가 있습니다.`
                : ""}
            </div>
          </div>
          <AlbumContents data={data} perPageCount={perPageCount} />
        </ContentLayout>
      )}
    </>
  );
}

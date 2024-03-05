import React, { useEffect, useState } from "react";
import { AlbumInfo, criteriaAtom, defaultTags, isAdminPage } from "../modules/data";
import { AlbumFilters, SearchData, SearchFilters, fetchAlbumData } from "../modules/api";
import { useAtomValue } from "jotai";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import styles from "../music.module.css";
import { usePathname, useRouter } from "next/navigation";

interface SearchContentProps {
  currentKeyword: string;
  currentTagName: string;
  currentPage: number;
}

export default function SearchContent({
  currentKeyword,
  currentTagName,
  currentPage,
}: SearchContentProps) {
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const criteria = useAtomValue(criteriaAtom);
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalDataLength, setTotalDataLength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const decodedKeyword = decodeURIComponent(currentKeyword);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    async function loadData() {
      const searchFilters: SearchFilters = {
        perPageCount,
        currentPage,
        currentKeyword,
      };

      const searchResult = await SearchData(searchFilters);

      if (searchResult) {
        setData(searchResult.slicedData);
        setTotalDataLength(searchResult.genreDataLength);
        setIsLoading(false);
        setIsEmptyResult(false);
      } else {
        setIsEmptyResult(true);
      }
    }

    if (currentKeyword) {
      setIsLoading(true);
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [pathName, currentKeyword, perPageCount, currentPage]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  async function handleSearch() {
    isAdminPage(pathName)
      ? router.push(`/music/admin/search/${keyword}/1`)
      : router.push(`/music/search/${keyword}/1`);
  }
  useEffect(() => {
    const albumFilters: AlbumFilters = {
      perPageCount,
      currentPage,
      currentMethod: "별점",
      currentCriteria: criteria,
      currentTagKey: currentTagName,
    };

    async function loadTagData() {
      const albumResult = await fetchAlbumData({
        pathName: "search",
        albumFilters,
      });

      if (albumResult) {
        setData(albumResult.slicedData);
        setTotalDataLength(albumResult.genreDataLength);
      }
    }

    if (currentTagName) {
      loadTagData();
    }
  }, [criteria, currentPage, currentTagName, perPageCount]);

  return (
    <ContentLayout
      currentPage={currentPage}
      perPageCount={perPageCount}
      totalDataLength={totalDataLength}
      isLoading={isLoading}
    >
      <div className={styles["search-input-container"]}>
        <div className={styles["search-page-input-container"]}>
          <input
            className={styles["search-page-input"]}
            placeholder="앨범, 아티스트, 키워드 검색"
            onChange={e => {
              setKeyword(e.target.value);
            }}
            onKeyDown={handleEnter}
          />
          <img
            className={styles["search-page-input-icon"]}
            src={"/music/magnifying-glass.svg"}
            alt="search-page-input-icon"
          ></img>
        </div>
        <div className={styles["search-result-container"]}>
          {decodedKeyword
            ? totalDataLength
              ? `"${decodedKeyword}"에 관련된 총 ${totalDataLength}건의 검색 결과`
              : `"${decodedKeyword}"에 관련된 검색 결과가 없습니다.`
            : "앨범 제목, 아티스트 또는 키워드 등을 검색해보세요."}
        </div>
        <div className={styles["search-tag-container"]}>
          {Object.keys(defaultTags).map((key, index) => {
            // "모두 보기" 태그(버튼)은 모바일 메인 화면에서만 표시
            const isAllItemKey = key === "";
            return (
              !isAllItemKey && (
                <div
                  key={index}
                  className={styles["search-tag-display-item"]}
                  onClick={() => {
                    isAdminPage(pathName)
                      ? router.push(`/music/admin/search/tag/${key}/1`)
                      : router.push(`/music/search/tag/${key}/1`);
                  }}
                  style={
                    currentTagName === key
                      ? { boxShadow: "inset 0 0 0 1px var(--text-color)" }
                      : undefined
                  }
                >
                  {defaultTags[key]}
                </div>
              )
            );
          })}
        </div>
      </div>
      {isEmptyResult ? undefined : <AlbumContents artistData={data} perPageCount={perPageCount} />}
    </ContentLayout>
  );
}

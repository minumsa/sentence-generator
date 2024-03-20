"use client";

import React, { useState } from "react";
import { AlbumContents } from "./AlbumContents";
import { ContentLayout } from "./ContentLayout";
import styles from "../music.module.css";
import { usePathname, useRouter } from "next/navigation";
import { AlbumInfo } from "../modules/types";
import { isAdminPage } from "../modules/utils";
import { DEFAULT_TAGS } from "../modules/constants";

interface SearchInfo {
  currentKeyword: string;
  currentPage: number;
  currentTagName: string;
  totalDataLength: number;
}

interface SearchContentProps {
  data: AlbumInfo[];
  searchInfo: SearchInfo;
}

export default function SearchContent({ data, searchInfo }: SearchContentProps) {
  const { currentKeyword, currentPage, currentTagName, totalDataLength } = searchInfo;
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const decodedKeyword = decodeURIComponent(currentKeyword);
  const [keyword, setKeyword] = useState("");

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

  return (
    <ContentLayout currentPage={currentPage} totalDataLength={totalDataLength}>
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
            ? isLoading
              ? "데이터를 가져오고 있습니다..."
              : totalDataLength
              ? `"${decodedKeyword}"에 관련된 총 ${totalDataLength}건의 검색 결과`
              : `"${decodedKeyword}"에 관련된 검색 결과가 없습니다.`
            : "앨범 제목, 아티스트 또는 키워드 등을 검색해보세요."}
        </div>
        <div className={styles["search-tag-container"]}>
          {Object.keys(DEFAULT_TAGS).map((key, index) => {
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
                  {DEFAULT_TAGS[key]}
                </div>
              )
            );
          })}
        </div>
      </div>
      <AlbumContents artistData={data} />
    </ContentLayout>
  );
}

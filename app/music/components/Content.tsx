import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  OrderType,
  initialCriteria,
  initialMethod,
  isAdminPage,
  sortItems,
} from "../modules/data";
import { useRouter } from "next/navigation";
import { fetchData } from "../modules/api";
import { useAtom } from "jotai";
import { Album } from "./Album";
import { PageNumbers } from "./PageNumbers";
import { Loading } from "./Loading";
import { AlbumContents } from "./AlbumContents";
import { TopNav } from "./TopNav";

interface PageProps {
  pathName: string;
  fullPathName: string;
  currentPage: any;
}

export default function Content({ pathName, fullPathName, currentPage }: PageProps) {
  const router = useRouter();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  // TODO: 타입(유니언)으로 빼기 - 발매일, 앨범, 아티스트...
  // FIXME: jotai 타입 오류 해결해야 함 MethodType 또는 Criteria 타입으로
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const isUploadPage = pathName === "upload";
  const [perPageCount, setDataPerPage] = useState(5);
  const [dataLength, setDataLength] = useState(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [maxPageNumber, setMaxPage] = useState<number>(5);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [isAdminPage, setIsAdminPage] = useState(false);
  const isLoading = data.length === 0;

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

  const SortToggleButton = ({
    type,
    sortItem,
    currentOrder,
    setCurrentOrder,
    sortWay,
  }: {
    type: OrderType;
    sortItem: MethodType[] | CriteriaType[];
    currentOrder: MethodType | CriteriaType;
    setCurrentOrder: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
    sortWay: boolean;
  }) => {
    return (
      <div
        className={styles["sort-criteria-container"]}
        onMouseEnter={() => {
          handleMouseEnter(type);
        }}
        onMouseLeave={() => {
          handleMouseLeave(type);
        }}
      >
        {`${currentOrder} ▾`}
        {sortWay && (
          <div
            className={styles["sort-criteria"]}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => {
              handleMouseEnter(type);
            }}
          >
            {sortItem.map((item: MethodType | CriteriaType) => {
              return (
                <div
                  className={styles["criteria"]}
                  key={item}
                  onClick={() => {
                    const hasNoPageNumber = isNaN(Number(fullPathName.split("").at(-1)));
                    const variablePathByNumber = hasNoPageNumber ? 1 : "/";
                    setCurrentOrder(item);
                    // router.push(`/music/${pathName}/${variablePageNumber}`)
                    // handleDynamicPage(variablePathByNumber);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleMouseEnter = (type: OrderType) => {
    if (type === "method") {
      setSortMethod(true);
    } else if (type === "criteria") {
      setSortCriteria(true);
    }
  };

  const handleMouseLeave = (type: OrderType) => {
    if (type === "method") {
      setSortMethod(false);
    } else if (type === "criteria") {
      setSortCriteria(false);
    }
  };

  async function handleSearch() {
    isAdminPage
      ? router.push(`/music/admin/search/${keyword}/1`)
      : router.push(`/music/search/${keyword}/1`);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {isLoading && <Loading dataLength={dataLength} />}
      {!isLoading && (
        <>
          <TopNav
            pathName={pathName}
            isAdminPage={isAdminPage}
            keyword={keyword}
            currentKeyword={undefined}
            setKeyword={setKeyword}
            currentMethod={currentMethod}
            setCurrentMethod={setCurrentMethod}
            currentCriteria={currentCriteria}
            setCurrentCriteria={setCurrentCriteria}
          />
          <AlbumContents data={data} isAdminPage={isAdminPage} perPageCount={perPageCount} />
          <PageNumbers
            pathName={isAdminPage ? `admin/${pathName}` : pathName}
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

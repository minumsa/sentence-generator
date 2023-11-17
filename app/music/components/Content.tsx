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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./Loading";
import { Album } from "./Album";

interface PageProps {
  pathName: string;
  fullPathName: string;
  currentPage: number;
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
  const isLoading = data.length === 0;
  const [perPageCount, setDataPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [maxPageNumber, setMaxPage] = useState<number>(5);
  const pageArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  const isAdminMainPage = fullPathName.includes("admin");
  const isAdminGenrePage = fullPathName.includes("admin") && pathName.length > 0;
  const isMainPage = pathName === "";

  console.log(pathName);
  console.log("currentPage", currentPage);

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
      const dataLength = result?.genreDataLength;
      setTotalPage(Math.max(1, Math.ceil(dataLength / 5)));
    }

    loadData();
  }, [pathName, currentPage, currentMethod, currentCriteria]);

  console.log(data);

  useEffect(() => {
    setMaxPage(Math.ceil(currentPage / perPageCount) * perPageCount);
  }, [currentPage]);

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
                    handleDynamicPage(variablePathByNumber);
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

  // FIXME: 로직의 내용물은 영어로만 쓰는 게 일반적
  const sortedData = useMemo(() => {
    const dateSelector = (item: AlbumInfo) => {
      if (currentMethod === "작성일") {
        return new Date(item.uploadDate).getTime();
      } else if (currentMethod === "발매일") {
        return new Date(item.releaseDate).getTime();
      }
      return 0;
    };

    const newData = [...data];

    newData.sort((a, b) =>
      currentCriteria === "오름차순"
        ? dateSelector(a) - dateSelector(b)
        : dateSelector(b) - dateSelector(a)
    );

    if (currentMethod === "아티스트") {
      newData.sort((a, b) => {
        return currentCriteria === "오름차순"
          ? a.artist.localeCompare(b.artist)
          : b.artist.localeCompare(a.artist);
      });
    }

    if (currentMethod === "앨범") {
      newData.sort((a, b) => {
        return currentCriteria === "오름차순"
          ? a.album.localeCompare(b.album)
          : b.album.localeCompare(a.album);
      });
    }

    return newData;
  }, [data, currentMethod, currentCriteria]);

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

  const handleDynamicPage = (variablePageNumber: number | "/") => {
    // 관리자 장르 페이지인 경우
    if (isAdminGenrePage) {
      router.push(`/music/admin/${pathName}/${variablePageNumber}`);
      // 관리자 메인 페이지인 경우
    } else if (isAdminMainPage) {
      router.push(`/music/admin/${variablePageNumber}`);
      // 메인 페이지인 경우
    } else if (isMainPage) {
      router.push(`/music/${variablePageNumber}`);
      // 장르 페이지인 경우
    } else {
      router.push(`/music/${pathName}/${variablePageNumber}`);
    }
  };

  return (
    <>
      {!isUploadPage && !isLoading && (
        <div className={styles["top-menu-container"]}>
          {/* TODO: 검색 기능 만들지 말지 고민 */}
          {/* {isAdminPage(fullPathName) && (
            <div
              className={`${styles["admin-button"]} ${styles["upload-button"]}`}
              onClick={() => {
                router.push("/music/admin/upload");
              }}
            >
              업로드
            </div>
          )} */}
          <SortToggleButton
            type="method"
            sortItem={sortItems.method}
            currentOrder={currentMethod}
            setCurrentOrder={setCurrentMethod}
            sortWay={sortMethod}
          />
          <SortToggleButton
            type="criteria"
            sortItem={sortItems.criteria}
            currentOrder={currentCriteria}
            setCurrentOrder={setCurrentCriteria}
            sortWay={sortCriteria}
          />
        </div>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        sortedData.map((data, index) => {
          const dataIndex = index + 1;
          const isLastData = index === sortedData.length - 1;
          const isLastDataPerPage = dataIndex % perPageCount === 0;

          return (
            <div key={index}>
              <Album
                data={data}
                dataIndex={dataIndex}
                perPageCount={perPageCount}
                isAdminMainPage={isAdminMainPage}
                isPostPage={false}
              />
              {isLastDataPerPage || isLastData ? undefined : <div className={styles["divider"]} />}
            </div>
          );
        })
      )}
      {!isLoading && (
        <div className={styles["page-container"]}>
          {currentPage > 5 && (
            <div
              className={styles["page"]}
              onClick={() => {
                if (maxPageNumber > 5) {
                  const prevPageBlock = maxPageNumber - 5;
                  handleDynamicPage(prevPageBlock);
                }
              }}
            >
              〈
            </div>
          )}
          {pageArray.map((page, index) => {
            const minPageNumber = maxPageNumber - perPageCount + 1;
            const pageButtonNumber = index + 1;
            if (pageButtonNumber >= minPageNumber && pageButtonNumber <= maxPageNumber)
              return (
                <div
                  key={index}
                  className={styles["page"]}
                  onClick={() => {
                    handleDynamicPage(pageButtonNumber);
                  }}
                  style={
                    currentPage === pageButtonNumber
                      ? { fontWeight: 500, opacity: "70%" }
                      : undefined
                  }
                >
                  {page}
                </div>
              );
          })}
          {totalPage - maxPageNumber > 0 && (
            <div
              className={styles["page"]}
              onClick={() => {
                const nextPageBlock = maxPageNumber + 1;
                handleDynamicPage(nextPageBlock);
              }}
            >
              〉
            </div>
          )}
        </div>
      )}
    </>
  );
}

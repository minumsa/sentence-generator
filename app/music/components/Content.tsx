import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  OrderType,
  initialCriteria,
  initialMethod,
  sortItems,
} from "../modules/data";
import { useRouter } from "next/navigation";
import { deleteData, fetchData } from "../modules/api";
import { formatDuration } from "../modules/utils";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
  const pageArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  const isAdminMainPage = fullPathName.includes("admin");
  const isAdminGenrePage = fullPathName.includes("admin") && pathName.length > 0;
  const isMainPage = pathName === "";
  const [maxPageNumber, setMaxPage] = useState<number>(5);

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
                    console.log(item);

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
    <div style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}>
      <div>
        {!isUploadPage && !isLoading && (
          <div className={styles["sort-button-container"]}>
            {/* TODO: 검색 기능 만들지 말지 고민 */}
            {/* <div className={styles["search-container"]}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div> */}
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
          <div className={styles["loading"]}>
            <div>데이터를 불러오는 중입니다...</div>
          </div>
        ) : (
          sortedData.map((data, index) => {
            const albumDuration = formatDuration(data.duration);
            const dataIndex = index + 1;
            const isLastData = index === sortedData.length - 1;
            const isFirstDataPerPage = dataIndex % perPageCount === 1;
            const isLastDataPerPage = dataIndex % perPageCount === 0;

            return (
              <div key={index}>
                <div
                  className={styles["album-container"]}
                  style={isFirstDataPerPage ? { paddingTop: "20px" } : undefined}
                >
                  <div className={styles["album-information-container"]}>
                    <div>
                      <a className={styles["link"]} href={data.link} target="_blank">
                        <img
                          className={styles["album-art"]}
                          src={data.imgUrl}
                          alt={data.album}
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <div className={` ${styles["album-information"]}`}>
                      <div>
                        <div className={styles["information"]}>
                          <div style={{ marginRight: "5px" }}>{data.artist}</div>
                        </div>
                        <div className={styles["information"]}>
                          <a className={styles["link"]} href={data.link} target="_blank">
                            <div className={styles["album-title"]}>{data.album}</div>
                          </a>
                        </div>
                      </div>
                      <div className={styles["information"]}>
                        <span>{`${data.releaseDate.slice(0, 4)}년 ${Number(
                          data.releaseDate.slice(5, 7)
                        )}월, ${data.label}`}</span>
                      </div>
                      <div className={styles["information"]}>
                        {`${data.tracks}곡, ${albumDuration}`}
                      </div>
                      {isAdminMainPage && (
                        <div className={styles["admin-button-container"]}>
                          <div
                            className={styles["admin-button"]}
                            onClick={async () => {
                              deleteData(data.id);
                            }}
                          >
                            삭제
                          </div>
                          <div
                            className={styles["admin-button"]}
                            onClick={() => {
                              router.push(`/music/admin/${data.id}`);
                            }}
                          >
                            수정
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles["text-container"]}>
                    {/* FIXME: 텍스트의 특정 단어를 클릭하면 링크로 연결되는 기능 만들기 */}
                    {data.text.split("\n").map((text, index) => {
                      const hasNoText = text.length < 1;
                      const longTextStandard = 300;
                      const isLongText = text.length > longTextStandard;
                      const longText = text.substring(0, longTextStandard);

                      // 우선 첫 번째 문단만 표시되게 조건 걸어놓음
                      if (index === 0)
                        return (
                          <div className={styles["paragraph-container-test"]}>
                            <p
                              key={index}
                              className={`${styles["paragraph"]} ${
                                isLongText ? styles["blur-end"] : undefined
                              } ${hasNoText ? styles["paragraph-blank"] : undefined}`}
                            >
                              {text}
                            </p>
                            {isLongText && <span className={styles["more-button"]}>더 보기</span>}
                          </div>
                          // <p
                          //   key={index}
                          //   className={`${styles["paragraph"]} ${styles["blur-end"]} ${
                          //     hasNoText ? styles["paragraph-blank"] : undefined
                          //   }`}
                          // >
                          //   {text}
                          // </p>
                        );
                    })}
                  </div>
                </div>
                {isLastDataPerPage || isLastData ? undefined : (
                  <div className={styles["divider"]} />
                )}
              </div>
            );
          })
        )}
      </div>
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
                      ? { fontWeight: 500, color: "#000" }
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
    </div>
  );
}

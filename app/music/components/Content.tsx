import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  OrderType,
  initialCriteria,
  initialCurrentPage,
  initialMethod,
  initialPerPageCount,
  sortItems,
} from "../modules/data";
import { useRouter } from "next/navigation";
import { deleteData, fetchData } from "../modules/api";
import { formatDuration } from "../modules/utils";
import { useAtom } from "jotai";

interface PageProps {
  pathName: string;
  fullPathName: string;
}

export default function Content({ pathName, fullPathName }: PageProps) {
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
  const [perPageCount, setDataPerPage] = useAtom(initialPerPageCount);
  const [currentPage, setCurrentPage] = useAtom(initialCurrentPage);
  const [totalPage, setTotalPage] = useState<number>(Math.ceil(data.length / perPageCount));
  const pageArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  const isAdminMainPage = fullPathName.includes("admin");
  const isAdminGenrePage = fullPathName.includes("admin") && pathName.length > 0;
  const isMainPage = pathName === "";

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({ pathName, perPageCount, currentPage });
      setData(result?.slicedData);
      setTotalPage(Math.ceil(result?.genreDataLength / perPageCount));
    }
    loadData();
  }, [pathName, currentPage]);

  // FIXME: 페이지 바뀌면 정렬 부분이 초기화됨. 전역 변수로 관리해야 할까?
  const SortToggleButton = ({
    type,
    sortItem,
    currentOrder,
    setCurrentOrder,
    sortWay,
  }: {
    type: OrderType;
    sortItem: string[];
    currentOrder: MethodType | CriteriaType;
    setCurrentOrder:
      | React.Dispatch<React.SetStateAction<MethodType>>
      | React.Dispatch<React.SetStateAction<CriteriaType>>;
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
            {sortItem.map((item: any) => {
              return (
                <div
                  className={styles["criteria"]}
                  key={item}
                  onClick={() => {
                    setCurrentOrder(item);
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

  // FIXME: 로직의 내용물은 영어로만 쓰는 게 일반적이다.
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

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}>
      <div>
        {!isUploadPage && !isLoading && (
          <div className={styles["sort-button-container"]}>
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
                              // setData(await fetchData(pathName));
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
                      return (
                        <p
                          key={index}
                          className={`${styles["paragraph"]} ${
                            hasNoText ? styles["paragraph-blank"] : undefined
                          }`}
                        >
                          {text}
                        </p>
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
      {/* TODO: 다음 페이지(>, <) 버튼 만들기 */}
      <div className={styles["page-container"]}>
        {pageArray.map((page, index) => {
          const clickedPage = index + 1;

          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                setCurrentPage(clickedPage);
                if (isAdminGenrePage) {
                  router.push(`/music/admin/${pathName}/${clickedPage}`);
                } else if (isAdminMainPage) {
                  router.push(`/music/admin/${clickedPage}`);
                } else if (isMainPage) {
                  router.push(`/music/${clickedPage}`);
                } else {
                  router.push(`/music/${pathName}/${clickedPage}`);
                }
              }}
              style={currentPage === page ? { fontWeight: 500, color: "#000" } : undefined}
            >
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import { AlbumInfo, sortItems } from "./data";
import { useRouter } from "next/navigation";
import { deleteData, fetchData } from "./api";
import { formatDuration } from "./utils";

interface pageProps {
  pathName: string;
  fullPathName: string;
}

type OrderType = "method" | "criteria";
type MethodType = "작성일" | "발매일" | "아티스트" | "앨범";
type CriteriaType = "오름차순" | "내림차순";

export default function Content({ pathName, fullPathName }: pageProps) {
  const router = useRouter();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  // TODO: 타입(유니언)으로 빼기 - 발매일, 앨범, 아티스트...
  const [currentMethod, setCurrentMethod] = useState<MethodType>("발매일");
  const [currentCriteria, setCurrentCriteria] = useState<CriteriaType>("내림차순");
  const isUploadPage = pathName === "upload";
  const isLoading = data.length === 0;
  const [dataPerPage, setDataPerPage] = useState<number>(5);
  const totalPage = Math.ceil(data.length / dataPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageArray = Array.from({ length: totalPage }, (_, i) => i + 1);

  useEffect(() => {
    async function loadData() {
      setData(await fetchData(pathName));
    }

    loadData();
  }, [currentPage]);

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
            const isLastData = index === sortedData.length - 1;
            const isLastDataPerPage = (index + 1) % dataPerPage === 0;
            const albumDuration = formatDuration(data.duration);
            const isCurrentPageData =
              index + 1 <= currentPage * dataPerPage &&
              index + 1 >= currentPage * dataPerPage - dataPerPage + 1;

            if (isCurrentPageData)
              return (
                <div key={index}>
                  <div className={styles["album-container"]}>
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
                        {fullPathName.includes("admin") && (
                          <div className={styles["admin-button-container"]}>
                            <div
                              className={styles["admin-button"]}
                              onClick={async () => {
                                deleteData(data.id);
                                setData(await fetchData(pathName));
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
                  {isLastDataPerPage ? undefined : <div className={styles["divider"]} />}
                </div>
              );
          })
        )}
      </div>
      <div className={styles["page-container"]}>
        {pageArray.map((page, index) => {
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
              style={page === currentPage ? { fontWeight: 500, color: "#000" } : undefined}
            >
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
}

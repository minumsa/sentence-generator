import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import Image from "next/image";
import { AlbumInfo, album, contents, deleteData, fetchData, sortItems } from "./data";
import { useRouter } from "next/navigation";

interface pageProps {
  pathName: string;
  fullPathName: string;
}

export default function Content({ pathName, fullPathName }: pageProps) {
  const router = useRouter();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortCriteria, setSortCriteria] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useState<string>("발매일");
  const [currentCriteria, setCurrentCriteria] = useState<string>("내림차순");
  const [mobileCurrentGenre, setMobileCurrentGenre] = useState<string>("ALL");
  const [mobileCurrentMethod, setMobileCurrentMethod] = useState<string>("RELEASE");
  const [mobileCurrentCriteria, setMobileCurrentCriteria] = useState<string>("DESC");
  const [mobileSortGenre, setMobileSortGenre] = useState<boolean>(false);
  const [mobileSortCriteria, setMobileSortCriteria] = useState<boolean>(false);
  const [mobileSortMethod, setMobileSortMethod] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setData(await fetchData(pathName));
    }

    loadData();
  }, []);

  const SortToggleButton = ({
    type,
    sortItem,
    currentOrder,
    setCurrentOrder,
    sortWay,
  }: {
    type: string;
    sortItem: string[];
    currentOrder: string;
    setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
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
            {sortItem.map((item: string) => {
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

  const MobileSortToggleButton = ({
    type,
    sortItem,
    currentOrder,
    setCurrentOrder,
    sortWay,
  }: {
    type: string;
    sortItem: string[];
    currentOrder: string;
    setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
    sortWay: boolean;
  }) => {
    return (
      <div
        className={styles["mobile-sort-criteria-container"]}
        onClick={() => {
          handleTouch(type);
        }}
      >
        <div>
          {currentOrder}
          {sortWay && (
            <div
              className={
                type === "method"
                  ? styles["mobile-sort-criteria-left"]
                  : styles["mobile-sort-criteria-right"]
              }
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleTouch(type);
              }}
            >
              {/* TODO: 바깥쪽 클릭하면 활성화 메뉴창 사라지게 하기 */}
              {sortItem.map((item: string) => {
                return (
                  <div
                    className={styles["mobile-criteria"]}
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
      </div>
    );
  };

  const sortedData = useMemo(() => {
    const dateSelector = (item: AlbumInfo) => {
      if (currentMethod === "작성일" || mobileCurrentMethod === "UPLOAD") {
        return new Date(item.uploadDate).getTime();
      } else if (currentMethod === "발매일" || mobileCurrentMethod === "RELEASE") {
        return new Date(item.releaseDate).getTime();
      }
      return 0;
    };

    const newData = [...data];

    newData.sort((a, b) =>
      currentCriteria === "오름차순" || mobileCurrentCriteria === "ASC"
        ? dateSelector(a) - dateSelector(b)
        : dateSelector(b) - dateSelector(a)
    );

    if (currentMethod === "아티스트" || mobileCurrentMethod === "ARTIST") {
      newData.sort((a, b) => {
        return currentCriteria === "오름차순" || mobileCurrentCriteria === "ASC"
          ? a.artist.localeCompare(b.artist)
          : b.artist.localeCompare(a.artist);
      });
    }

    if (currentMethod === "앨범" || mobileCurrentMethod === "ALBUM") {
      newData.sort((a, b) => {
        return currentCriteria === "오름차순" || mobileCurrentCriteria === "ASC"
          ? a.album.localeCompare(b.album)
          : b.album.localeCompare(a.album);
      });
    }

    return newData;
  }, [data, currentMethod, currentCriteria, mobileCurrentMethod, mobileCurrentCriteria]);

  const handleMouseEnter = (type: string) => {
    if (type === "method") {
      setSortMethod(true);
    } else if (type === "criteria") {
      setSortCriteria(true);
    }
  };

  const handleMouseLeave = (type: string) => {
    if (type === "method") {
      setSortMethod(false);
    } else if (type === "criteria") {
      setSortCriteria(false);
    }
  };

  const handleTouch = (type: string) => {
    if (type === "genre") {
      setMobileSortGenre(!mobileSortGenre);
    } else if (type === "method") {
      setMobileSortMethod(!mobileSortMethod);
    } else if (type === "criteria") {
      setMobileSortCriteria(!mobileSortCriteria);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}>
      <div className={styles["mobile-flexbox"]}>
        {pathName !== "upload" && (
          <div className={styles["sort-button-container"]}>
            <SortToggleButton
              type="method"
              sortItem={sortItems.method.ko}
              currentOrder={currentMethod}
              setCurrentOrder={setCurrentMethod}
              sortWay={sortMethod}
            />
            <SortToggleButton
              type="criteria"
              sortItem={sortItems.criteria.ko}
              currentOrder={currentCriteria}
              setCurrentOrder={setCurrentCriteria}
              sortWay={sortCriteria}
            />
          </div>
        )}
        {sortedData.map((data, index) => {
          // FIXME: 시간을 나타내주는 함수(formatDuration())를 만들어라.
          const minutes = Math.floor(data.duration / 60);
          const hours = Math.floor(minutes / 60);

          return (
            <div key={index}>
              <div className={styles["album-container"]}>
                <div className={styles["album-information-container"]}>
                  <div className={styles["album-art"]}>
                    <a className={styles["link"]} href={data.link} target="_blank">
                      <Image src={data.imgUrl} alt={data.album} fill={true} />
                      {/* <Image
                        src={data.imgUrl}
                        alt={data.album}
                        width={album.width}
                        height={album.height}
                      /> */}
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
                      {`${data.tracks}곡, `}
                      {minutes > 60
                        ? `${hours}시간 ${minutes % 60 > 0 ? `${minutes % 60}분` : ""}`
                        : `${minutes}분`}
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
                  {data.text.split("\n").map((text, index) => {
                    return (
                      <p key={index} className={styles["paragraph"]}>
                        {text}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className={styles["divider"]} />
            </div>
          );
        })}
      </div>
      {/* <div className={styles["mobile-bottom-container"]}>
        <MobileSortToggleButton
          type="method"
          sortItem={sortItems.method.en}
          currentOrder={mobileCurrentMethod}
          setCurrentOrder={setMobileCurrentMethod}
          sortWay={mobileSortMethod}
        />
        <MobileSortToggleButton
          type="criteria"
          sortItem={sortItems.criteria.en}
          currentOrder={mobileCurrentCriteria}
          setCurrentOrder={setMobileCurrentCriteria}
          sortWay={mobileSortCriteria}
        />
      </div> */}
    </div>
  );
}

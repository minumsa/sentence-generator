import React, { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import Image from "next/image";
import { AlbumInfo, SortType, activeStyle, album, deleteData, fetchData, updateData } from "./data";
import { useRouter } from "next/navigation";

interface pageProps {
  pathName: string;
}

export default function Content({ pathName }: pageProps) {
  // isAdmin: boolean,
  // genre: string
  const router = useRouter();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortingOptions, setSortingOptions] = useState<{
    type: SortType;
    order: {
      [Type in SortType]: boolean;
    };
  }>({
    type: "업로드일",
    order: {
      업로드일: false,
      발매일: false,
    },
  });
  const [showCategory, setShowCategory] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setData(await fetchData(pathName));
    }

    loadData();
  }, []);

  function SortToggleButton({ type }: { type: SortType }) {
    return (
      <div
        className={`${styles["button"]} ${styles["sort"]}`}
        style={sortingOptions.type === type ? { ...activeStyle } : {}}
        onClick={() => {
          setSortingOptions(prevSortingOption => ({
            type: type,
            order: {
              ...prevSortingOption.order,
              [type]:
                prevSortingOption.type === type
                  ? !prevSortingOption.order[type]
                  : prevSortingOption.order[type],
            },
          }));
        }}
      >
        {type} {sortingOptions.order[type] ? "↑" : "▾"}
      </div>
    );
  }

  const sortedData = useMemo(() => {
    const order = sortingOptions.order[sortingOptions.type];
    const type = sortingOptions.type;
    const dateSelector = (item: AlbumInfo) => {
      if (type === "업로드일") {
        return new Date(item.uploadDate).getTime();
      } else if (type === "발매일") {
        return new Date(item.releaseDate).getTime();
      }
      return 0;
    };
    const newData = [...data];
    newData.sort((a, b) =>
      order ? dateSelector(a) - dateSelector(b) : dateSelector(b) - dateSelector(a)
    );
    return newData;
  }, [data, sortingOptions]);

  const handleMouseEnter = () => {
    setShowCategory(true);
  };

  const handleMouseLeave = () => {
    setShowCategory(false);
  };

  return (
    <div>
      {pathName !== "upload" && (
        <div className={styles["sort-button-container"]}>
          <SortToggleButton type="업로드일" />
          <SortToggleButton type="발매일" />

          <div
            className={styles["category-test"]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            테스트 ▾
          </div>
          {showCategory && (
            <div>
              <ul style={{ margin: 0 }}>
                <li>카테고리 1</li>
                <li>카테고리 1</li>
                <li>카테고리 1</li>
                <li>카테고리 1</li>
              </ul>
            </div>
          )}
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
                <a className={styles["link"]} href={data.link} target="_blank">
                  <Image
                    src={data.imgUrl}
                    alt={data.album}
                    width={album.width}
                    height={album.height}
                  />
                </a>
                <div className={`${styles["text-container"]} ${styles["album-information"]}`}>
                  <div style={{ display: "flex", borderBottom: "1px solid #000000" }}>
                    <div style={{ marginRight: "5px" }}>{data.artist},</div>
                    <a className={styles["link"]} href={data.link} target="_blank">
                      <div className={styles["album-title"]}>{data.album}</div>
                    </a>
                  </div>
                  <div style={{ borderBottom: "1px solid #000000" }}>
                    <span>{`${data.releaseDate.slice(0, 4)}년 ${Number(
                      data.releaseDate.slice(5, 7)
                    )}월, ${data.label}`}</span>
                  </div>
                  <div style={{ borderBottom: "1px solid #000000" }}>
                    {`${data.tracks}곡, `}
                    {/* { formatDuration(data.duration) } */}
                    {minutes > 60
                      ? `${hours}시간 ${minutes % 60 > 0 ? `${minutes % 60}분` : ""}`
                      : `${minutes}분`}
                  </div>
                  {pathName.includes("admin") && (
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
                {/* {data.text.split("\n").map((text, index) => {
                return index + 1 < data.text.split("\n").length ? (
                  <div className={styles["line-break"]} key={index}>
                    {text}
                  </div>
                ) : (
                  <div key={index}>{text}</div>
                );
              })} */}
              </div>
            </div>
            <div className={styles["divider"]} />
          </div>
        );
      })}
    </div>
  );
}

("aasdfasdfa\nasdfasdf\nasdf");

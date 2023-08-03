"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AlbumInfo, album, contents, fetchData } from "./data";
import styles from "./music.module.css";

type SortType = "upload" | "release";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortingOptions, setSortingOptions] = useState<{
    type: SortType;
    order: {
      [Type in SortType]: boolean;
    };
  }>({
    type: "upload",
    order: {
      upload: false,
      release: false,
    },
  });

  const handleCategory = (category: string) => {
    const lowercasedCategory = category.toLowerCase();
    let pathName;

    // TODO: break가 있고 없고의 차이는?
    switch (lowercasedCategory) {
      case "all":
        pathName = "";
        break;
      case "r&b/soul":
        pathName = "r&b_soul";
        break;
      default:
        pathName = lowercasedCategory;
    }

    router.push(`/music/${pathName}`);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  // TODO: 버튼 컴포넌트 만들기

  const activeStyle = {
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "0",
    backgroundColor: "#ffccff",
  };

  const sortedData = useMemo(() => {
    const order = sortingOptions.order[sortingOptions.type];
    const type = sortingOptions.type;
    const dateSelector = (item: AlbumInfo) => {
      if (type === "upload") {
        return new Date(item.uploadDate);
      } else if (type === "release") {
        return new Date(item.releaseDate);
      }
    };
    const newData = [...data];
    newData.sort((a, b) =>
      order
        ? Number(dateSelector(a)) - Number(dateSelector(b))
        : Number(dateSelector(b)) - Number(dateSelector(a))
    );
    return newData;
  }, [data, sortingOptions]);

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
        {type.toUpperCase()} {sortingOptions.order[type] ? "↑" : "↓"}
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {contents.map(category => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                handleCategory(category);
              }}
              style={
                (pathName === "/music" && category === "ALL") ||
                (pathName === "r&b_soul" && category === "R&B/SOUL") ||
                pathName.includes(category.toLowerCase())
                  ? activeStyle
                  : {}
              }
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["sort-button-container"]}>
          <SortToggleButton type="upload" />
          <SortToggleButton type="release" />
        </div>
        {sortedData
          ? sortedData.map((data, index) => {
              const minutes = Math.floor(data.duration / 60);
              const hours = Math.floor(minutes / 60);

              return (
                <div className={styles["album-container"]} key={index}>
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
                      <div>{data.artist}</div>
                      <a className={styles["link"]} href={data.link} target="_blank">
                        <div className={styles["album-title"]}>{data.album}</div>
                      </a>
                      <div>
                        <span>{`${data.label}, ${data.releaseDate.slice(0, 4)}`}</span>
                      </div>
                      <div>
                        {`${data.tracks}곡, `}
                        {minutes > 60
                          ? `${hours}시간 ${minutes % 60 > 0 ? `${minutes % 60}분` : ""}`
                          : `${minutes}분`}
                      </div>
                    </div>
                  </div>
                  <div className={styles["text-container"]}>
                    {data.text.split("<br/>").map((text, index) => {
                      return index + 1 < data.text.split("<br/>").length ? (
                        <div className={styles["line-break"]} key={index}>
                          {text}
                        </div>
                      ) : (
                        <div key={index}>{text}</div>
                      );
                    })}
                  </div>
                  <div className={styles["divider"]} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

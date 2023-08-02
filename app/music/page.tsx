"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AlbumItem, album, contents, fetchData } from "./data";
import styles from "./music.module.css";

type SortType = "upload" | "release";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState<AlbumItem[]>([]);

  // const [sortType, setSortType] = useState<SortType>("upload");
  // const [uploadOrder, setUploadOrder] = useState<boolean>(false);
  // const [releaseOrder, setReleaseOrder] = useState<boolean>(true);
  const [sortData, setSortData] = useState<{
    order: {
      [K in SortType]: boolean;
    };
    type: SortType;
  }>({
    order: {
      upload: false,
      release: true,
    },
    type: "upload",
  });

  const handleCategory = (category: string) => {
    const categoryLowerCase = category.toLowerCase();
    let pathName;

    switch (categoryLowerCase) {
      case "all":
        pathName = "";
        break;
      case "r&b/soul":
        pathName = "r&b_soul";
        break;
      default:
        pathName = categoryLowerCase;
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
    const order = sortData.order[sortData.type];
    const type = sortData.type;
    const dateFetcher = (item: AlbumItem) => {
      if (type === "upload") {
        return new Date(item.uploadDate);
      } else if (type === "release") {
        return new Date(item.releaseDate);
      }
    };
    const newData = [...data];
    newData.sort((a, b) =>
      order
        ? Number(dateFetcher(a)) - Number(dateFetcher(b))
        : Number(dateFetcher(b)) - Number(dateFetcher(a))
    );
    return newData;
  }, [data, sortData]);

  // const sortByDate = (data: AlbumItem[], order: boolean, type: SortType) => {
  //   const dateFetcher = (item: AlbumItem) => {
  //     if (type === "upload") {
  //       return new Date(item.uploadDate);
  //     } else if (type === "release") {
  //       return new Date(item.releaseDate);
  //     }
  //   };
  //   const newData = [...data];
  //   newData.sort((a, b) =>
  //     order
  //       ? Number(dateFetcher(a)) - Number(dateFetcher(b))
  //       : Number(dateFetcher(b)) - Number(dateFetcher(a))
  //   );
  //   setSortedData(newData);
  // };

  // useEffect(() => {
  //   sortByDate();
  // }, [sortData, data]);

  function SortButton(props: { type: SortType; title: string }) {
    const { type, title } = props;
    return (
      <div
        className={`${styles["button"]} ${styles["sort"]}`}
        style={
          //TODO: revert
          sortData.type === type
            ? { ...activeStyle, top: type === "release" ? "80px" : "" }
            : { top: type === "release" ? "80px" : "" }
        }
        onClick={() => {
          setSortData(prevSortData => ({
            type: type,
            order: {
              ...prevSortData.order,
              [type]:
                prevSortData.type === type ? !prevSortData.order[type] : prevSortData.order[type],
            },
          }));
        }}
      >
        {title} {sortData.order[type] ? "↑" : "↓"}
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
        {/* TODO: absolute 위치는 flexbox에만 잡고 나머지는 그 안으로 넣기 */}
        <div className={styles["sort-button-container"]}>
          <SortButton type="upload" title="UPLOAD" />
          <SortButton type="release" title="RELEASE" />
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

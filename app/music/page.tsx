"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlbumItem, album, contents, fetchData } from "./data";
import styles from "./music.module.css";

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState<AlbumItem[]>([]);
  const [sortType, setSortType] = useState<string>("UPLOAD");
  const [uploadOrder, setUploadOrder] = useState<boolean>(false);
  const [releaseOrder, setReleaseOrder] = useState<boolean>(true);

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

  const sortByUploadDate = (data: AlbumItem[], uploadOrder: boolean) => {
    data.sort((a, b) =>
      uploadOrder
        ? Number(new Date(a.uploadDate)) - Number(new Date(b.uploadDate))
        : Number(new Date(b.uploadDate)) - Number(new Date(a.uploadDate))
    );
  };

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
        <div
          className={`${styles["button"]} ${styles["sort"]}`}
          style={sortType === "UPLOAD" ? activeStyle : {}}
          onClick={() => {
            setSortType("UPLOAD");
            setUploadOrder(!uploadOrder);
            sortByUploadDate(data, !uploadOrder);
          }}
        >
          {sortType === "UPLOAD" && uploadOrder ? "UPLOAD ↑" : "UPLOAD ↓"}
        </div>
        <div
          className={`${styles["button"]} ${styles["sort"]}`}
          style={sortType === "RELEASE" ? { ...activeStyle, top: "80px" } : { top: "80px" }}
          onClick={() => {
            setSortType("RELEASE");
            setReleaseOrder(!releaseOrder);
            sortByUploadDate(data, !releaseOrder);
          }}
        >
          {sortType === "RELEASE" && releaseOrder ? "RELEASE ↑" : "RELEASE ↓"}
        </div>
        {data
          ? data.map((data, index) => {
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

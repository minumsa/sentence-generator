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
  const [sortType, setSortType] = useState<string>("upload");
  const [uploadOrder, setUploadOrder] = useState<boolean>(false);
  const [releaseOrder, setReleaseOrder] = useState<boolean>(false);

  const handleCategory = (category: string) => {
    const pathName =
      category.toLowerCase() === "all"
        ? ""
        : category.toLowerCase() === "r&b/soul"
        ? "r&b_soul"
        : category.toLowerCase();

    router.push(`/music/${pathName}`);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  // TODO: 버튼 컴포넌트 만들기
  const ButtonComponent = () => {};

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
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
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
          className={styles["button-sort"]}
          style={
            sortType === "upload"
              ? {
                  color: "#000000",
                  fontWeight: "bold",
                  borderRadius: "0",
                  backgroundColor: "#ffccff",
                }
              : {}
          }
          onClick={() => {
            setSortType("upload");
            setUploadOrder(!uploadOrder);

            sortType === "upload" && !uploadOrder
              ? data.sort(
                  (a: { uploadDate: string }, b: { uploadDate: string }) =>
                    Number(new Date(a.uploadDate)) - Number(new Date(b.uploadDate))
                )
              : data.sort(
                  (a: { uploadDate: string }, b: { uploadDate: string }) =>
                    Number(new Date(b.uploadDate)) - Number(new Date(a.uploadDate))
                );
          }}
        >
          {sortType === "upload" && uploadOrder ? "업로드 ↑" : "업로드 ↓"}
        </div>
        <div
          className={styles["button-sort"]}
          style={
            sortType === "release"
              ? {
                  right: "20px",
                  top: "80px",
                  color: "#000000",
                  fontWeight: "bold",
                  borderRadius: "0",
                  backgroundColor: "#ffccff",
                }
              : { right: "20px", top: "80px" }
          }
          onClick={() => {
            setSortType("release");
            setReleaseOrder(!releaseOrder);

            sortType === "release" && !releaseOrder
              ? data.sort(
                  (a: { releaseDate: string }, b: { releaseDate: string }) =>
                    Number(a.releaseDate.slice(0, 4)) - Number(b.releaseDate.slice(0, 4))
                )
              : data.sort(
                  (a: { releaseDate: string }, b: { releaseDate: string }) =>
                    Number(b.releaseDate.slice(0, 4)) - Number(a.releaseDate.slice(0, 4))
                );
          }}
        >
          {sortType === "release" && releaseOrder ? "발매일 ↑" : "발매일 ↓"}
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

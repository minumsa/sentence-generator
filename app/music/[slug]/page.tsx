"use client";

import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Upload from "../Upload";
import Image from "next/image";
import styles from "../music.module.css";

interface MongoItem {
  id: string;
  imgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
  duration: number;
  tracks: number;
}

const ContentPage: NextPage<{ params: { slug: string } }> = ({ params }) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";

  const [albumId, setAlbumId] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [mongoDataArr, setMongoDataArr] = useState<MongoItem[]>([]);

  const contents = [
    "ALL",
    "POP",
    "K-POP",
    "J-POP",
    "ROCK",
    "ALTERNATIVE",
    "DISCO",
    "ELECTRONIC",
    "JAZZ",
    "R&B/SOUL",
    "FOLK",
    "COUNTRY",
    "CLASSICAL",
    "SOUNDTRACK",
  ];

  const [activeGenre, setActiveGenre] = useState("ALL");

  const handleGenreClick = (genre: any) => {
    const genrePath = genre.toLowerCase();
    const pathSuffix =
      genrePath === "all"
        ? ""
        : genrePath === "r&b/soul"
        ? "r&b_soul"
        : genrePath;
    router.push(`/music/${pathSuffix}`);
  };

  const [musicData, setMusicData] = useState<MongoItem | null>(null);

  async function fetchMongoData() {
    try {
      const response = await fetch("/api/music", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload music data");
      }

      const data = await response.json();
      data.sort(
        (a: { uploadDate: string }, b: { uploadDate: string }) =>
          Number(new Date(b.uploadDate)) - Number(new Date(a.uploadDate))
      );

      setMongoDataArr(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMongoData();
  }, []);

  const [uploadSort, setUploadSort] = useState<boolean>(true);
  const [releaseSort, setReleaseSort] = useState<boolean>(true);
  const [currentSort, setCurrentSort] = useState<string>("uploadSort");

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div
        className={styles["music-left-container"]}
        style={{ width: "250px", height: "100%" }}
      >
        <div
          className={styles["music-genre-container"]}
          style={{ paddingTop: "10px" }}
        >
          {contents.map((genre, index) => (
            <div
              key={genre}
              className={`${styles["music-genre"]} ${
                activeGenre === genre ? styles["active"] : ""
              }`}
              onClick={() => {
                setActiveGenre(genre);
                handleGenreClick(genre);
              }}
              style={
                genreByPath === genre ||
                (genre === "R&B/SOUL" && genreByPath === "R&B_SOUL") ||
                (genreByPath.length < 1 && activeGenre === genre)
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
                  : {}
              }
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["music-right-container"]}>
        {decodedSlug !== "upload" ? (
          <div>
            <div
              className={styles["music-top-menu"]}
              style={
                currentSort === "uploadSort"
                  ? {
                      color: "#000000",
                      fontWeight: "bold",
                      borderRadius: "0",
                      backgroundColor: "#ffccff",
                    }
                  : {}
              }
              onClick={() => {
                setUploadSort(!uploadSort);

                uploadSort
                  ? mongoDataArr.sort(
                      (a: { uploadDate: string }, b: { uploadDate: string }) =>
                        Number(new Date(a.uploadDate)) -
                        Number(new Date(b.uploadDate))
                    )
                  : mongoDataArr.sort(
                      (a: { uploadDate: string }, b: { uploadDate: string }) =>
                        Number(new Date(b.uploadDate)) -
                        Number(new Date(a.uploadDate))
                    );

                setCurrentSort("uploadSort");
              }}
            >
              {uploadSort ? "업로드 ↓" : "업로드 ↑"}
            </div>
            <div
              className={styles["music-top-menu"]}
              style={
                currentSort === "releaseSort"
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
                setReleaseSort(!releaseSort);

                releaseSort
                  ? mongoDataArr.sort(
                      (
                        a: { releaseDate: string },
                        b: { releaseDate: string }
                      ) =>
                        Number(a.releaseDate.slice(0, 4)) -
                        Number(b.releaseDate.slice(0, 4))
                    )
                  : mongoDataArr.sort(
                      (
                        a: { releaseDate: string },
                        b: { releaseDate: string }
                      ) =>
                        Number(b.releaseDate.slice(0, 4)) -
                        Number(a.releaseDate.slice(0, 4))
                    );

                setCurrentSort("releaseSort");
              }}
            >
              {decodedSlug !== "upload" && releaseSort
                ? "발매일 ↓"
                : "발매일 ↑"}
            </div>
          </div>
        ) : null}
        {decodedSlug === "upload" ? (
          <Upload
            genre={genre}
            setGenre={setGenre}
            link={link}
            setLink={setLink}
            text={text}
            setText={setText}
            albumId={albumId}
            setAlbumId={setAlbumId}
            musicData={musicData}
            setMusicData={setMusicData}
          />
        ) : mongoDataArr ? (
          mongoDataArr.map((data, index) => {
            return data.genre.replace("/", "_") === decodedSlug ? (
              <div className={styles["music-post-container"]} key={index}>
                <div className={styles["album-container"]}>
                  <div style={{ marginRight: "20px" }}>
                    <a
                      href={data.link}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "#ffccff",
                      }}
                    >
                      <Image
                        src={data.imgUrl}
                        alt="album art"
                        width="300"
                        height="300"
                      />
                    </a>
                  </div>
                  <div
                    className={styles["music-post-container-block"]}
                    style={{ marginLeft: "30px", marginTop: "30px" }}
                  >
                    <div>{data.artist}</div>
                    <a
                      href={data.link}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "#ffccff",
                      }}
                    >
                      <div
                        className={styles["name-name"]}
                        style={{ fontWeight: "800" }}
                      >
                        {data.album}
                      </div>
                    </a>
                    <div>
                      <span>{data.label},</span>{" "}
                      <span>{data.releaseDate.slice(0, 4)}</span>
                    </div>
                    <div>
                      {`${data.tracks}곡, `}
                      {Math.floor(data.duration / 60) < 60
                        ? `${Math.floor(data.duration / 60)}분 ${
                            data.duration % 60
                          }초`
                        : `${Math.floor(
                            Math.floor(data.duration / 60) / 60
                          )}시간 ${
                            Math.floor(data.duration / 60) % 60 > 0
                              ? (Math.floor(data.duration / 60) % 60) + "분"
                              : ""
                          }`}
                    </div>
                  </div>
                </div>
                <div className={styles["music-post-container-block"]}>
                  {data.text.split("<br/>").map((text, index) => {
                    return index + 1 < data.text.split("<br/>").length ? (
                      <div style={{ marginBottom: "50px" }} key={index}>
                        {text}
                      </div>
                    ) : (
                      <div key={index}>{text}</div>
                    );
                  })}
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ffccff",
                    padding: "20px",
                  }}
                ></div>
              </div>
            ) : null;
          })
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContentPage;

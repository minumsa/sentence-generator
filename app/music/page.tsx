"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Page() {
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";
  const [mongoDataArr, setMongoDataArr] = useState<MongoItem[]>([]);

  const contents = [
    "POP",
    "K-POP",
    "ROCK",
    "DISCO",
    "ELECTRONIC",
    "JAZZ",
    "R&B/SOUL",
    "FOLK",
    "CLASSICAL",
    "SOUNDTRACK",
    "ALL",
  ];

  const [activeGenre, setActiveGenre] = useState("ALL");
  const [loginPage, setLoginPage] = useState(false);

  const handleGenreClick = (genre: any) => {
    setLoginPage(false);
    const genrePath = genre.toLowerCase();
    genrePath === "all"
      ? router.push(`/music`)
      : router.push(`/music/${genrePath}`);
    genrePath === "r&b/soul"
      ? router.push(`/music/r&b_soul`)
      : router.push(`/music/${genrePath}`);
  };

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

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div className="music-left-container">
        <div className="music-genre-container" style={{ paddingTop: "10px" }}>
          {contents.map((genre, index) => (
            <div
              key={genre}
              className={`music-genre ${activeGenre === genre ? "active" : ""}`}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "calc(100% - 250px)",
          height: "100%",
          overflow: "scroll",
        }}
      >
        {/* <div
          className="music-right-container"
          style={{ overflow: "scroll", width: "90%" }}
        > */}
        {/* <div
            className="music-top-menu"
            onClick={() => {
              router.push("/music/upload");
              setActiveGenre("");
            }}
          >
            업로드
          </div> */}
        {/* <div className="music-bottom-title">카버 차트 v1.1.1</div> */}
        {mongoDataArr
          ? mongoDataArr.map((data, index) => {
              return (
                <div className="music-post-container" key={index}>
                  <div className="album-container">
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
                          width={300}
                          height={300}
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                    </div>
                    <div
                      className="music-post-container-block"
                      style={{ marginLeft: "30px", marginTop: "30px" }}
                    >
                      <div>{data.artist}</div>
                      <div className="name-name" style={{ fontWeight: "800" }}>
                        {data.album}
                      </div>
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
                      {/* <div>
                        <a
                          href={data.link}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "#ffccff",
                          }}
                        >
                          <div className="play-applemusic">
                            Play on Apple Music ↵
                          </div>
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div
                    className="music-post-container-block"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
              );
            })
          : null}
      </div>
    </div>
    // </div>
  );
}

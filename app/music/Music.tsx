"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Pop from "./Pop";

export default function Music({ children }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";

  const genres = [
    "POP",
    "K-POP",
    "ROCK",
    "DISCO",
    "FOLK",
    "JAZZ",
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
  };

  return (
    <>
      <div
        className="music-left-container"
        style={{ width: "250px", height: "100%" }}
      >
        <div className="music-genre-container" style={{ paddingTop: "10px" }}>
          {genres.map((genre, index) => (
            <div
              key={genre}
              className={`music-genre ${activeGenre === genre ? "active" : ""}`}
              onClick={() => {
                setActiveGenre(genre);
                handleGenreClick(genre);
              }}
              style={
                (genreByPath === genre && !loginPage) ||
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
          height: "100%",
        }}
      >
        <div
          className="music-right-container"
          style={{ overflow: "scroll", width: "90%" }}
        >
          <div
            className="music-top-menu"
            onClick={() => {
              router.push("/music/login");
              setActiveGenre("");
            }}
          >
            로그인
          </div>
          <div className="music-bottom-title">카버 차트 v1.1.1</div>
          {/* <Pop /> */}
        </div>
      </div>
    </>
  );
}

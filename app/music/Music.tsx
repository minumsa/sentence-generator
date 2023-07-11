"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Music({ children }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";

  console.log(genreByPath);

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
                // genreByPath === "POP"
                //   ?
                // &&
                // activeGenre === genreByPath &&
                // !loginPage
                //   {
                //     backgroundColor: "#ffccff",
                //     borderRadius: 0,
                //     color: "#000000",
                //     fontWeight: "bold",
                //     marginTop: "20px",
                //   }
                // :
                genreByPath === genre && !loginPage
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
                  : {}
                // genre === "POP"
                // ? { marginTop: "20px" }
                // : {}
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
            // onClick={() => setUploadPage(true)}
            onClick={() => {
              router.push("/music/login");
              // setLoginPage(true);
              setActiveGenre("");
            }}
            // style={
            //   loginPage
            //     ? {
            //         backgroundColor: "#ffccff",
            //         borderRadius: 0,
            //         color: "#000000",
            //         fontWeight: "bold",
            //       }
            //     : {}
            // }
          >
            로그인
          </div>
          <div className="music-bottom-title">카버 차트 v1.1.1</div>
          {children}
        </div>
      </div>
    </>
  );
}

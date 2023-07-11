"use client";

import { useState } from "react";
import Pop from "./Pop";
import Kpop from "./Kpop";
import Rock from "./Rock";
import Disco from "./Disco";
import Folk from "./Folk";
import Jazz from "./Jazz";
import Classical from "./Classical";
import Soundtrack from "./Soundtrack";
import Upload from "./Upload";

export default function Music() {
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
  const [uploadPage, setUploadPage] = useState(false);

  const handleGenreClick = (genre: any) => {
    setActiveGenre(genre);
    setUploadPage(false);
  };

  return (
    <div className="music-main-container">
      <div
        className="music-left-container"
        style={{ width: "250px", height: "100%" }}
      >
        <div className="music-genre-container">
          {genres.map((genre, index) => (
            <div
              key={genre}
              className={`music-genre ${activeGenre === genre ? "active" : ""}`}
              onClick={() => handleGenreClick(genre)}
              style={
                activeGenre === genre && !uploadPage
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
                  : genre === "POP"
                  ? { marginTop: "20px" }
                  : {} // 다른 장르에 대한 스타일이 없을 경우 null로 설정
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
            onClick={() => setUploadPage(true)}
            style={
              uploadPage
                ? {
                    backgroundColor: "#ffccff",
                    borderRadius: 0,
                    color: "#000000",
                    fontWeight: "bold",
                  }
                : {}
            }
          >
            업로드
          </div>
          <div className="music-bottom-title">카버 차트 v1.1.1</div>
          {uploadPage ? (
            <Upload />
          ) : (
            <>
              {activeGenre === "POP" && <Pop />}
              {activeGenre === "K-POP" && <Kpop />}
              {activeGenre === "ROCK" && <Rock />}
              {activeGenre === "DISCO" && <Disco />}
              {activeGenre === "FOLK" && <Folk />}
              {activeGenre === "JAZZ" && <Jazz />}
              {activeGenre === "CLASSICAL" && <Classical />}
              {activeGenre === "SOUNDTRACK" && <Soundtrack />}
              {activeGenre === "ALL" && (
                <>
                  <Pop />
                  <Kpop />
                  <Rock />
                  <Disco />
                  <Folk />
                  <Jazz />
                  <Classical />
                  <Soundtrack />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

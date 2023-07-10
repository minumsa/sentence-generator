"use client";

import Image from "next/image";
import { useState } from "react";
import Pop from "./Pop";
import Kpop from "./Kpop";
import Rock from "./Rock";

export default function Music() {
  const [showPop, setShowPop] = useState<boolean>(true);
  const [showKpop, setShowKpop] = useState<boolean>(false);
  const [showRock, setShowRock] = useState<boolean>(false);

  return (
    <>
      <div className="music-main-container">
        <div
          className="music-left-container"
          style={{ width: "250px", height: "100%", marginTop: "10px" }}
        >
          <div className="music-genre-container">
            <div
              className="music-genre"
              onClick={() => {
                setShowPop(true);
                setShowKpop(false);
                setShowRock(false);
              }}
            >
              POP
            </div>
            <div
              className="music-genre"
              onClick={() => {
                setShowKpop(true);
                setShowPop(false);
                setShowRock(false);
              }}
            >
              K-POP
            </div>
            <div
              className="music-genre"
              onClick={() => {
                setShowKpop(false);
                setShowPop(false);
                setShowRock(true);
              }}
            >
              ROCK
            </div>
            <div className="music-genre">DISCO</div>
            <div className="music-genre">FOLK</div>
            <div className="music-genre">JAZZ</div>
            <div className="music-genre">CLASSCIAL</div>
            <div className="music-genre">SOUNDTRACK</div>
            <div className="music-genre">ALL</div>
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
          <div className="music-right-container" style={{ overflow: "scroll" }}>
            <div className="music-top-menu">글쓰기</div>
            <div className="music-bottom-title">카버 차트 v1.1.1</div>
            {showPop && <Pop />}
            {showKpop && <Kpop />}
            {showRock && <Rock />}
          </div>
        </div>
      </div>
    </>
  );
}

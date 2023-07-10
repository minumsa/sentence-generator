"use client";

import Image from "next/image";

export default function Jazz() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/undercurrent.webp"
            alt="undercurrent"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>Bill Evans & Jim Hall, ‘Undercurrent’</div>
          <div>United Artist, 1962</div>
          <a
            href="https://music.apple.com/kr/album/newjeans-super-shy-single/1692686264"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#ffccff",
              // cursor: "pointer",
            }}
          >
            <div className="play-applemusic">Play on Apple Music ↵</div>
          </a>
        </div>
      </div>
      <div className="music-post-container-block">
        {`재즈 피아니스트 빌 에반스와 재즈 기타리스트 짐 홀이 같이 합주하여 녹음한 앨범. 1962년에 발매되었다. 피아노와 기타밖에 없는 단조로운 구성을 했는데도 그렇게 비어있는 느낌은 들지 않는다. 오히려 단순한 구성 덕분에 고급스러운 재즈 실내악의 느낌이 난다. 이 앨범은 Concierto와 같이, 쿨 재즈에 대해 거론할 때 빠지지 않는 앨범이기도 하다.`}
      </div>
      <div
        style={{
          // borderBottom: "thick double #ffccff",
          borderBottom: "1px solid #ffccff",
          padding: "20px",
        }}
      ></div>
      {/* {koreanFood.sort().map((x, index) => (
      <span
        key={index}
        style={{
          padding: "5px 20px",
          display: "inline-block",
        }}
      >
        {x}
      </span>
    ))} */}
    </div>
  );
}

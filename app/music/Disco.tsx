"use client";

import Image from "next/image";

export default function Disco() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/disco.jpeg"
            alt="kylie_disco"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>Kylie Minogue, ｟DISCO｠</div>
          <div>Darenote, 2020</div>
          <a
            href="https://music.apple.com/kr/album/disco/1523095299"
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
        {`카일리 미노그의 15번째 정규 앨범. 지난 앨범 Golden 이후 약 2년 6개월 만에 발매되는 정식 스튜디오 앨범이다. 앨범 타이틀에서 알 수 있듯, 1970~80년대 정통 디스코를 표방하였는데, 당시 기가 막힌 타이밍으로 더 위켄드와 두아 리파를 필두로 레트로 열풍이 일어나고 있었다. 발매 후 음악적으로 매우 크게 호평 받았다. 메타크리틱 기준 70점을 부여받으며 카일리의 앨범중 가장 높은 평점을 얻은 작품이 되었으며, 상업적으로도 좋은 성과를 냈다.`}
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

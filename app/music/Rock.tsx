"use client";

import Image from "next/image";

export default function Rock() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/bloodsugar.jpeg"
            alt="newjeans_supershy"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>Red Hot Chili Peppers, ｟Blood Sugar Sex Magik｠</div>
          <div>Warner Bros. Records, 1991</div>
          <a
            href="https://music.apple.com/kr/album/blood-sugar-sex-magik/945581828"
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
        {`칠리스 최고의 명반 중 하나이자, 펑크(funk) 록 불후의 명반으로 평가받는다. 이 앨범을 발표하고 나서 레드 핫 칠리 페퍼스는 본격적으로 세계적인 스타 반열에 오른다. 다만 이런 갑작스러운 인기와 영예가 몹시 부담스러웠던 밴드의 기타리스트 존 프루시안테는 투어 도중 돌연 모습을 감추고 만다. 이후 제인스 어딕션 출신의 기타리스트 데이브 나바로가 그의 자리를 대신하게 된다. 앨범 제작 과정을 다룬 한 시간 정도 분량의 다큐멘터리 'Funky Monks'가 있다.`}
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

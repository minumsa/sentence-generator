"use client";

import Image from "next/image";

export default function Folk() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/speaknow.webp"
            alt="speaknow"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>Taylor Swift, ｟Speak Now｠</div>
          <div>BIG MACHINE, 2010</div>
          <a
            href="https://music.apple.com/kr/album/speak-now-bonus-track-version/1440724790"
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
        {`전작 Fearless보다 팝, 록 사운드가 더 가미되었다. 이번 앨범의 제일 큰 특징은 전곡을 직접 단독 작사/작곡했다는 것이다. 한 노래에 많게는 수십명이 따라붙는 할리우드에서 매우 이례적인 일인데, 이전 앨범의 노래보다 발전한 가사로 대중과 평단에게 큰 호평을 받았다. 2012년 롤링 스톤 선정 50대 여성 아티스트 명반에서 45위로 선정되기도 했다. 팬들 사이에서도 명반으로 자주 꼽힌다. 상업적으로도 전작에 이어 흥행을 이어나갔다. 첫 주 약 104만장을 팔아 밀리언 초동 신화의 시작을 알린 앨범이다. 2010년 연간 차트 9위, 2011년 연간 차트 2위에 해당하는 롱런끝에 미국에서만 460만 장이 팔려 나갔다.`}
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

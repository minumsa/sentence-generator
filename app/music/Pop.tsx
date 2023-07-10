"use client";

import Image from "next/image";

export default function Pop() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image src="/aja.jpeg" alt="steelydan_aja" width="250" height="250" />
        </div>
        <div className="music-post-container-block">
          <div>Steely Dan, ｟Aja｠</div>
          <div>ABC, 1977</div>
          <a
            href="https://music.apple.com/kr/album/aja/1440938356"
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
        {`이 앨범은 스티브 갯, 조 샘플, 빅터 펠드만, 웨인 쇼터, 리 릿나워, 버나드 퍼디, 피트 크리스트리엡 등 당대의 정상급 재즈 연주자들을 참여시켜 완성한 것으로 타이틀곡 'Aja'를 비롯해 대부분의 트랙이 크게 히트했다. 수록곡 거의 대부분을 히트시키는 경우는 팝계에서는 흔히 있을 수 있는 일이지만 재즈계에선 거의 드문 일이라는 점을 감안할 때 이 앨범의 인기가 당시 어떠했는지를 잘 알 수 있다. 빌보드 앨범 차트에서 3위를 기록했으며, 1978년 연말 차트에서는 5위를 기록했다. 스틸리 댄의 앨범 중 상업적으로 가장 성공한 앨범이기도 하다.`}
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

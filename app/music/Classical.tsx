"use client";

import Image from "next/image";

export default function Classical() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/handel.jpg"
            alt="handel"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>
            조성진, ｟The Handel Project: Handel - Suites * Brahms -
            Variations｠
          </div>
          <div>Deutsche Grammophon, 2023</div>
          <a
            href="https://music.apple.com/kr/album/the-handel-project-handel-suites-brahms-variations/1653774345"
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
        {`2023년 2월 4일 국내 언론과 온라인 화상 간담회를 열었다. 헨델 프로젝트 앨범을 준비하면서 태어나서 가장 많이 연습을 했다고 한다. 작년 2월, 팬데믹으로 해외 투어 일정이 취소되었을 때, 매일 집에서 7~8시간 정도 연습을 했다. 왜 바흐가 아니라 헨델이었냐는 질문에 직감적으로 바로크 음악, 그 중에서도 헨델을 할 때가 됐다고 느꼈다고. 헨델은 좀 더 가슴에서 나오고 멜로디적인 부분이 있어서 바로크 음악을 많이 접하지 않았던 자신에게 접하기 쉬웠던 것 같다는 소감을 밝혔다. 또 글렌 굴드처럼 페달링을 거의 하지 않는 해석과 오히려 페달을 많이 밟아 낭만적으로 해석하는 방법 다 있는데, 이번엔 본인이 맞다고 생각하는 해석 방향으로 피아노를 쳤다고 이야기했다. 가장 행복한 순간은 투어를 끝내고 집에 돌아와 쉴 때. 그리고 집에서 새로운 악보 사서 배우고 연습할 때. 연습할 시간이 부족해 하루가 30시간이었으면 좋겠다는 말을 덧붙였다.`}
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

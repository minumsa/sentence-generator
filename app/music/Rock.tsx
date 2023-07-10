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
          <div>Red Hot Chili Peppers, ‘Blood Sugar Sex Magik’</div>
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
        공중으로 날아가는 멜로디에 강조를 두어 리듬적인 울림을 잔혹한 본질로
        걸러내는 것을 주장한 이 명성있는 비스티 보이즈 프로듀서는 칠리 페퍼스의
        다이내믹을 바꾸었습니다. 쾌격을 선사하는 "Give It Away"와 불타오르는
        "Suck My Kiss"는 힙합의 비트 중심적인 끈질김함을 강조한 록의 템플릿을
        확립하였으며, 이는 림프 비즈킷에서 닥터 드레까지 많은 아티스트들이
        차용하게 되었습니다. 하지만 더 내성적인 요소 - 채찍질하는 3박자의
        "Breaking the Girl"과 키디스의 약물 고백을 담은 "Under the Bridge" - 가
        새로운 차원을 드러냈습니다. 리듬 섹션은 스튜디오의 질감과 뉘앙스에 대한
        성장하는 호기심을 보여주었으며, 이는 이후의 다방면으로 판매량을 기록한
        'Californication' (1999)과 'By the Way' (2002)의 화려한 발라드에서
        탐구하게 될 것입니다.
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

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
          <div>Steely Dan, ‘Aja’</div>
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
        만약 당신이 1970년대 후반에 음향애호가였다면, 당신은 Aja를 소유했을
        것입니다. 스틸리 단의 여섯 번째 앨범은 꼼꼼한 프로덕션과 노래 덕분에
        귀에 쉽게 들어옵니다. 월터 베커와 도널드 페이건은 이 앨범을 통해
        대중적인 재즈 팝의 성공을 꿈꾸며 모든 것을 걸었습니다. 그리고 사실,
        "Deacon Blues"와 "Peg" 같은 매력적이고 매끄러운 곡들 덕분에, 윌리엄
        버로우스의 소설에서 이름을 가져온 대학생 밴드와 똑똑하고 냉소적인 가사로
        가득한 곡집은 확고한 슈퍼스타로 거듭나게 되었고, Top 5에 올라가며
        밀리언셀러를 기록했습니다. 그리고, 그래, Aja는 최고 엔지니어링 앨범
        부문에서 그래미상을 받기도 했습니다.
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

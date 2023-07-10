"use client";

import Image from "next/image";

export default function Kpop() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/supershy.jpeg"
            alt="newjeans_supershy"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>NewJeans, ‘Super Shy’</div>
          <div>HYBE, 2023</div>
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
        {`"Super Shy"는 제르지 클럽 리듬이 특징인 고에너지 팝 트랙으로, K-pop
        슈퍼그룹의 멤버들의 특징을 강조하는 역할을 한다. 한편, "New Jeans"는
        흥미로운 협업으로 파워퍼프 걸즈와 함께 만들어진 곡이다. 동반되는 뮤직
        비디오는 소녀들이 다양한 장면에서 악당들과 싸우며 작은 영웅으로
        재구성되는 모습을 보여준다.`}
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

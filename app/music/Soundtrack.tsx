"use client";

import Image from "next/image";

export default function Soundtrack() {
  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          <Image
            src="/annette.jpg"
            alt="annette"
            width="250"
            height="250"
            // style={{ border: "1px solid white" }}
          />
        </div>
        <div className="music-post-container-block">
          <div>
            {`Sparks, ｟Annette (Cannes Edition - Selections from the Motion
            Picture Soundtrack)｠`}
          </div>
          <div>CG Cinema International, 2021</div>
          <a
            href="https://music.apple.com/kr/album/annette-cannes-edition-selections-from-the-motion/1572625167"
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
        {`황당한 결혼식을 거친 도발적인 스탠드업 코미디언 헨리 맥헨리가 세계적으로 유명한 소프라노 앤 데프라누와의 약혼을 공개적으로 선언한다. 그 후, 앤은 나무 마리오네트 인형으로 표현된 딸 애네트를 출산한다. 앤의 경력이 번창하여 해외로 나가는 동안 헨리는 애넷을 돌보기 시작하면서 부부 사이가 흔들리기 시작한다. 이후 앤은 헨리에게서 과거 학대의 주장을 내놓는 여섯 명의 여성에 관한 꿈을 꾸며, 헨리에 의해 거의 죽을 뻔한 악몽을 꾸게 된다. 집으로 돌아온 후 헨리의 경력은 무대 위에서의 정신적 붕괴로 인해 악화되며, 헨리는 앤의 계속되는 성공에 대한 원한을 품게 된다. 두 사람은 관계를 회복하기 위해 비공개 크루즈를 예약한다. 그러나 크루즈는 폭풍우 밤에 헨리가 술에 취한 채로 앤을 강제로 왈츠하게 한 뒤 앤이 넘어져 바다로 떨어지는 재앙으로 끝난다. 아내가 죽은 사실을 깨닫고, 헨리와 애넷은 구명보트를 타고 한 섬에 이르게 된다. 그곳에서 둘은 잠에 들게 되는데, 그때 갑자기 앤의 유령이 나타나고 복수의 일환으로서 영아 애넷에게 자신의 목소리를 부여하여 헨리를 괴롭힐 수 있도록 한다.`}
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

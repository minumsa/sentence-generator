"use client";

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test21({ score, setScore }: TestProps) {
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [mark, setMark] = useState<string>("");

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  useEffect(() => {
    setScore(copiedScore);
  }, [copiedScore]);

  useEffect(() => {
    if (mark === "와플") {
      setScore((score: number) => copiedScore + 4);
    }
  }, [mark]);

  return (
    <>
      <div className="cine-test-format">
        <div
          className="cine-quiz"
          // style={{ marginTop: "10px" }}
        >
          {`21. 다음은 <로제타>(1999, 다르덴 형제)의 줄거리 일부이다. 빈칸에 가장 적절한 단어를 입력하시오.`}
        </div>
        <div
          style={{
            marginTop: "10px",
            // marginBottom: window.innerWidth > 450 ? "25px" : "20px",
            border: "1px solid #0e1111",
            padding: "15px 25px",
          }}
        >
          {/* <div style={mark1} onClick={clickAnswer1}></div> */}
          {` 알코올 중독에 빠진 어머니와 함께 이동식 트레일러에서 생활하고 있는 18살의 로제타에게 가난은 일상이다. 헌옷을 주워 어머니가 수선하면 그것을 내다 팔고, 먹을 음식이 없어 강에서 숭어를 잡기도 한다. 공장에서 일한 기간이 짧아 실업급여는 나오지 않고, 다른 일거리를 찾는 일마저 불가능해 보인다. 그러다 로제타는 근처 `}
          <input
            className="cine-test-input"
            onChange={e => setMark(e.target.value)}
          />
          {` 가게에서 일하는 리케와 친구가 된다.`}
        </div>
      </div>
    </>
  );
}

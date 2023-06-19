"use client";

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test25({ score, setScore }: TestProps) {
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [mark, setMark] = useState<string>("");

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  useEffect(() => {
    setScore(copiedScore);
  }, [copiedScore]);

  useEffect(() => {
    if (mark === "1342") {
      setScore((score: number) => copiedScore + 4);
    }
  }, [mark]);

  return (
    <>
      <div className="cine-test-format">
        <div className="cine-quiz" style={{ marginTop: "10px" }}>
          {`25. 다음은 마블 시네마틱 유니버스 페이즈 4 시리즈를 무작위로 나열한 것이다. 해당 영화들을 개봉 순으로 입력하시오. (예: 1324)`}
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            border: "1.5px solid #0e1111",
            padding: "15px",
          }}
        >
          {/* <div style={mark1} onClick={clickAnswer1}></div> */}
          <div>{`1) 블랙 위도우`}</div>
          <div>{`2) 블랙 팬서: 와칸다 포에버`}</div>
          <div>{`3) 이터널스`}</div>
          <div>{`4) 닥터 스트레인지: 대혼돈의 멀티버스`}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>정답 : </div>
          <input
            style={{ width: "70px", marginLeft: "10px" }}
            className="cine-test-input"
            onChange={e => setMark(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

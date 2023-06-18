"use client";

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test12({ score, setScore }: TestProps) {
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [mark, setMark] = useState<string>("");

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  useEffect(() => {
    setScore(copiedScore);
  }, [copiedScore]);

  useEffect(() => {
    if (mark === "열차") {
      setScore((score: number) => copiedScore + 4);
    }
  }, [mark]);

  return (
    <>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <div>{`12. 다음 빈칸을 적절하게 채워 정답을 완성하시오.`}</div>
          <div
            style={{
              border: "1.5px solid black",
              padding: "15px",
              marginTop: "10px",
            }}
          >
            {`1895년 겨울, 뤼미에르 형제는 프랑스의 한 카페에서 자신들이 만든 영상을 공개했다. 이때 상영된 50초 분량의 <`}
            <input
              className="cine-test-input"
              onChange={e => setMark(e.target.value)}
            ></input>
            {`의 도착>이라는 작품은 세계 최초의 영화로 널리 알려져 있다.`}
          </div>
        </div>
      </div>
    </>
  );
}

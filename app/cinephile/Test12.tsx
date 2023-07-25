"use client";

import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test12({ score, setScore }: TestProps) {
  const [copiedScore, setCopiedScore] = useState<number>(score);
  const [mark, setMark] = useState<string>("");

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  useEffect(() => {
    if (mark === "열차" || mark === "기차") {
      setScore((score: number) => copiedScore + 4);
    } else {
      setScore(copiedScore);
    }
  }, [mark, setScore]);

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div className={styles["cine-quiz"]}>
          <div>{`12. 다음 빈칸을 적절하게 채워 정답을 완성하시오.`}</div>
          <div
            style={{
              border: "1px solid black",
              padding: "15px 35px",
              marginTop: "10px",
            }}
          >
            <span>{`1895년 겨울, 뤼미에르 형제는 프랑스의 한 카페에서 자신들의 작품을 공개했다. 이때 상영되었던 50초 분량의 <`}</span>
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

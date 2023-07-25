"use client";

import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test4({ score, setScore }: TestProps) {
  const [copiedScore, setCopiedScore] = useState<number>(score);
  const [mark, setMark] = useState<string>("");

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  useEffect(() => {
    if (mark === "여성") {
      setScore((score: number) => score + 4);
    } else {
      setScore(copiedScore);
    }
  }, [mark]);

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div className={styles["cine-quiz"]}>
          {`4. 배우 양자경은 제95회 아카데미 시상식에서 <에브리씽 에브리웨어 올 앳
          원스>(2022, 댄 콴)로 여우주연상을 수상했다. 다음 빈칸을 채워 해당 수상
          소감을 완성하시오.`}
        </div>
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #0e1111",
            padding: "15px",
          }}
        >
          {`"`}
          <input
            className="cine-test-input"
            onChange={e => setMark(e.target.value)}
          />
          {` 여러분, 그 누구도 여러분께 전성기가 지났다는 말을 하지 못하게 하세요."`}
        </div>
      </div>
    </>
  );
}

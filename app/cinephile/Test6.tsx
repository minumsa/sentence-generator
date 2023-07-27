"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test6({ score, setScore }: TestProps) {
  const [answers, setAnswers] = useState<React.CSSProperties[]>([{}, {}, {}, {}]);
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const answerStyle: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function clickAnswer(answerIndex: number) {
    if (answers[answerIndex].backgroundColor === answerStyle.backgroundColor) {
      setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[answerIndex] = {};
        return updatedAnswers;
      });
      setScore(copiedScore);
    } else {
      const updatedAnswers = Array.from({ length: 4 }, (_, index) =>
        index === answerIndex ? answerStyle : {}
      );
      setAnswers(updatedAnswers);
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["question-container"]}>
        <div className={styles["question"]}>
          {`6. 다음은 영화 <샤이닝>(1980, 스탠리 큐브릭)의 한 장면이다. 사진 속 인물의 대사로 가장 적절한 것은?`}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cinephile/06-shining.webp"
            alt="cine-img-6"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "180" : "120"}
            style={{
              marginBottom: window.innerWidth > 450 ? "20px" : "15px",
              marginTop: window.innerWidth > 450 ? "15px" : "15px",
              border: "1px solid black",
            }}
          />
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={styles["options"]}
            style={answers[answerIndex - 1]}
            onClick={() => clickAnswer(answerIndex - 1)}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `"Johnny is coming!"`
              : answerIndex === 2
              ? `"Johnny, I found you!"`
              : answerIndex === 3
              ? `"It's me, Johnny!"`
              : answerIndex === 4
              ? `"Here's Johnny!"`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

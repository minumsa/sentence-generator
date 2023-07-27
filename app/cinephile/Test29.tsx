"use client";

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

export default function Test29({ score, setScore }: TestProps) {
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
      // 클릭한 답변을 다시 클릭하면 초기화
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
      setScore(score => (answerIndex === 1 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["question-container"]}>
        <div className={styles["question"]}>
          <span>{`29. 다음 중 픽사 애니메이션 스튜디오에서 만든 영화가 `}</span>
          <span style={{ textDecoration: "underline" }}>{`아닌`}</span>
          <span>{` 것은?`}</span>
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
              ? `엘리멘탈(2023, 피터 손)`
              : answerIndex === 2
              ? `보스 베이비(2017, 톰 맥그라스)`
              : answerIndex === 3
              ? `라따뚜이(2007, 브래드 버드)`
              : answerIndex === 4
              ? `벅스 라이프(1998, 존 라세터)`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

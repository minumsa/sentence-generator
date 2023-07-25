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

export default function Test14({ score, setScore }: TestProps) {
  const [answers, setAnswers] = useState<React.CSSProperties[]>([
    {},
    {},
    {},
    {},
  ]);
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
      setScore(score => (answerIndex === 2 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div className={styles["cine-quiz"]}>
          <span>{`14. 다음 중 누벨바그의 핵심 인물이었던 장뤽 고다르의 작품이 `}</span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={styles["cine-answer"]}
            style={answers[answerIndex - 1]}
            onClick={() => clickAnswer(answerIndex - 1)}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `비브르 사 비(1962)`
              : answerIndex === 2
              ? `리어 왕(1987)`
              : answerIndex === 3
              ? `내 어머니의 모든 것(1999)`
              : answerIndex === 4
              ? `언어와의 작별(2014)`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

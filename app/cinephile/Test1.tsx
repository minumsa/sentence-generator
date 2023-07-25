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

export default function Test1({ score, setScore }: TestProps) {
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
          <span>{`1. 다음 중 <헤어질 결심>(2022, 박찬욱)에 등장하지 `}</span>
          <span style={{ textDecoration: "underline" }}>않는</span>
          <span> 음식은?</span>
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
              ? "초밥"
              : answerIndex === 2
              ? "볶음밥"
              : answerIndex === 3
              ? "파스타"
              : answerIndex === 4
              ? "석류"
              : ""}
          </div>
        ))}
      </div>
    </>
  );
}

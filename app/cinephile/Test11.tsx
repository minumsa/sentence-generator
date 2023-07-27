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

export default function Test11({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 0 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["question-container"]}>
        <div className={styles["question"]}>
          <span>{`11. 다음 중 <언더 더 스킨>(2013, 조나단 글레이저)에서 에일리언 로라가 지구로 오게 된 이유로 가장 적절한 것은?`}</span>
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
              ? `식량으로 사용할 생물을 찾으려고`
              : answerIndex === 2
              ? `인간을 납치해 실험체로 쓰려고`
              : answerIndex === 3
              ? `우연히 블랙홀 속으로 빨려들어서`
              : answerIndex === 4
              ? `우주 탐사 도중 비행체의 결함으로 불시착해서`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

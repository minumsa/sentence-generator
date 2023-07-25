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

export default function Test9({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 1 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div className={styles["cine-quiz"]}>
          <span>{`9. 다음 중 성소수자 주인공이 등장하지 `}</span>
          <span style={{ textDecoration: "underline" }}>{`않는`}</span>
          <span>{` 영화는?`}</span>
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
              ? `호수의 이방인(2013, 알랭 기로디)`
              : answerIndex === 2
              ? `보이후드(2014, 리처드 링클레이터)`
              : answerIndex === 3
              ? `타오르는 여인의 초상(2019, 셀린 시아마)`
              : answerIndex === 4
              ? `걸(2018, 루카스 돈트)`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";
import { data } from "./data";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test1({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 2 ? score + 4 : copiedScore));
    }
  }

  return (
    <div className={styles["cine-test-format"]}>
      <div className={styles["cine-quiz"]}>{data[0].quiz}</div>
      {data[0].options?.map((option, index) => {
        return (
          <div
            className={styles["cine-answer"]}
            key={index}
            style={answers[index]}
            onClick={() => clickAnswer(index)}
          >{`${index + 1}) ${option}`}</div>
        );
      })}
    </div>
  );
}

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
  const mark: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function clickAnswer(answer: number) {
    if (answers[answer].backgroundColor === mark.backgroundColor) {
      setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[answer] = {};
        return updatedAnswers;
      });
      setScore(copiedScore);
    } else {
      const updatedAnswers = Array.from({ length: 4 }, (_, index) => (index === index ? mark : {}));
      setAnswers(updatedAnswers);
      setScore(score => (answer === data[0].answer ? score + 4 : copiedScore));
    }
  }

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz"]}>{data[0].quiz}</div>
      {data[0].options?.map((option, index) => {
        return (
          <div
            className={styles["options"]}
            key={index}
            style={answers[index]}
            onClick={() => clickAnswer(index)}
          >{`${index + 1}) ${option}`}</div>
        );
      })}
    </div>
  );
}

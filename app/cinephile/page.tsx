"use client";

import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";
import { data } from "./data";

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Page() {
  const [answers, setAnswers] = useState<React.CSSProperties[]>([{}, {}, {}, {}]);
  const [score, setScore] = useState<number>(0);
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const mark: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  interface QuizProps {
    page: number;
  }

  function Quiz({ page }: QuizProps) {
    // if (answers[answer].backgroundColor === mark.backgroundColor) {
    //   setAnswers(prevAnswers => {
    //     const updatedAnswers = [...prevAnswers];
    //     updatedAnswers[answer] = {};
    //     return updatedAnswers;
    //   });
    //   setScore(copiedScore);
    // } else {
    //   const updatedAnswers = Array.from({ length: 4 }, (_, index) => (index === index ? mark : {}));
    //   setAnswers(updatedAnswers);
    //   setScore(score => (answer === data[0].answer ? score + 4 : copiedScore));
    // }

    return (
      <div className={styles["cine-test-format"]}>
        <div className={styles["cine-quiz"]}>{data[page].quiz}</div>
        {data[page].options?.map((option, index) => {
          return (
            <div
              className={styles["cine-answer"]}
              key={index}
              style={answers[index]}
              // onClick={() => Quiz(index)}
            >{`${index + 1}) ${option}`}</div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["title"]}>시네필 테스트</div>
        <div className={styles["content"]}>
          <Quiz page={page} />
        </div>
        <div className={styles["button"]} onClick={() => setPage(prevPage => prevPage + 1)}>
          테스트 시작
        </div>
      </div>
    </div>
  );
}

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

export default function Test8({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div
        className={styles["quiz-container"]}
        style={
          {
            // marginTop: window.innerWidth > 450 ? "15px" : "0",
            // marginBottom: window.innerWidth > 450 ? "20px" : "0",
          }
        }
      >
        <div className={styles["quiz"]}>
          <span>{`8. <킬 빌> 시리즈에는 데들리 바이퍼스 출신의 4명의 암살자 캐릭터가 등장하는데, 해당 인물들은 모두 독사의 이름을 딴 독특한 코드 네임을 가지고 있다. 다음 중 주인공 베아트릭스 키도의 첫 번째 표적이었던 `}</span>
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            오렌 이시이
          </span>
          <span>의 코드 네임으로 가장 적절한 것은?</span>
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
              ? `코퍼헤드`
              : answerIndex === 2
              ? `캘리포니아 마운틴 스네이크`
              : answerIndex === 3
              ? `블랙 맘바`
              : answerIndex === 4
              ? `코튼마우스`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

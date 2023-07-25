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

export default function Test19({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div
          className={styles["cine-quiz"]}
          style={{
            marginBottom: window.innerWidth > 450 ? "10px" : "0",
          }}
        >{`19. 다음 중 <라쇼몽>(1950, 구로사와 아키라)에서 미후네 토시로가 연기한 산적 캐릭터의 이름으로 가장 적절한 것은?`}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cinephile/19-rashomon.webp"
            alt="cine-img-19"
            width={window.innerWidth > 450 ? "280" : "190"}
            height={window.innerWidth > 450 ? "210" : "140"}
            style={{
              marginBottom: "15px",
              marginTop: "5px",
              border: "1px solid black",
            }}
          />
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
              ? `테츠야`
              : answerIndex === 2
              ? `탄지로`
              : answerIndex === 3
              ? `타케노리`
              : answerIndex === 4
              ? `타조마루`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test6({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 4 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div
        className="cine-test-format"
        style={{
          marginTop: window.innerWidth > 450 ? "15px" : "0",
          marginBottom: window.innerWidth > 450 ? "20px" : "0",
        }}
      >
        <div className="cine-quiz">
          {`6. 다음은 영화 <샤이닝>(1980, 스탠리 큐브릭)의 한 장면이다. 사진 속 인물의 대사로 가장 적절한 것은?`}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/test6-img.jpeg"
            alt="test6-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "180" : "120"}
            style={{
              marginBottom: window.innerWidth > 450 ? "20px" : "15px",
              marginTop: window.innerWidth > 450 ? "15px" : "5px",
              border: "1.5px solid black",
            }}
          />
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className="cine-answer"
            style={answers[answerIndex - 1]}
            onClick={() => clickAnswer(answerIndex - 1)}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `"Johnny is coming!"`
              : answerIndex === 2
              ? `"Johnny, I found you!"`
              : answerIndex === 3
              ? `"It's me, Johnny!"`
              : answerIndex === 4
              ? `"Here's Johnny!"`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

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

export default function Test24({ score, setScore }: TestProps) {
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
          marginBottom: window.innerWidth > 450 ? "15px" : "0",
        }}
      >
        <div className="cine-quiz">{`24. <아사코>(2018), <드라이브 마이 카>(2021), <우연과 상상>(2022)을 연출한 다음 사진 속 일본 감독의 이름은?`}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cine-img-24.jpeg"
            alt="test24-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "200" : "130"}
            style={{
              marginBottom: window.innerWidth > 450 ? "25px" : "15px",
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
              ? `이와이 슌지`
              : answerIndex === 2
              ? `고레에다 히로카즈`
              : answerIndex === 3
              ? `소노 시온`
              : answerIndex === 4
              ? `하마구치 류스케`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

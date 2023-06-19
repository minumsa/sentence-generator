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

export default function Test30({ score, setScore }: TestProps) {
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
          <span>{`30. 다음 중 뱀파이어가 등장하지 `}</span>
          <span style={{ textDecoration: "underline" }}>{`않는`}</span>
          <span>{` 영화는?`}</span>
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
              ? `렛 미 인(2008, 토마스 알프레드슨)`
              : answerIndex === 2
              ? `박쥐(2009, 박찬욱)`
              : answerIndex === 3
              ? `오직 사랑하는 이들만이 살아남는다(2013, 짐 자무쉬)`
              : answerIndex === 4
              ? `언더 더 스킨(2013, 조나단 글레이저)`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

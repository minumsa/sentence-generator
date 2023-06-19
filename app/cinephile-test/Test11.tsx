"use client";

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test11({ score, setScore }: TestProps) {
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
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`11. 다음 중 실화를 바탕으로 만든 영화가 `}</span>
          <span style={{ textDecoration: "underline" }}>{`아닌`}</span>
          <span>{` 것은?`}</span>
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
              ? `타르(2022, 토드 필드)`
              : answerIndex === 2
              ? `한공주(2013, 이수진)`
              : answerIndex === 3
              ? `스포트라이트(2015, 톰 맥카시)`
              : answerIndex === 4
              ? `머니볼(2011, 베넷 밀러)`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

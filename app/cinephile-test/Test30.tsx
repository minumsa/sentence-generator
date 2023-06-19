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
        style={
          {
            // marginTop: window.innerWidth > 450 ? "15px" : "0",
            // marginBottom: window.innerWidth > 450 ? "20px" : "0",
          }
        }
      >
        <div className="cine-quiz">
          <span>{`30. 한국영상자료원에서 운영하고 있는 시네마테크(KOFA)는 일종의 영화 도서관으로, 영화 관련 자료를 보존하고 이를 모든 일반인에게 무료로 공개해 해당 자료의 가치를 공유한다. 다음 중 국내 시네마테크가 위치해 있는 지역은?`}</span>
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
              ? `서울특별시 광진구`
              : answerIndex === 2
              ? `서울특별시 마포구`
              : answerIndex === 3
              ? `전주시 완산구`
              : answerIndex === 4
              ? `부산광역시 해운대구`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

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
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className="cine-test-format">
        <div className="cine-quiz">{`24. <레이디 버드>(2017), <작은 아씨들>(2019), <바비>(2023)를 연출했으며, 배우로도 활동 중인 다음 사진 속 감독의 이름은?`}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cine-img-24.png"
            alt="test24-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "190" : "120"}
            style={{
              marginBottom: window.innerWidth > 450 ? "25px" : "15px",
              marginTop: window.innerWidth > 450 ? "15px" : "5px",
              border: "1px solid black",
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
              ? `패티 젠킨스`
              : answerIndex === 2
              ? `캐서린 비글로우`
              : answerIndex === 3
              ? `소피아 코폴라`
              : answerIndex === 4
              ? `그레타 거윅`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

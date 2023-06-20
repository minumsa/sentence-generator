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

export default function Test27({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 2 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className="cine-test-format">
        <div
          className="cine-quiz"
          // style={{ marginTop: "10px" }}
        >
          <span>{`27. 오즈의 마법사(1939, 빅터 플레밍)에서 주인공 도로시는 어떤 행위를 통해 결국 무사히 고향으로 돌아갈 수 있게 된다. 다음 중 그 행위로 가장 적절한 것은?`}</span>
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
              ? `문고리를 반대 방향으로 돌린다.`
              : answerIndex === 2
              ? `무지개 지팡이를 휘두른다.`
              : answerIndex === 3
              ? `구두 뒤꿈치를 맞부딪친다.`
              : answerIndex === 4
              ? `파란 요정에게 기도를 한다.`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

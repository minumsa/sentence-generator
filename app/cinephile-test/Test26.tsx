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

export default function Test26({ score, setScore }: TestProps) {
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
      setScore(score => (answerIndex === 0 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className="cine-test-format">
        <div
          className="cine-quiz"
          // style={{ marginTop: "10px" }}
        >
          <span>{`26. 다음 설명에 잘 부합하는 영화의 제목은?`}</span>
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "0 10px",
            margin: "15px 0 20px 0",
          }}
        >
          <ul>
            <li>거스 밴 샌트가 연출했다.</li>
            <li>숀 펜이 출연해 제81회 아카데미에서 남우주연상을 수상했다.</li>
            <li>
              미국의 성소수자 인권운동가이자 정치가인 실존 인물의 삶을 바탕으로
              만든 전기 영화이다.
            </li>
          </ul>
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
              ? `밀크`
              : answerIndex === 2
              ? `엉클 분미`
              : answerIndex === 3
              ? `인 디 아일`
              : answerIndex === 4
              ? `브로크백 마운틴`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

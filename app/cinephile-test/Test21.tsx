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

export default function Test21({ score, setScore }: TestProps) {
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
        <div className="cine-quiz">
          <span>{`21. 다음은 <로제타>(1999, 다르덴 형제)의 줄거리 일부이다. 다음 중 빈칸에 가장 적절한 단어는?`}</span>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "15px",
            border: "1px solid #0e1111",
            padding: "15px 25px",
          }}
        >
          {/* <div style={mark1} onClick={clickAnswer1}></div> */}
          <span>
            {` 알코올 중독에 빠진 어머니와 함께 이동식 트레일러에서 생활하고 있는 18살의 로제타에게 가난은 일상이다. 헌옷을 주워 어머니가 수선하면 내다 팔고, 먹을 음식이 없어 강에서 숭어를 잡기도 한다. 공장에서 일한 기간이 짧아 실업급여는 나오지 않고, 다른 일거리를 찾는 일도 어렵기만 하다. 그러다 로제타는 근처 `}
          </span>
          <input disabled className="cine-test-input" />
          <span>{` 가게에서 일하는 리케와 친구가 된다.`}</span>
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
              ? `초콜릿`
              : answerIndex === 2
              ? `젤라또`
              : answerIndex === 3
              ? `크레페`
              : answerIndex === 4
              ? `와플`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

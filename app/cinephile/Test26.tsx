"use client";

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
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div className={styles["cine-test-format"]}>
        <div
          className={styles["cine-quiz"]}
          // style={{ marginTop: "10px" }}
        >
          <span>{`26. 다음 중 <엑스맨 2>(2003), <엑스맨: 아포칼립스>(2016), <엑스맨: 다크 피닉스>(2019)에 등장하는 `}</span>
          <span style={{ textDecoration: "underline" }}>{`나이트크롤러`}</span>
          <span>{`의 능력으로 가장 적절한 것은?`}</span>
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
              ? `핌 입자를 사용해 몸 크기를 축소하거나 확대하고, 생체 전기로 에너지 광선을 발사한다.`
              : answerIndex === 2
              ? `세포와 조직을 자유자재로 조작해 다른 사람의 외형으로 변신할 수 있고 목소리까지 복제한다.`
              : answerIndex === 3
              ? `상대의 에너지를 흡수한다. 뮤턴트의 에너지를 흡수해 그 능력을 사용할 수도 있다.`
              : answerIndex === 4
              ? `차원을 통과해 텔레포트할 수 있다. 뼈 구조가 유연해 뛰어난 민첩성과 균형 감각을 가지고 있다.`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

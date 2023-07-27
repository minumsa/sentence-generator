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

export default function Test2({ score, setScore }: TestProps) {
  const [mark1, setMark1] = useState<React.CSSProperties>({});
  const [mark2, setMark2] = useState<React.CSSProperties>({});
  const [mark3, setMark3] = useState<React.CSSProperties>({});
  const [mark4, setMark4] = useState<React.CSSProperties>({});
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [answerStyle, setAnswerStyle] = useState<AnswerStyle>({
    color: "white",
    backgroundColor: "#0e1111",
  });

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function clickAnswer1() {
    setMark1(answerStyle);
    setMark2({});
    setMark3({});
    setMark4({});
    setScore(copiedScore);
  }

  function clickAnswer2() {
    setMark1({});
    setMark2(answerStyle);
    setMark3({});
    setMark4({});
    setScore(copiedScore);
  }

  function clickAnswer3() {
    setMark1({});
    setMark2({});
    setMark3(answerStyle);
    setMark4({});
    setScore((score: number) => copiedScore + 4);
  }

  function clickAnswer4() {
    setMark1({});
    setMark2({});
    setMark3({});
    setMark4(answerStyle);
    setScore(copiedScore);
  }

  return (
    <>
      <div className={styles["question-container"]}>
        <div className={styles["question"]}>
          <span>{`2. 다음 중 <벌새>(2018, 김보라)에 등장하는 대사가 `}</span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>
        <div className={styles["options"]} style={mark1} onClick={clickAnswer1}>
          <span>(1) “제 삶도 언젠가 빛이 날까요?”</span>
        </div>
        <div className={styles["options"]} style={mark2} onClick={clickAnswer2}>
          <span>(2) “언니, 그건 지난 학기잖아요.”</span>
        </div>
        <div className={styles["options"]} style={mark3} onClick={clickAnswer3}>
          (3) “더 나아지기 위해 우리는 기꺼이 더 나빠졌다. 그게 우리의 최선이었다.”
        </div>
        <div className={styles["options"]} style={mark4} onClick={clickAnswer4}>
          (4) “우리는 늘 누군가를 만나 무언가를 나눈다는 것, 세상은 참 신기하고 아름답다.”
        </div>
      </div>
    </>
  );
}

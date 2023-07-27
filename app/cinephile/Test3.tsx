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

export default function Test3({ score, setScore }: TestProps) {
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
    setScore(copiedScore);
  }

  function clickAnswer4() {
    setMark1({});
    setMark2({});
    setMark3({});
    setMark4(answerStyle);
    setScore((score: number) => copiedScore + 4);
  }

  return (
    <>
      <div className={styles["quiz-container"]}>
        <div className={styles["quiz"]}>
          <span>3. 다음 중 소설가 무라카미 하루키의 소설을 바탕으로 만든 영화가 </span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>
        <div className={styles["options"]} style={mark1} onClick={clickAnswer1}>
          (1) 드라이브 마이 카(2021, 하마구치 류스케)
        </div>
        <div className={styles["options"]} style={mark2} onClick={clickAnswer2}>
          (2) 버닝(2018, 이창동)
        </div>
        <div className={styles["options"]} style={mark3} onClick={clickAnswer3}>
          (3) 토니 타키타니(2004, 이치카와 준)
        </div>
        <div className={styles["options"]} style={mark4} onClick={clickAnswer4}>
          (4) 환상의 빛(1995, 고레에다 히로카즈)
        </div>
      </div>
    </>
  );
}

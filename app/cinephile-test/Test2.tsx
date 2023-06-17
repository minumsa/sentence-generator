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
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>2. 다음 중 소설 원작이 </span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 영화는?</span>
        </div>
        <div className="cine-answer" style={mark1} onClick={clickAnswer1}>
          <span>(1) 케빈에 대하여(2011, 린 램지)</span>
        </div>
        <div className="cine-answer" style={mark2} onClick={clickAnswer2}>
          <span>(2) 콜 미 바이 유어 네임(2017, 루카 구아다니노)</span>
        </div>
        <div className="cine-answer" style={mark3} onClick={clickAnswer3}>
          (3) 지구 최후의 밤(2018, 비간)
        </div>
        <div className="cine-answer" style={mark4} onClick={clickAnswer4}>
          (4) 서부 전선 이상 없다(2022, 에드워드 버거)
        </div>
      </div>
    </>
  );
}

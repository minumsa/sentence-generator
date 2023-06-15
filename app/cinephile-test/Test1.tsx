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

export default function Test1({ score, setScore }: TestProps) {
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
        <div>1. 다음 중 앨프리드 히치콕이 연출한 영화는?</div>
        <div className="cine-answer" style={mark1} onClick={clickAnswer1}>
          (1) 와일드 번치
        </div>
        <div className="cine-answer" style={mark2} onClick={clickAnswer2}>
          (2) 황야의 무법자
        </div>
        <div className="cine-answer" style={mark3} onClick={clickAnswer3}>
          (3) 북북서로 진로를 돌려라
        </div>
        <div className="cine-answer" style={mark4} onClick={clickAnswer4}>
          (4) 네 멋대로 해라
        </div>
      </div>
    </>
  );
}

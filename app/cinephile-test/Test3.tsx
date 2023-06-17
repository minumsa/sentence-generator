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
    setScore((score: number) => copiedScore + 4);
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
    setScore(copiedScore);
  }

  return (
    <>
      <div className="cine-test-format">
        <div className="cine-quiz">3. 다음 중 러닝타임이 가장 긴 영화는?</div>
        <div className="cine-answer" style={mark1} onClick={clickAnswer1}>
          (1) 잠(1964, 앤디 워홀)
        </div>
        <div className="cine-answer" style={mark2} onClick={clickAnswer2}>
          (2) 사탄 탱고(1994, 터르 벨러)
        </div>
        <div className="cine-answer" style={mark3} onClick={clickAnswer3}>
          (3) 반지의 제왕: 왕의 귀환(2003, 피터 잭슨)
        </div>
        <div className="cine-answer" style={mark4} onClick={clickAnswer4}>
          (4) 해피 아워(2015, 하마구치 류스케)
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test1({ score, setScore }: TestProps) {
  const [mark1, setMark1] = useState<React.CSSProperties>({});
  const [mark2, setMark2] = useState<React.CSSProperties>({});
  const [mark3, setMark3] = useState<React.CSSProperties>({});
  const [mark4, setMark4] = useState<React.CSSProperties>({});
  const [copiedScore, setCopiedScore] = useState<number>(0);

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function clickAnswer1() {
    setMark1({ borderBottom: "2.5px dashed black", width: "max-content" });
    setMark2({});
    setMark3({});
    setMark4({});
    setScore(copiedScore);
  }

  function clickAnswer2() {
    setMark1({});
    setMark2({ borderBottom: "2.5px dashed black", width: "max-content" });
    setMark3({});
    setMark4({});
    setScore(copiedScore);
  }

  function clickAnswer3() {
    setMark1({});
    setMark2({});
    setMark3({ borderBottom: "2.5px dashed black", width: "max-content" });
    setMark4({});
    setScore((score: number) => copiedScore + 4);
  }

  function clickAnswer4() {
    setMark1({});
    setMark2({});
    setMark3({});
    setMark4({ borderBottom: "2.5px dashed black", width: "max-content" });
    setScore(copiedScore);
  }

  return (
    <>
      <div className="cine-test-format">
        <div>1. 다음 중 앨프리드 히치콕이 연출한 영화는?</div>
        <div className="test111" style={mark1} onClick={clickAnswer1}>
          (1) 와일드 번치
        </div>
        <div className="test111" style={mark2} onClick={clickAnswer2}>
          (2) 황야의 무법자
        </div>
        <div className="test111" style={mark3} onClick={clickAnswer3}>
          (3) 북북서로 진로를 돌려라
        </div>
        <div className="test111" style={mark4} onClick={clickAnswer4}>
          (4) 네 멋대로 해라
        </div>
      </div>
    </>
  );
}

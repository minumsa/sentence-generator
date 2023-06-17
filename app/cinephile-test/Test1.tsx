"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  border: string;
  // backgroundColor: string;
}

export default function Test1({ score, setScore }: TestProps) {
  const [mark1, setMark1] = useState<React.CSSProperties>({});
  const [mark2, setMark2] = useState<React.CSSProperties>({});
  const [mark3, setMark3] = useState<React.CSSProperties>({});
  const [mark4, setMark4] = useState<React.CSSProperties>({});
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [answerStyle, setAnswerStyle] = useState<AnswerStyle>({
    // color: "white",
    // backgroundColor: "#0e1111",
    color: "blue",
    border: "1.5px solid blue",
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
          1. 다음 중 앨프리드 히치콕이 연출한 영화는?
        </div>
        <div className="cine-answer-container">
          <div className="cine-answer-top">
            <div
              className="cine-answer-top-left"
              style={mark1}
              onClick={clickAnswer1}
            >
              <div className="cine-top-img">
                <Image
                  src="/cine-img-1.png"
                  alt="cine-img-1"
                  width={150}
                  height={120}
                  // width={window.innerWidth > 450 ? "150" : "100"}
                  // height={window.innerWidth > 450 ? "80" : "53"}
                />
              </div>
              <div className="cine-top-title">
                <div>와일드 번치</div>
              </div>
            </div>
            <div
              className="cine-answer-top-right"
              style={mark2}
              onClick={clickAnswer2}
            >
              <div className="cine-top-img">
                <Image
                  src="/cine-img-2.png"
                  alt="cine-img-2"
                  width={150}
                  height={120}
                  // width={window.innerWidth > 450 ? "150" : "100"}
                  // height={window.innerWidth > 450 ? "80" : "53"}
                />
              </div>
              <div className="cine-top-title">
                <div>황야의 무법자</div>
              </div>
            </div>
          </div>
          <div className="cine-answer-bottom">
            <div
              className="cine-answer-top-left"
              style={mark3}
              onClick={clickAnswer3}
            >
              <div className="cine-top-img">
                <Image
                  src="/cine-img-3.png"
                  alt="cine-img-3"
                  width={150}
                  height={120}
                  // width={window.innerWidth > 450 ? "150" : "100"}
                  // height={window.innerWidth > 450 ? "80" : "53"}
                />
              </div>
              <div className="cine-top-title">
                <div style={{ fontSize: "18px" }}>북북서로 진로를 달려라</div>
              </div>
            </div>
            <div
              className="cine-answer-top-right"
              style={mark4}
              onClick={clickAnswer4}
            >
              <div className="cine-top-img">
                <Image
                  src="/cine-img-4.png"
                  alt="cine-img-4"
                  width={150}
                  height={120}
                  // width={window.innerWidth > 450 ? "150" : "100"}
                  // height={window.innerWidth > 450 ? "80" : "53"}
                />
              </div>
              <div className="cine-top-title">
                <div>황야의 무법자</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="cine-answer" style={mark1} onClick={clickAnswer1}>
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
        </div> */}
      </div>
    </>
  );
}

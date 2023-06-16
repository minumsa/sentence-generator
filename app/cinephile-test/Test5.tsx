"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  filter: string;
}

export default function Test5({ score, setScore }: TestProps) {
  const [mark1, setMark1] = useState<React.CSSProperties>({});
  const [mark2, setMark2] = useState<React.CSSProperties>({});
  const [mark3, setMark3] = useState<React.CSSProperties>({});
  const [mark4, setMark4] = useState<React.CSSProperties>({});
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const [answerStyle, setAnswerStyle] = useState<AnswerStyle>({
    // border: "dashed #0e1111 3px",
    // borderRadius: "50%",
    // overflow: "auto",
    // boxSizing: "border-box",
    filter: "opacity(0.5) drop-shadow(0 0 0 blue)",
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
        <div>
          <span> 5. 다음 중 세계 3대 국제 영화제의 로고가 </span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것을 선택하시오.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(1) </div>
          <div style={mark1} onClick={clickAnswer1}>
            <div>
              {" "}
              <Image
                src="/cine-cannes.png"
                alt="Cannes"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "75" : "50"}
                style={{
                  marginBottom: "8px",
                  marginTop: "10px",
                  // position: "fixed",
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "60px" }}>(2) </div>
          <div style={mark2} onClick={clickAnswer2}>
            <div>
              {" "}
              <Image
                src="/cine-venice.png"
                alt="Venice"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "80" : "53"}
                style={{
                  marginLeft: "22px",
                  marginBottom: "8px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(3) </div>
          <div style={mark3} onClick={clickAnswer3}>
            <div
              style={{
                width: window.innerWidth > 450 ? "150" : "100",
                marginTop: "10px",
                marginBottom: "8px",
              }}
            >
              {" "}
              <Image
                className="rotterdam"
                src="/cine-rotterdam.png"
                alt="Rotterdam"
                width={window.innerWidth > 450 ? "125" : "83"}
                height={window.innerWidth > 450 ? "110" : "70"}
                style={{
                  marginLeft: "10px",
                  marginRight: window.innerWidth > 450 ? "15px" : "15px",
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "50px" }}>(4) </div>
          <div style={mark4} onClick={clickAnswer4}>
            <div>
              {" "}
              <Image
                src="/cine-berlin.png"
                alt="Berlin"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "88" : "60"}
                style={{
                  marginLeft: "22px",
                  marginBottom: "8px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

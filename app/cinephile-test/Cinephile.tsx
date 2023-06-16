"use client";

import React, { useState, useEffect } from "react";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import Test4 from "./Test4";
import Test5 from "./Test5";

export default function Cinephile() {
  const [testNumber, setTestNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const minTestNumber = 1;
  const maxTestNumber = 5;

  console.log("score", score);

  function handleTest() {
    switch (testNumber) {
      case 1:
        return <Test1 score={score} setScore={setScore} />;
      case 2:
        return <Test2 score={score} setScore={setScore} />;
      case 3:
        return <Test3 score={score} setScore={setScore} />;
      case 4:
        return <Test4 score={score} setScore={setScore} />;
      case 5:
        return <Test5 score={score} setScore={setScore} />;
      default:
        return null;
    }
  }

  return (
    <div className="cine-container">
      <div className="cine-flex-container">
        <div className="cine-nav-container">
          <div className="cine-test-title">
            <div>{"씨네필 테스트"}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="cine-progress-bar">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                  width: `${(testNumber / maxTestNumber) * 100}%`,
                  backgroundColor: "#0e1111",
                }}
              >
                <div style={{ color: "white", fontSize: "22px" }}>{`${
                  (testNumber / maxTestNumber) * 100
                }%`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cine-content-container">{handleTest()}</div>
        <div className="cine-footer-container">
          <div
            className="cine-prev-button-flex"
            onClick={() => {
              if (testNumber > minTestNumber) setTestNumber(x => x - 1);
            }}
          >
            <div className="cine-prev-button">이전 문제</div>
          </div>
          <div
            className="cine-next-button-flex"
            onClick={() => {
              if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
            }}
          >
            <div className="cine-next-button">다음 문제</div>
          </div>
        </div>
      </div>
    </div>
  );
}

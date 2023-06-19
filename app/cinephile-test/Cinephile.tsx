"use client";

import React, { useState, useEffect } from "react";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import Test4 from "./Test4";
import Test5 from "./Test5";
import Test6 from "./Test6";
import Test7 from "./Test7";
import Test8 from "./Test8";
import Test9 from "./Test9";
import Test10 from "./Test10";
import Test11 from "./Test11";
import Test12 from "./Test12";
import Test13 from "./Test13";
import Test14 from "./Test14";
import Test15 from "./Test15";
import Test16 from "./Test16";
import Test17 from "./Test17";
import Test18 from "./Test18";
import Test19 from "./Test19";
import Test20 from "./Test20";
import Test21 from "./Test21";
import Test22 from "./Test22";
import Test23 from "./Test23";
import Test24 from "./Test24";
import Test25 from "./Test25";
import Test26 from "./Test26";
import Test27 from "./Test27";
import Test28 from "./Test28";
import Test29 from "./Test29";
import Test30 from "./Test30";
import Test0 from "./Test0";

export default function Cinephile() {
  const [testNumber, setTestNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const minTestNumber = 0;
  const maxTestNumber = 30;
  const progressPercent = Math.floor((testNumber / maxTestNumber) * 100);

  function handleTest() {
    switch (testNumber) {
      case 0:
        return <Test0 />;
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
      case 6:
        return <Test6 score={score} setScore={setScore} />;
      case 7:
        return <Test7 score={score} setScore={setScore} />;
      case 8:
        return <Test8 score={score} setScore={setScore} />;
      case 9:
        return <Test9 score={score} setScore={setScore} />;
      case 10:
        return <Test10 score={score} setScore={setScore} />;
      case 11:
        return <Test11 score={score} setScore={setScore} />;
      case 12:
        return <Test12 score={score} setScore={setScore} />;
      case 13:
        return <Test13 score={score} setScore={setScore} />;
      case 14:
        return <Test14 score={score} setScore={setScore} />;
      case 15:
        return <Test15 score={score} setScore={setScore} />;
      case 16:
        return <Test16 score={score} setScore={setScore} />;
      case 17:
        return <Test17 score={score} setScore={setScore} />;
      case 18:
        return <Test18 score={score} setScore={setScore} />;
      case 19:
        return <Test19 score={score} setScore={setScore} />;
      case 20:
        return <Test20 score={score} setScore={setScore} />;
      case 21:
        return <Test21 score={score} setScore={setScore} />;
      case 22:
        return <Test22 score={score} setScore={setScore} />;
      case 23:
        return <Test23 score={score} setScore={setScore} />;
      case 24:
        return <Test24 score={score} setScore={setScore} />;
      case 25:
        return <Test25 score={score} setScore={setScore} />;
      case 26:
        return <Test26 score={score} setScore={setScore} />;
      case 27:
        return <Test27 score={score} setScore={setScore} />;
      case 28:
        return <Test28 score={score} setScore={setScore} />;
      case 29:
        return <Test29 score={score} setScore={setScore} />;
      case 30:
        return <Test30 score={score} setScore={setScore} />;
      default:
        return null;
    }
  }

  return (
    <div className="cine-container">
      <div className="cine-flex-container">
        <div
          className="cine-nav-container"
          style={testNumber > 0 ? { height: "100px" } : { height: "50px" }}
        >
          <div className="cine-test-title">
            <div>{"시네필 테스트"}</div>
          </div>
          {testNumber === 0 ? (
            ""
          ) : (
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
                  <div style={{ color: "white", fontSize: "22px" }}>
                    {progressPercent > 9 ? `${progressPercent}%` : ``}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="cine-content-container">{handleTest()}</div>
        <div className="cine-footer-container">
          {/* <div
            className="cine-prev-button-flex"
            onClick={() => {
              if (testNumber > minTestNumber) setTestNumber(x => x - 1);
            }}
          >
            <div className="cine-prev-button">이전 문제</div>
          </div> */}
          {testNumber === 0 ? (
            <div
              className="cine-next-button-flex"
              onClick={() => {
                if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
              }}
            >
              <div className="cine-next-button">테스트 시작하기</div>
            </div>
          ) : (
            <div
              className="cine-next-button-flex"
              onClick={() => {
                if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
              }}
            >
              <div className="cine-next-button">다음 문제</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

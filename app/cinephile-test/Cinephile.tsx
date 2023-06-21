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
import Test31 from "./Test31";
import Image from "next/image";
import Answer from "./Answer";

export default function Cinephile() {
  const [testNumber, setTestNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const minTestNumber = 0;
  const maxTestNumber = 31;
  const progressPercent = Math.floor((testNumber / (maxTestNumber - 1)) * 100);
  const [progressContent, setProgressContent] = useState<any>();
  const [buttonContent, setButtonContent] = useState<any>();
  const [contentStyle, setContentStyle] = useState<any>();
  const [navStyle, setNavStyle] = useState<any>();
  const [value, setValue] = useState<string>("참가자");
  const [scoreComment, setScoreComment] = useState<string>("");

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
      case 31:
        return <Test31 value={value} score={score} />;
      case 32:
        return <Answer />;
      default:
        return null;
    }
  }

  useEffect(() => {
    let scoreComment = "";
    switch (true) {
      case score >= 0 && score <= 11:
        scoreComment = `${value} 님, 혹시 푼 거 맞나요? 🙄`;
        break;
      case score >= 12 && score <= 23:
        scoreComment = `그래도 노력은 인정합니다! 👏`;
        break;
      case score >= 24 && score <= 35:
        scoreComment = `어느 정도 맞췄지만 시네필이 되려면 아직 멀었습니다. 🫣`;
        break;
      case score >= 36 && score <= 47:
        scoreComment = `시네필은 아니지만 영화를 상당히 좋아하시는군요? 😮`;
        break;
      case score >= 48 && score <= 59:
        scoreComment = `시네필은 아니지만 상당히 훌륭합니다! ☺️`;
        break;
      case score >= 60 && score <= 71:
        scoreComment = `${value} 님은 시네필 꿈나무입니다! ⭐️`;
        break;
      case score >= 72 && score <= 83:
        scoreComment = `${value} 님은 애매한 시네필입니다. 🤔`;
        break;
      case score >= 84 && score <= 95:
        scoreComment = `${value} 님은 시네필이 분명합니다! 🥳`;
        break;
      case score >= 96 && score <= 107:
        scoreComment = `${value} 님은 거의 모르는 영화가 없으시군요? 🥸`;
        break;
      case score >= 108:
        scoreComment = `${value} 님은 상위 1% 시네필입니다. 🤩`;
        break;
      default:
        scoreComment = "";
    }
    setScoreComment(scoreComment);
  }, [score, value]);

  useEffect(() => {
    if (testNumber === 0 || testNumber > 30) {
      setProgressContent("");
    } else if (testNumber !== 31) {
      setProgressContent(
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="cine-progress-bar">
            <div
              className="cine-progress-content"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: `${(testNumber / (maxTestNumber - 1)) * 100}%`,
                backgroundColor: "#0e1111",
              }}
            >
              <div className="cine-progress-font" style={{ color: "white" }}>
                {progressPercent > 5 ? `${progressPercent}%` : ``}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [testNumber, value]);

  useEffect(() => {
    if (testNumber === 0) {
      setButtonContent(
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <input
            autoFocus
            type="string"
            placeholder="닉네임 입력"
            className="cine-name-input"
            onChange={e => setValue(e.target.value)}
          />
          <div
            className="cine-next-button-flex"
            onClick={() => {
              if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
            }}
          >
            <div className="cine-next-button">테스트 시작</div>
          </div>
        </div>
      );
    } else if (testNumber < 30) {
      setButtonContent(
        <div
          className="cine-next-button-flex"
          onClick={() => {
            if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
          }}
        >
          <div className="cine-next-button">다음 문제</div>
        </div>
      );
    } else if (testNumber === 30) {
      setButtonContent(
        <div
          className="cine-next-button-flex"
          onClick={() => {
            if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
          }}
        >
          <div className="cine-next-button">결과 보기</div>
        </div>
      );
    } else if (testNumber === 31) {
      setButtonContent(
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <div className="cine-score-comment">{scoreComment}</div>
            <div
              className="cine-answer-button-flex"
              style={{ marginTop: "10px" }}
              onClick={() => {
                setTestNumber(32);
              }}
            >
              <div className="cine-next-button">정답 보기</div>
            </div>
            <div
              className="cine-twitter-button-flex"
              style={{ marginTop: "10px" }}
            >
              <div className="cine-next-button">트위터 공유하기</div>
            </div>
            <div
              className="cine-kakao-button-flex"
              style={{ marginTop: "10px" }}
            >
              <div className="cine-next-button">카카오톡 공유하기</div>
            </div>
            <div
              className="cine-challenge-button-flex"
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                setTestNumber(0);
                setScore(0);
                setValue("");
              }}
            >
              <Image
                src="https://quiz.watcha.io/retry.svg"
                alt="retry"
                width={25}
                height={25}
              />
              <div className="cine-next-button" style={{ marginLeft: "5px" }}>
                다시 도전
              </div>
            </div>
          </div>
        </>
      );
    } else if (testNumber === 32) {
      setButtonContent(<></>);
    }
  }, [testNumber, value]);

  useEffect(() => {
    if (testNumber === 0) {
      setContentStyle({ marginBottom: "20px" });
    } else if (testNumber > 0) {
      setContentStyle({ marginBottom: "20px" });
    } else if (testNumber > 30) {
      setContentStyle({});
    }
  }, [testNumber]);

  useEffect(() => {
    if (testNumber === 0) {
      setNavStyle({ height: "30px" });
    } else if (testNumber > 0) {
      setNavStyle({ height: "90px" });
    }
  }, [testNumber]);

  console.log(score);

  return (
    <div className="cine-container">
      <div className="cine-flex-container">
        <div
          className="cine-nav-container"
          style={testNumber < 31 ? navStyle : { height: "30px" }}
        >
          <div
            className="cine-test-title"
            onClick={() => {
              setTestNumber(31);
            }} // TODO: 테스트용 온 클릭, 나중에 빼기!!
          >
            <div>{"시네필 테스트"}</div>
          </div>
          {progressContent}
        </div>
        <div className="cine-content-container" style={contentStyle}>
          {handleTest()}
        </div>
        <div className="cine-footer-container">{buttonContent}</div>
      </div>
    </div>
  );
}

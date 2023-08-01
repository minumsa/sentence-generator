"use client";

import React, { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { Question } from "./Question";
import { data } from "./data";
import axios from "axios";
import Image from "next/image";
import Script from "next/script";
import Answer from "./Answer";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Page() {
  const [pageType, setPageType] = useState<"index" | "test" | "result" | "answer">("index");
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [testPage, setTestPage] = useState<number>(1);
  const testPageMax = data.length;
  // const testPageMax = 5;
  const progressWidth = `${(testPage / testPageMax) * 100}%`;
  const progressPercent = `${Math.floor((testPage / testPageMax) * 100)}%`;
  const [userAnswer, setUserAnswer] = useState<any>("");
  const [userAnswerArray, setUserAnswerArray] = useState<(number | string)[]>(Array(25).fill(""));
  const [userName, setUserName] = useState<string>("참가자");
  const [rank, setRank] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const starCount: string = "⭐️".repeat(Math.round((totalScore / 100) * 5));

  const handleButton = () => {
    switch (pageType) {
      case "index": // 테스트 시작
        setPageType("test");
        break;
      case "test": // 다음 문제
        setTestPage(page => page + 1);
        setTotalScore(prevScore => prevScore + score);
        setUserAnswer("");
        break;
      default: // 다시 도전하기
        setTestPage(1);
        setTotalScore(0);
        setPageType("index");
    }

    // 결과 확인하기
    if (testPage === testPageMax) {
      setPageType("result");
    }
  };

  useEffect(() => {
    // TODO: useEffect 안 쓰고 useState(score) 해도 될듯?
    if (data[testPage - 1].answer === userAnswer) {
      setScore(4);
    } else if (data[testPage - 1].answer !== userAnswer) {
      setScore(0);
    }

    const updatedArray = [...userAnswerArray];
    updatedArray[testPage - 1] = userAnswer;
    setUserAnswerArray(updatedArray);
  }, [userAnswer]);

  const commentArr = [
    `${userName} 님, 문제 푼 거 맞나요? 🙄`,
    `그래도 노력은 인정합니다! 👏`,
    `어느 정도 맞췄지만 시네필이 되려면 아직 멀었습니다. 🫣`,
    `시네필은 아니지만 영화를 상당히 많이 보셨군요? 😮`,
    `시네필은 아니지만 상당히 훌륭합니다! ☺️`,
    `${userName} 님은 시네필 꿈나무입니다! ⭐️`,
    `에? ${userName} 님은 애매한 시네필입니다! 🤨`,
    `오오! ${userName} 님은 시네필이 분명합니다. 🥳`,
    `시네필 출두요! ${userName} 님은 거의 모르는 영화가 없으시군요? 🥸`,
    `놀랍습니다! ${userName} 님은 상위 1% 시네필입니다. 🤩`,
  ];

  const grade = commentArr.map((_, index) => {
    return Math.abs((index / commentArr.length) * 100 - totalScore);
  });

  const comment = commentArr[grade.indexOf(Math.min(...grade))];

  // TODO: vercel 백엔드 연결 공부하기
  useEffect(() => {
    axios
      .post("/api/createResult", {
        name: userName,
        score: totalScore,
      })
      .then(function (response) {
        setRank(response.data.order);
        setTotalCount(response.data.totalCount);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onShare = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: "text",
      text: `나의 시네필 평점은? ${starCount}`,
      link: {
        mobileWebUrl: "https://divdivdiv.com/cinephile",
        webUrl: "https://divdivdiv.com/cinephile",
      },
    });
  };

  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init("8b2e769ecd8f1b59e13d651bd3177712");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["title"]}>시네필 테스트</div>
        {pageType === "test" ? (
          <div className={styles["progress-container"]}>
            <div className={styles["progress-content"]} style={{ width: progressWidth }}>
              <div className={styles["progress-font"]}>{progressPercent}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles["content"]}>
          {pageType === "index" ? (
            <div className={styles["index-container"]}>
              <div className={styles["index-title"]}>닉네임을 알려주세요. 🥰 </div>
              <input
                autoFocus
                type="string"
                placeholder="닉네임 입력"
                className={styles["index-input"]}
                onChange={e => setUserName(e.target.value)}
              />
            </div>
          ) : pageType === "test" ? (
            <Question page={testPage} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
          ) : pageType === "result" ? (
            <div className={styles["result-container"]}>
              <div className={styles["result-text"]}>
                {userName} 님은 {totalCount}명 중 {rank}등!
              </div>
              <div className={styles["score"]}>{totalScore}점</div>
              <div className={styles["star-container"]}>
                <Image
                  className={styles["star-color"]}
                  src="/cinephile/star-color.webp"
                  alt="star-color"
                  width={window.innerWidth > 450 ? "230" : "230"}
                  height={window.innerWidth > 450 ? "47" : "47"}
                  style={{
                    clipPath: `inset(0 ${100 - totalScore}% 0 0)`,
                  }}
                />
                <Image
                  className={styles["star-mono"]}
                  src="/cinephile/star-mono.webp"
                  alt="star-mono"
                  width={window.innerWidth > 450 ? "230" : "230"}
                  height={window.innerWidth > 450 ? "47" : "47"}
                />
              </div>
              <div className={styles["comment"]}>{comment}</div>
            </div>
          ) : (
            <div className={styles["answer-container"]}>
              <div className={styles["index-title"]}>정답 및 해설 🧐</div>
              <Answer userAnswerArray={userAnswerArray} />
            </div>
          )}
        </div>
        {/* 버튼 */}
        <div style={{ paddingBottom: "30px" }}>
          {pageType === "answer" ? (
            <div
              className={styles["button"]}
              onClick={() => {
                setPageType("result");
              }}
            >
              이전 페이지로 돌아가기
            </div>
          ) : pageType === "result" ? (
            <React.Fragment>
              <div
                className={`${styles["button"]} ${styles["twitter"]}`}
                onClick={() => {
                  window.open(
                    `https://twitter.com/share?url=https://divdivdiv.com/cinephile&text=나의 시네필 평점은?${starCount}`
                  );
                }}
              >
                트위터 공유하기
              </div>
              <div
                className={`${styles["button"]} ${styles["kakao"]}`}
                onClick={() => {
                  onShare();
                }}
              >
                카카오톡 공유하기
              </div>
              <div
                className={styles["button"]}
                onClick={() => {
                  setPageType("answer");
                }}
              >
                정답 및 해설 보기
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
          <div className={styles["button"]} onClick={handleButton}>
            {pageType === "index"
              ? "테스트 시작"
              : pageType === "test" && testPage === testPageMax
              ? "결과 확인하기"
              : pageType === "test"
              ? "다음 문제"
              : "다시 도전하기"}
          </div>
        </div>
      </div>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit} />
    </div>
  );
}

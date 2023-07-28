"use client";

import React, { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { Question } from "./Question";
import { data } from "./data";
import axios from "axios";

export default function Page() {
  const [pageType, setPageType] = useState<"index" | "test" | "result" | "answer">("index");
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [testPage, setTestPage] = useState<number>(1);
  // const testPageMax = data.length;
  const testPageMax = 2;
  const progressWidth = `${(testPage / testPageMax) * 100}%`;
  const progressPercent = `${Math.floor((testPage / testPageMax) * 100)}%`;
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [userName, setUserName] = useState<string>("참가자");
  const [rank, setRank] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleButton = () => {
    if (pageType === "index") {
      setTotalScore(0);
      setPageType("test");
    }
    if (pageType === "test") setTestPage(page => page + 1);
    if (testPage === testPageMax) {
      setTestPage(1);
      setPageType("result");
    }
    if (pageType === "result") {
      setPageType("index");
    }
    if (pageType === "answer") "";
  };

  useEffect(() => {
    if (data[testPage - 1].answer === userAnswer) {
      setScore(4);
    } else if (data[testPage - 1].answer !== userAnswer) {
      setScore(0);
    }
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

  useEffect(() => {
    axios
      .post("/api2/createResult", {
        name: userName,
        score: score,
      })
      .then(function (response) {
        setRank(response.data.order);
        setTotalCount(response.data.totalCount);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
            <Question
              page={testPage}
              score={score}
              setTotalScore={setTotalScore}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
            />
          ) : pageType === "result" ? (
            <div className={styles["result-container"]}>
              <div className={styles["cine-end-div"]} style={{ marginBottom: "12px" }}>
                {userName} 님의 결과는?
              </div>
              <div className={styles["cine-end-div"]} style={{ marginBottom: "30px" }}>
                {totalCount}명 중에 {rank}등!
              </div>
              <div className={styles["cine-score"]}>{totalScore}점</div>
              <div className={styles["comment"]}>{comment}</div>
              {/* <div
                className={styles["cine-twitter-button-flex"]}
                style={{ marginTop: "10px" }}
                onClick={() => {
                  window.open(
                    `https://twitter.com/share?url=https://divdivdiv.com/cinephile&text=나의 시네필 평점은? ${scoreToStar}`
                  );
                }}
              >
                <div className={styles["cine-next-button"]}>트위터 공유하기</div>
              </div> */}
              {/* <div
                className={styles["cine-kakao-button-flex"]}
                style={{ marginTop: "10px" }}
                onClick={() => {
                  onShare();
                }}
              >
                <div className={styles["cine-next-button"]}>카카오톡 공유하기</div>
              </div> */}
              {/* <div
                className={styles["cine-challenge-button-flex"]}
                onClick={() => {
                  setTestNumber(0);
                  setScore(0);
                  setValue("참가자");
                }}
              >
                <div className={styles["cine-next-button"]} style={{ marginLeft: "5px" }}>
                  다시 도전하기
                </div>
              </div> */}
            </div>
          ) : (
            <div className={styles["answer-container"]}>
              <div className={styles["index-title"]}>정답 및 해설</div>
            </div>
          )}
        </div>
        {/* 버튼 */}
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
          <div
            className={styles["button"]}
            onClick={() => {
              setPageType("answer");
            }}
          >
            정답 및 해설 보기
          </div>
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
  );
}

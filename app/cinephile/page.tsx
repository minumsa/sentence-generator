"use client";

import React, { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { Question } from "./Question";
import { data } from "./data";

export default function Page() {
  const [pageType, setPageType] = useState<"index" | "test" | "result">("index");
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [testPage, setTestPage] = useState<number>(1);
  const testPageMax = data.length;
  const progressWidth = `${(testPage / testPageMax) * 100}%`;
  const progressPercent = `${Math.floor((testPage / testPageMax) * 100)}%`;
  const [userAnswer, setUserAnswer] = useState<any>(null);

  const handleButton = () => {
    if (pageType === "index") setPageType("test");
    if (pageType === "test") setTestPage(page => page + 1);
    if (testPage === testPageMax) {
      setTestPage(1);
      setPageType("result");
    }
  };

  useEffect(() => {
    if (data[testPage - 1].answer === userAnswer) {
      setScore(4);
    } else if (data[testPage - 1].answer !== userAnswer) {
      setScore(0);
    }
  }, [userAnswer]);

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
          {pageType === "test" ? (
            <Question
              page={testPage}
              score={score}
              setTotalScore={setTotalScore}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
            />
          ) : pageType === "result" ? (
            "result"
          ) : (
            "dldl"
          )}
        </div>
        <div className={styles["button"]} onClick={handleButton}>
          {pageType === "index"
            ? "테스트 시작"
            : pageType === "test"
            ? "다음 문제"
            : "처음으로 돌아가기"}
        </div>
      </div>
    </div>
  );
}

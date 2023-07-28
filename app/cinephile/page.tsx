"use client";

import React, { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { Question } from "./Question";

export default function Page() {
  const [pageType, setPageType] = useState<"index" | "question" | "result">("index");
  const [score, setScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [testPage, setTestPage] = useState<number>(1);
  const testPageMax = 25;
  const progressWidth = `${(testPage / (testPageMax - 1)) * 100}%`;
  const progressPercent = `${Math.floor((testPage / (testPageMax - 1)) * 100)}%`;

  const handleButton = () => {
    if (pageType === "index") setPageType("question");
    if (pageType === "question") setTestPage(page => page + 1);
  };

  console.log("totalScore", totalScore);

  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["title"]}>시네필 테스트</div>
        {pageType === "question" ? (
          <div className={styles["progress-container"]}>
            <div className={styles["progress-content"]} style={{ width: progressWidth }}>
              <div className={styles["progress-font"]}>{progressPercent}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles["content"]}>
          {pageType === "question" ? (
            <Question
              page={testPage}
              score={score}
              setScore={setScore}
              setTotalScore={setTotalScore}
            />
          ) : (
            ""
          )}
        </div>
        <div className={styles["button"]} onClick={handleButton}>
          {pageType === "index" ? "테스트 시작" : "다음 문제"}
        </div>
      </div>
    </div>
  );
}

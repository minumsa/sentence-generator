"use client";

import React, { useState } from "react";
import styles from "./cine.module.css";
import { Question } from "./Question";

export default function Page() {
  const [score, setScore] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageType, setPageType] = useState<"index" | "question" | "result">("index");

  const handleButton = () => {
    if (pageType === "index") setPageType("question");
    if (pageType === "question") setPage(page => page + 1);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["title"]}>시네필 테스트</div>
        <div className={styles["content"]}>
          {pageType === "question" ? (
            <Question page={page} score={score} setScore={setScore} />
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

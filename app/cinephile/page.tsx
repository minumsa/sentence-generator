"use client";

import React, { useState, useEffect } from "react";
import styles from "./cine.module.css";
import { data } from "./data";
import { Quiz } from "./Quiz";

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Page() {
  const [score, setScore] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const mark: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  console.log(score);

  return (
    <div className={styles["container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["title"]}>시네필 테스트</div>
        <div className={styles["content"]}>
          <Quiz page={page} score={score} setScore={setScore} />
        </div>
        <div className={styles["button"]} onClick={() => setPage(prevPage => prevPage + 1)}>
          테스트 시작
        </div>
      </div>
    </div>
  );
}

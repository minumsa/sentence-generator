"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./cine.module.css";

interface NameProps {
  value: string;
  score: number;
}

export default function Result({ value, score }: NameProps) {
  const maxScore = 120;
  const [myRank, setMyRank] = useState<number>(0);
  const [totalCount, setTotalcount] = useState<number>(0);

  const calculatePercentage = (score: number) => {
    return Math.floor((score / maxScore) * 100);
  };

  const percentage = calculatePercentage(score);
  const clipPathPercentage = Math.floor(percentage / 10) * 10;

  useEffect(() => {
    axios
      .post("/api2/createResult", {
        name: value,
        score: score,
      })
      .then(function (response) {
        setMyRank(response.data.order);
        setTotalcount(response.data.totalCount);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className={styles["cine-end-div"]} style={{ marginBottom: "12px" }}>
        {value} 님의 결과는?
      </div>
      <div className={styles["cine-end-div"]} style={{ marginBottom: "30px" }}>
        {totalCount}명 중에 {myRank}등!
      </div>
      <div className={styles["cine-score"]}>{percentage}점</div>
      <div
        className={styles["star-box"]}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          className={styles["point-star"]}
          src="/cinephile/star-color.webp"
          alt="gray-star"
          width={window.innerWidth > 450 ? "230" : "230"}
          height={window.innerWidth > 450 ? "47" : "47"}
          style={{
            position: "absolute",
            marginTop: "20px",
            clipPath: `inset(0 ${100 - clipPathPercentage}% 0 0)`,
            zIndex: 2,
          }}
        />
        <Image
          className={styles["background-star"]}
          src="/cinephile/star-mono.webp"
          alt="gray-star"
          width={window.innerWidth > 450 ? "230" : "230"}
          height={window.innerWidth > 450 ? "47" : "47"}
          style={{
            position: "absolute",
            marginTop: "20px",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

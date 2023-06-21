"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface NameProps {
  value: string;
  score: number;
}

export default function Test31({ value, score }: NameProps) {
  const maxScore = 120; // 최대 점수 설정

  const calculatePercentage = (score: number) => {
    return Math.floor((score / maxScore) * 100); // 백분율 계산
  };

  const percentage = calculatePercentage(score); // 현재 점수의 백분율 계산
  const clipPathPercentage = Math.floor(percentage / 10) * 10; // 10% 단위로 변화

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className="cine-end-div">{value} 님의 결과는?</div>
      <div className="cine-score">{percentage}점</div>
      <div
        className="star-box"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          className="point-star"
          src="/cine-star-2.png"
          alt="gray-star"
          width={window.innerWidth > 450 ? "230" : "230"}
          height={window.innerWidth > 450 ? "47" : "47"}
          style={{
            position: "absolute",
            marginTop: "20px",
            clipPath: `inset(0 ${100 - clipPathPercentage}% 0 0)`, // 백분율에 따라 클리핑 설정
            zIndex: 2, // point-star 위에 배치
          }}
        />
        <Image
          className="background-star"
          src="/cine-star-1.png"
          alt="gray-star"
          width={window.innerWidth > 450 ? "230" : "230"}
          height={window.innerWidth > 450 ? "47" : "47"}
          style={{
            position: "absolute",
            marginTop: "20px",
            zIndex: 1, // point-star 위에 배치
          }}
        />
      </div>
    </div>
  );
}

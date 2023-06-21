"use client";

import React, { useState, useEffect } from "react";

export default function Answer() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginTop: "10px" }}>
        <div className="cine-test-format">
          <div className="cine-quiz">
            <span>{`1. 다음 중 <헤어질 결심>(2022, 박찬욱)에 등장하지 `}</span>
            <span style={{ textDecoration: "underline" }}>않는</span>
            <span> 음식은?</span>
          </div>
          {[1, 2, 3, 4].map(answerIndex => (
            <div
              key={answerIndex}
              className={`cine-answer-answer ${
                answerIndex === 3 ? "cine-answer-selected" : ""
              }`}
            >
              ({answerIndex}){" "}
              {answerIndex === 1
                ? "초밥"
                : answerIndex === 2
                ? "볶음밥"
                : answerIndex === 3
                ? "파스타"
                : answerIndex === 4
                ? "석류"
                : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="cine-answer-line"></div>

      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`2. 다음 중 <벌새>(2018, 김보라)에 등장하는 대사가 `}</span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>

        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `“제 삶도 언젠가 빛이 날까요?”`
              : answerIndex === 2
              ? `“언니, 그건 지난 학기잖아요.”`
              : answerIndex === 3
              ? `“더 나아지기 위해 우리는 기꺼이 더 나빠졌다. 그게 우리의
                최선이었다.” // <최선의 삶>(2019, 이우정)에 등장하는 대사`
              : answerIndex === 4
              ? `“우리는 늘 누군가를 만나 무언가를 나눈다는 것, 세상은 참 신기하고
                아름답다.”`
              : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

export default function Test0() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "90%",
          border: "1.5px solid black",
          fontSize: "25px",
          padding: "15px",
        }}
      >
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <span className="test0-span">※</span>
          <span className="test0-span-2"> 테스트 전 유의사항 </span>
          <span className="test0-span">※</span>
        </div>
        <ol
          className="test0-ol"
          style={{
            lineHeight: "180%",
          }}
        >
          <li>총 30문제가 준비되어 있습니다.</li>
          <li>어떤 문제는 주관식입니다.</li>
          <li>이미지가 포함된 문제도 있습니다.</li>
          <li>
            스포일러의 가능성은 최대한 배재했으나, 특정 문제에는 개봉된 지
            20년이 넘은 영화에 대한 키워드가 등장합니다.
          </li>
          <li>이 테스트는 재미로만 즐겨주세요.</li>
          <li>재밌었다면 이 페이지를 주변에 공유해주세요.</li>
        </ol>
      </div>
    </>
  );
}

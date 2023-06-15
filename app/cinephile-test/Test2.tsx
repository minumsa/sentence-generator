"use client";

import React, { useState, useEffect } from "react";

export default function Test2() {
  return (
    <>
      <div className="cine-test-format">
        <div></div>
        <span>2. 다음 중 소설 원작이 </span>
        <span style={{ textDecoration: "underline" }}>아닌 </span>
        <span>영화는?</span>
        <div>(1) 케빈에 대하여(2011, 린 램지) </div>
        <div>(2) 콜 미 바이 유어 네임(2017, 루카 구아다니노)</div>
        <div>(3) 지구 최후의 밤(2018, 비간)</div>
        <div>(4) 서부 전선 이상 없다(2022, 에드워드 버거)</div>
      </div>
    </>
  );
}

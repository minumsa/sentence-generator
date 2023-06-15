"use client";

import React, { useState, useEffect } from "react";
import Test1 from "./Test1";

export default function Cinephile() {
  const [testNumber, setTestNumber] = useState<number>(1);

  function handleTest() {
    if (testNumber === 1) {
      return (
        <>
          <Test1 />
        </>
      );
    }
  }

  return (
    <div className="cine-container">
      <div className="cine-flex-container">
        <div className="cine-nav-container">nav</div>
        <div className="cine-content-container">{handleTest()}</div>
        <div className="cine-footer-container">
          <div className="cine-prev-button-flex">
            <div className="cine-prev-button">이전 문제</div>
          </div>
          <div className="cine-next-button-flex">
            <div className="cine-next-button">다음 문제</div>
          </div>
        </div>
      </div>
    </div>
  );
}

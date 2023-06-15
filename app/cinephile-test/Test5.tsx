"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Test5() {
  return (
    <>
      <div className="cine-test-format">
        <div>
          <span> 5. 다음 중 세계 3대 국제 영화제의 로고가 </span>
          <span style={{ textDecoration: "underline" }}>아닌 </span>
          <span>것을 선택하시오.</span>
        </div>
        <div>
          <div style={{ marginBottom: "1px" }}>(1) </div>
          <Image
            src="https://i.namu.wiki/i/vmosz3KHdVQ4Pe66JbcWIgpj_YVCdju0CDPK1tMO_1Pznq7v4GPIqVBE8SYfoa0BrSuEK09LJLRS9Zkk02TNVpoF7xNpbM12tmfVDn2OLbqg9kqrCX840Jsv8qRw5U-srlPcCDdjXF2FzfKgz42F_A.svg"
            alt="Cannes"
            width="150"
            height="75"
            style={{ marginBottom: "8px" }}
          />
        </div>
        <div>(2) 황야의 무법자</div>
        <div>(3) 북북서로 진로를 돌려라</div>
        <div>(4) 네 멋대로 해라</div>
      </div>
    </>
  );
}

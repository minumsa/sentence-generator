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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(1) </div>
          <div>
            {" "}
            <Image
              src="https://i.namu.wiki/i/vmosz3KHdVQ4Pe66JbcWIgpj_YVCdju0CDPK1tMO_1Pznq7v4GPIqVBE8SYfoa0BrSuEK09LJLRS9Zkk02TNVpoF7xNpbM12tmfVDn2OLbqg9kqrCX840Jsv8qRw5U-srlPcCDdjXF2FzfKgz42F_A.svg"
              alt="Cannes"
              width="150"
              height="75"
              style={{ marginBottom: "8px", marginTop: "10px" }}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>(2) </div>
          <div>
            {" "}
            <Image
              src=" https://i.namu.wiki/i/DQ5hBTG06AnGXl7LQHWlV3lMcZLt16azSj9K1dOzgBy-gWFq73ZJc5i8gwrirngmcah6Y3_UUGRYbmAV8VsML6pNf07KzFUxqkJX1fGUXzPziIYjL8FSK8pSXtY9HdBglYtf0LgY4-kc_qmcoET5nw.svg"
              alt="Venice"
              width="150"
              height="80"
              style={{
                marginLeft: "22px",
                marginBottom: "8px",
                marginTop: "10px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(3) </div>
          <div style={{ width: "150px" }}>
            {" "}
            <Image
              src="/iffr.jpeg"
              alt="Oscars"
              width="125"
              height="110"
              style={{
                marginLeft: "10px",
                marginBottom: "8px",
                marginTop: "10px",
              }}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>(4) </div>
          <div>
            {" "}
            <Image
              src="https://i.namu.wiki/i//tvU9Fd43KcGcWsGVAGkPJvCacjzvcf00nQKrJmqHo6CoZt5pqCwz77izwcjKkmO_O1479eAuYXOFfo7VROsCyJMY5aVx5kchHvEvqYTrnfcNbbfg8O_zayC9GDUZqv9D-5bvZ-svlFn6YBo1q1imYg.svg"
              alt="Venice"
              width="150"
              height="88"
              style={{
                marginLeft: "22px",
                marginBottom: "8px",
                marginTop: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Test5() {
  return (
    <>
      <div className="cine-test-format">
        <div>
          <span> 5. 다음 중 세계 3대 국제 영화제의 로고가 </span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것을 선택하시오.</span>
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
              src="cannes.svg"
              alt="Cannes"
              width={window.innerWidth > 450 ? "150" : "100"}
              height={window.innerWidth > 450 ? "75" : "50"}
              style={{ marginBottom: "8px", marginTop: "10px" }}
            />
          </div>
          <div style={{ marginLeft: "60px" }}>(2) </div>
          <div>
            {" "}
            <Image
              src="venice.svg"
              alt="Venice"
              width={window.innerWidth > 450 ? "150" : "100"}
              height={window.innerWidth > 450 ? "80" : "53"}
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
          <div style={{ width: window.innerWidth > 450 ? "150" : "100" }}>
            {" "}
            <Image
              className="rotterdam"
              src="/rotterdam.jpeg"
              alt="Rotterdam"
              width={window.innerWidth > 450 ? "125" : "90"}
              height={window.innerWidth > 450 ? "110" : "78"}
              style={{
                marginLeft: "10px",
                marginBottom: "8px",
                marginTop: "10px",
                marginRight: window.innerWidth > 450 ? "15px" : "0px",
              }}
            />
          </div>
          <div style={{ marginLeft: "60px" }}>(4) </div>
          <div>
            {" "}
            <Image
              src="berlin.svg"
              alt="Berlin"
              width={window.innerWidth > 450 ? "150" : "100"}
              height={window.innerWidth > 450 ? "88" : "60"}
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

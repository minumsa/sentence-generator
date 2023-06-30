"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import Clock from "./Clock";
import Main from "./Main";

const Index: React.FC = () => {
  const [language, setLanguage] = useState<string>("A");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const [dayOfWeek, dayOfEngWeek] = getDayOfWeek(currentDate);

  function getDayOfWeek(date: Date): [string, string] {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const daysOfEngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return [daysOfWeek[dayIndex], daysOfEngWeek[dayIndex]];
  }

  const [checkerWidth, setCheckerWidth] = useState<number>(4);

  return (
    <div
      className="index-container-container"
      style={{
        backgroundColor: isDarkMode ? "#ffffff" : "#000000",
        backgroundSize: isDarkMode
          ? `${checkerWidth * 2}px ${checkerWidth * 2}px`
          : "0",
        backgroundPosition: isDarkMode
          ? `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`
          : "0",
      }}
    >
      <div
        className="index-container"
        style={
          isDarkMode
            ? { backgroundColor: "rgb(30, 30, 30)", color: "#ffffff" }
            : { backgroundColor: "#ffffff", color: "rgb(30, 30, 30)" }
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "98%",
              height: "35px",
              borderBottom: isDarkMode
                ? "0.5px solid #ffffff"
                : "0.5px solid #000000",
              marginBottom: "30px",
            }}
          >
            <div className="menu-text" style={{ marginLeft: "10px" }}>
              divdivdiv
            </div>
            <div className="menu-text">
              {language === "A" ? "About" : "소개"}
            </div>
            <div className="menu-text">
              {language === "A" ? "Contact" : "연결"}
            </div>
            <div className="index-menu-grow" style={{ flexGrow: "1" }}></div>
            <div
              className="dark-mode-icon"
              style={
                isDarkMode
                  ? {
                      backgroundColor: "rgba(30, 30, 30)",
                      border: "1px solid #ffffff",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                    }
              }
              onClick={() => {
                isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true);
              }}
            ></div>
            <div
              className="right-menu-language"
              onClick={() => {
                language === "A" ? setLanguage("한") : setLanguage("A");
              }}
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
                borderRadius: "5px",
                padding: "1px 7px",
              }}
            >
              {language}
            </div>
            <div
              className="right-menu-calender"
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
                borderRadius: "5px",
              }}
            >
              {language === "A"
                ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
                : `${month}월 ${day}일 (${dayOfWeek})`}
            </div>
            <div className="right-menu-clock">
              <Clock language={language} />
            </div>
          </div>
        </div>
        <div
          className="index-content-container"
          style={{
            flexGrow: "1",
          }}
        >
          <Main language={language} />
        </div>
        {/* <div
          style={{
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30px",
            borderTop: isDarkMode ? "0.5px solid #ffffff" : "1px solid #dddede",
          }}
        >
          <div style={{ width: "100px" }}></div>
          <div style={{ fontSize: "12px", fontWeight: "300" }}>
            {language === "A" ? "7 items" : "7개의 항목"}
          </div>
          <div style={{ marginRight: "10px" }}>
            <input type="range"></input>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Index;

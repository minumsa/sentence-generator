"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import About from "./About";
import Contact from "./Contact";
import Main from "./Main";
import styles from "./index.module.css";

export default function Home() {
  const [language, setLanguage] = useState<string>("한");

  const currentDate = new Date();
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

  const [showMain, setShowMain] = useState<boolean>(true);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "a363f14d94f369a4d926a27d5d44fc60";
        const seoulWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang=kr`
        );
        if (!seoulWeatherResponse.ok) {
          throw "weather fetch failed";
        }
        const data = await seoulWeatherResponse.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["index-container"]}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={styles["index-nav-container"]}>
            <div
              className={styles["menu-text"]}
              style={{
                marginLeft: "10px",
                fontWeight: showMain ? "600" : "400",
              }}
              onClick={() => {
                setShowMain(true);
                setShowAbout(false);
                setShowContact(false);
              }}
            >
              divdivdiv
            </div>
            <div
              className={styles["menu-text"]}
              onClick={() => {
                setShowAbout(true);
                setShowMain(false);
                setShowContact(false);
              }}
              style={{ fontWeight: showAbout ? "600" : "400" }}
            >
              {language === "A" ? "About" : "소개"}
            </div>
            <div
              className={styles["menu-text"]}
              onClick={() => {
                setShowContact(true);
                setShowAbout(false);
                setShowMain(false);
              }}
              style={{ fontWeight: showContact ? "600" : "400" }}
            >
              {language === "A" ? "Contact" : "연결"}
            </div>
            <div
              className={styles["index-menu-grow"]}
              style={{ flexGrow: "1" }}
            ></div>
            <div
              className={`${styles["right-menu-item"]} ${styles["right-menu-weather-icon"]}`}
            >
              {weatherData ? (
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  width={35}
                  height={35}
                  alt="Weather Icon"
                />
              ) : (
                ""
              )}
            </div>
            <div
              className={`${styles["right-menu-item"]} ${styles["right-menu-weather-temp"]}`}
            >
              {weatherData
                ? `${(weatherData.main.temp - 273.15).toFixed(1)}°`
                : ""}
            </div>
            <div
              className={`${styles["right-menu-item"]} ${styles["right-menu-language"]}`}
              onClick={() => {
                language === "A" ? setLanguage("한") : setLanguage("A");
              }}
              style={{
                border: "1px solid #000000",
                borderRadius: "5px",
                padding: "1px 7px",
              }}
            >
              {language}
            </div>
            <div
              className={`${styles["right-menu-item"]} ${styles["right-menu-calender"]}`}
              style={{
                border: "1px solid #000000",
                borderRadius: "5px",
              }}
            >
              {language === "A"
                ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
                : `${month}월 ${day}일 (${dayOfWeek})`}
            </div>
            <div
              className={`${styles["right-menu-item"]} ${styles["right-menu-clock"]}`}
            >
              <Clock language={language} />
            </div>
          </div>
        </div>
        <div
          className={styles["index-content-container"]}
          style={{
            flexGrow: "1",
          }}
        >
          {showMain && <Main language={language} />}
          {showAbout && <About language={language} />}
          {showContact && <Contact language={language} />}
        </div>
      </div>
    </div>
  );
}

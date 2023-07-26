"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import About from "./About";
import Contact from "./Contact";
import Main from "./Main";
import styles from "./index.module.css";

export default function Home() {
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

  const [language, setLanguage] = useState<string>("한");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"main" | "about" | "contact">(
    "main"
  );

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

  function renderButton(text: string, tab: "main" | "about" | "contact") {
    return (
      <div
        className={styles["button-left"]}
        style={{ fontWeight: activeTab === tab ? "600" : "400" }}
        onClick={() => setActiveTab(tab)}
      >
        {text}
      </div>
    );
  }

  return (
    <div className={styles["container-background"]}>
      <div className={styles["container"]}>
        <div className={styles["nav-container"]}>
          <div className={styles["nav"]}>
            {renderButton("divdivdiv", "main")}
            {renderButton(language === "A" ? "About" : "소개", "about")}
            {renderButton(language === "A" ? "Contact" : "연결", "contact")}
            <div
              className={styles["button-left"]}
              style={{ fontWeight: activeTab === "about" ? "600" : "400" }}
              onClick={() => {
                setActiveTab("about");
              }}
            >
              {language === "A" ? "About" : "소개"}
            </div>
            <div
              className={styles["button-left"]}
              style={{ fontWeight: activeTab === "contact" ? "600" : "400" }}
              onClick={() => {
                setActiveTab("contact");
              }}
            >
              {}
            </div>
            <div className={styles["blank-space"]}></div>
            <div className={`${styles["button-right"]} ${styles["weather"]}`}>
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
              className={`${styles["button-right"]} ${styles["temperature"]}`}
            >
              {weatherData
                ? `${(weatherData.main.temp - 273.15).toFixed(1)}°`
                : ""}
            </div>
            <div
              className={`${styles["button-right"]} ${styles["language"]}`}
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
              className={`${styles["button-right"]} ${styles["calender"]}`}
              style={{
                border: "1px solid #000000",
                borderRadius: "5px",
              }}
            >
              {language === "A"
                ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
                : `${month}월 ${day}일 (${dayOfWeek})`}
            </div>
            <div className={`${styles["button-right"]} ${styles["clock"]}`}>
              <Clock language={language} />
            </div>
          </div>
        </div>
        <div className={styles["content"]}>
          {activeTab === "main" && <Main language={language} />}
          {activeTab === "about" && <About language={language} />}
          {activeTab === "contact" && <Contact language={language} />}
        </div>
      </div>
    </div>
  );
}

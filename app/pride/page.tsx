"use client";

import React, { useState, useEffect } from "react";
import styles from "./pride.module.css";
import { objects, subjects, verbs } from "./words";

// 따로 뺀 거 좋다. 컴포넌트와 관계 없는 로직이란 것을 보여줘서. 이 함수 내에서 컴포넌트 안에 있는 변수를 사용하지 않는다는 걸 보장해줘서.
const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomColor = (): string => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};

export default function RandomSentenceGenerator() {
  const [randomSubject, setRandomSubject] = useState<string>("Pride");
  const [randomObject, setRandomObject] = useState<string>("Month");
  const [randomVerb, setRandomVerb] = useState<string>("2023");
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const generateRandomSentence = () => {
    setRandomSubject(getRandomItemFromArray(subjects));
    setRandomObject(getRandomItemFromArray(objects));
    setRandomVerb(getRandomItemFromArray(verbs));
  };

  // FIXME: isRunning의 변수 이름이 조금 이상. false일 때도 활성화되기 때문에.
  useEffect(() => {
    const intervalId = setInterval(generateRandomSentence, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleClick = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
    generateRandomSentence();
  };

  return (
    // FIXME: 모바일 div 없애고 하나로 합치기. 미디어 쿼리 이용.
    <div className={styles["container"]}>
      <div className={styles["sentence-container"]}>
        <div className={styles["sentence"]} onClick={handleClick}>
          <span
            className={styles["subject"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomSubject}{" "}
          </span>
          <span
            className={styles["object"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomObject}{" "}
          </span>
          <span
            className={styles["verb"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomVerb}
          </span>
        </div>
        <div className={styles["mobile-container"]} onClick={handleClick}>
          <div className={styles["mobile-sentence"]}>
            <div
              className={styles["mobile-subject"]}
              style={{
                color: generateRandomColor(),
              }}
            >
              {randomSubject}{" "}
            </div>
            <div
              className={styles["mobile-object"]}
              style={{
                color: generateRandomColor(),
              }}
            >
              {randomObject}{" "}
            </div>
          </div>
          <div
            className={styles["mobile-verb"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomVerb}
          </div>
        </div>
      </div>
    </div>
  );
}

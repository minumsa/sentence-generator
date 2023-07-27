"use client";

import React, { useState, useEffect } from "react";
import styles from "./pride.module.css";
import { objects, subjects, verbs } from "./words";

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
    <div className={styles["container"]}>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#f4f6f7"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#0e1111"
      />
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

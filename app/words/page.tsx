"use client";

import React, { useState, useEffect } from "react";
import styles from "./words.module.css";
import { words } from "./words";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

// 따로 뺀 거 좋다. 컴포넌트와 관계 없는 로직이란 것을 보여줘서. 이 함수 내에서 컴포넌트 안에 있는 변수를 사용하지 않는다는 걸 보장해줘서.
const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomColor = (): string => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};

export default function RandomSentenceGenerator() {
  const [randomWord1, setRandomWord1] = useState<string>(words[0]);
  const [randomWord2, setRandomWord2] = useState<string>(words[9]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const isMobile = window.innerWidth < 500;

  const generateRandomSentence = () => {
    setRandomWord1(getRandomItemFromArray(words));
    setRandomWord2(getRandomItemFromArray(words));
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

  const handleCapture = () => {
    const elementToCapture = document.querySelector(`.${styles["sentence-container"]}`);

    html2canvas(elementToCapture as HTMLElement).then(canvas => {
      canvas.toBlob(blob => {
        if (blob) {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard
            .write([item])
            .then(() => {
              console.log("전체 화면이 클립보드에 복사되었습니다.");
            })
            .catch(error => {
              console.error("클립보드 복사 중 오류가 발생했습니다: ", error);
            });
        }
      });
    });
  };

  return (
    <div className={styles["container"]}>
      {/* <div className={styles["fade-in-out-text"]}>Screenshot copied to clipboard!</div> */}
      <div className={styles["capture-icon"]} onClick={handleCapture}>
        <FontAwesomeIcon icon={faCamera} size={isMobile ? "sm" : "lg"} />
      </div>
      <div className={styles["sentence-container"]}>
        <div className={styles["sentence"]} onClick={handleClick}>
          <span
            className={styles["word1"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomWord1}{" "}
          </span>
          <span
            className={styles["word3"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            같은{" "}
          </span>
          <span
            className={styles["word2"]}
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomWord2}
          </span>
        </div>
      </div>
    </div>
  );
}

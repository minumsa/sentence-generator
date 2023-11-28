"use client";

import React, { useState, useEffect } from "react";
import styles from "./words.module.css";
import { words } from "./words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import { isMobile } from "react-device-detect";
import NoSSR from "../divdivdiv/NoSSR";

const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomColor = (): string => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};

export default function RandomSentenceGenerator() {
  const [isTriggered, setIsTriggered] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [sentence, setSentence] = useState({
    word1: words[0],
    word2: words[9],
    color1: generateRandomColor(),
    color2: generateRandomColor(),
    color3: generateRandomColor(),
  });

  const generateRandomSentence = () => {
    setSentence({
      word1: getRandomItemFromArray(words),
      word2: getRandomItemFromArray(words),
      color1: generateRandomColor(),
      color2: generateRandomColor(),
      color3: generateRandomColor(),
    });
  };

  useEffect(() => {
    const intervalId = setInterval(generateRandomSentence, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = () => {
    setIsTriggered(prevIsRunning => !prevIsRunning);
    generateRandomSentence();
  };

  const handleCapture = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    const elementToCapture = document.querySelector(`.${styles["sentence-container"]}`);

    html2canvas(elementToCapture as HTMLElement).then(canvas => {
      if (canvas) {
        if (isMobile) {
          const dataURL = canvas.toDataURL("image/png");

          const a = document.createElement("a");
          a.href = dataURL;
          a.download = "captured_image.png";

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          console.log("이미지가 다운로드되었습니다.");
        } else {
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
        }
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <div
        className={`${styles["download-container"]} ${
          isAnimating ? styles["download-animation"] : undefined
        }`}
      >
        <div className={styles["download-text"]}>
          <NoSSR>
            {isMobile ? "이미지 파일이 생성되었습니다!" : "이미지가 클립보드에 저장되었습니다!"}
          </NoSSR>
        </div>
      </div>
      <div className={styles["capture-icon"]} onClick={handleCapture}>
        <FontAwesomeIcon icon={faCamera} />
      </div>
      <div className={styles["sentence-container"]}>
        <div className={styles["sentence"]} onClick={handleClick}>
          <span className={styles["word1"]} style={{ color: sentence.color1 }}>
            {sentence.word1}{" "}
          </span>
          <span className={styles["word3"]} style={{ color: sentence.color2 }}>
            같은{" "}
          </span>
          <span className={styles["word2"]} style={{ color: sentence.color3 }}>
            {sentence.word2}
          </span>
        </div>
      </div>
    </div>
  );
}

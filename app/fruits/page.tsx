"use client";

import { useEffect, useState } from "react";
import styles from "./fruits.module.css";
import { fruitEmojiMap } from "./fruits";

function getRandomItem(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Page() {
  // FIXME: 리액트 코드로 최대한 바꿔보기
  useEffect(() => {
    const container = document.getElementById("container");

    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const fruitsArr: string[] = Object.keys(fruitEmojiMap);
      const randomFruit = getRandomItem(fruitsArr);
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`;
      container?.appendChild(fruit);

      // TODO: pointerEvents 검색해보기
      fruit.style.pointerEvents = "auto";
      fruit.style.cursor = "pointer";

      const eventName = window.outerWidth < 450 ? "touchstart" : "click";
      const clickHandler = () => {
        const fruitArray = fruitEmojiMap[randomFruit];
        if (fruitArray) {
          fruit.removeEventListener(eventName, clickHandler);
          alert(getRandomItem(fruitArray));
        }
      };

      fruit.addEventListener(eventName, clickHandler);

      setTimeout(() => {
        fruit.remove();
      }, 10000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [checkerWidth, setCheckerWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.outerWidth < 450) {
      setCheckerWidth(window.outerWidth / 7);
    } else {
      setCheckerWidth(window.outerWidth / 14);
    }
  }, []);

  return (
    <>
      <div
        className={styles["container"]}
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div id="container" className={styles["falling-fruits"]}></div>
      </div>
    </>
  );
}

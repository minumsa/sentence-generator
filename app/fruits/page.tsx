"use client";

import { useEffect, useState } from "react";
import styles from "./fruits.module.css";
import { fruitEmojiMap } from "./fruits";

export default function Page() {
  useEffect(() => {
    const container = document.getElementById("container");

    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const fruitsArr: string[] = Object.keys(fruitEmojiMap);
      const randomFruit =
        fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`;
      container?.appendChild(fruit);

      fruit.style.pointerEvents = "auto";

      fruit.addEventListener("mouseover", () => {
        fruit.style.cursor = "pointer";
      });

      const clickHandler = () => {
        const fruitEmoji = fruit.innerHTML;
        const fruitArray = fruitEmojiMap[fruitEmoji];

        if (fruitArray) {
          if (window.outerWidth < 450) {
            fruit.removeEventListener("touchstart", clickHandler);
          } else {
            fruit.removeEventListener("click", clickHandler);
          }
          alert(fruitArray[Math.floor(Math.random() * fruitArray.length)]);
          fruit.remove();
        }
      };

      if (window.outerWidth < 450) {
        fruit.addEventListener("touchstart", clickHandler);
      } else {
        fruit.addEventListener("click", clickHandler);
      }

      setTimeout(() => {}, 10000);
    }, 300);

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

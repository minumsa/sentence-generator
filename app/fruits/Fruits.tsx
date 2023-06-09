"use client";

import { useEffect, useState } from "react";

const Fruits = () => {
  const fruitsArr: string[] = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
  ];

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const container = document.getElementById("fruit-container");
    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const randomFruit =
        fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      const fruitKey = Date.now().toString(); // 현재 시간을 이용하여 고유한 키 값을 생성한다
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`; // 과일이 왼쪽에서부터 어떤 위치에서 내려올지 랜덤하게 지정한다
      fruit.setAttribute("key", fruitKey); // 고유한 키 값을 설정한다
      container?.appendChild(fruit);

      console.log(fruit);

      fruit.style.pointerEvents = "auto"; // 이벤트를 활성화한다

      fruit.addEventListener("mouseover", () => {
        fruit.style.cursor = "pointer";
      });

      const clickHandler = () => {
        setCount(prevCount => prevCount + 1);
        fruit.removeEventListener("click", clickHandler);
        fruit.remove();
      };

      fruit.addEventListener("click", clickHandler);

      setTimeout(() => {
        fruit.remove();
      }, 10000);
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

    if (window.outerWidth < 500) {
      setCheckerWidth(window.outerWidth / 7);
    } else {
      setCheckerWidth(window.outerWidth / 15);
    }
  }, []);

  return (
    <>
      <div
        className="fruits-container"
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div className="fruit-count">🍋 X {count}</div>
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;

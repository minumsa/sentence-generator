"use client";

import { useEffect } from "react";

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

  useEffect(() => {
    const container = document.getElementById("fruit-container");
    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      fruit.innerHTML = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.style.left = `${Math.random() * 100}%`;
      container?.appendChild(fruit);

      setTimeout(() => {
        container?.removeChild(fruit);
      }, 10000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const windowWidth: number = window.outerWidth;
  let checkerWidth: number = windowWidth / 7;

  windowWidth > 500 ? (checkerWidth = windowWidth / 20) : checkerWidth;

  return (
    <>
      <div
        className="fruits-container"
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;

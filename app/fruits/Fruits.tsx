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

  return (
    <>
      <div id="fruit-container" className="falling-fruits"></div>
    </>
  );
};

export default Fruits;

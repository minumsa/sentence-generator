"use client";

import { useEffect, useState } from "react";

// 서버 측에서 호출되어 화면 사이즈를 계산해 이를 프론트엔드로 전달하는 비동기 함수
// export async function getServerSideProps() {
//   const checkerWidth: number = window.outerWidth / 7;

//   return {
//     props: {
//       checkerWidth,
//     },
//   };
// }

// interface FruitsProps {
//   checkerWidth: number;
// }

const Fruits = () => {
  const fruitsArr: string[] = [""];

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
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;

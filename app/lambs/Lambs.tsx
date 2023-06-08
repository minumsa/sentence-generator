"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Lambs() {
  const [positions, setPositions] = useState([{ x: 200, y: 700 }]);

  useEffect(() => {
    const maxX = window.innerWidth - 100; // 이미지의 가로 크기
    const minY = 600; // 이미지의 최소 세로 크기
    const maxY = 850; // 이미지의 최대 세로 크기

    const generateRandomPosition = () => {
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      setPositions(prevPositions => [
        ...prevPositions,
        { x: randomX, y: randomY },
      ]);
    };

    const interval = setInterval(() => {
      generateRandomPosition();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Image
          src="/field.jpg"
          layout="responsive"
          width={1}
          height={1}
          alt="Picture of the field"
        />
        {positions.map((position, index) => (
          <div
            key={index}
            style={{
              width: "10vw",
              height: "10vh",
              position: "absolute",
              top: position.y,
              left: position.x,
            }}
          >
            <Image
              src="/lamb.png"
              width={1}
              height={1}
              layout="responsive"
              alt="Picture of the lamb"
            />
          </div>
        ))}
      </div>
    </>
  );
}

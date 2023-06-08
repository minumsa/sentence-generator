"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Position {
  fade: boolean;
  x: number;
  y: number;
  scaleX: number;
  image: string;
}

export default function Lambs() {
  const [positions, setPositions] = useState<Position[]>([
    { x: 350, y: 610, scaleX: 1, fade: false, image: "/sheep_1.png" },
  ]);
  const [count, setCount] = useState<number>(1);
  const [value, setValue] = useState<number>(10);

  useEffect(() => {
    let maxX: number = 2000; // 이미지의 가로 크기
    let minY: number = 600; // 이미지의 최소 세로 크기
    let maxY: number = 930; // 이미지의 최대 세로 크기

    if (window.innerWidth <= 500) {
      maxX = 350;
      minY = 410;
      maxY = 610;
    }

    const generateRandomPosition = () => {
      const randomX: number = Math.floor(Math.random() * maxX);
      const randomY: number =
        Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const randomScaleX: number = Math.random() < 0.5 ? 1 : -1;
      const randomImage: string =
        Math.random() < 0.5 ? "/sheep_1.png" : "/sheep_2.png";

      // 이미지 배열에 있는 이전 위치들과 비교하여 겹치지 않는 위치를 찾음
      let isOverlap = true;
      let newX = randomX;
      let newY = randomY;
      while (isOverlap) {
        isOverlap = positions.some(position => {
          const distance = Math.sqrt(
            Math.pow(position.x - newX, 2) + Math.pow(position.y - newY, 2)
          );
          return distance < 1000; // 이미지가 겹치는지 확인할 거리 (여기서는 1000으로 설정)
        });

        if (isOverlap) {
          newX = Math.floor(Math.random() * maxX);
          newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        }
      }

      setPositions(prevPositions => [
        ...prevPositions,
        {
          x: randomX,
          y: randomY,
          scaleX: randomScaleX,
          fade: false,
          image: randomImage,
        },
      ]);

      setCount(prevCount => prevCount + 1);
    };

    const interval = setInterval(() => {
      generateRandomPosition();
    }, value * 1000);

    return () => clearInterval(interval);
  }, [value]);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setPositions(prevPositions => {
        const updatedPositions = [...prevPositions];
        updatedPositions[prevPositions.length - 1].fade = true;
        return updatedPositions;
      });
    }, 100);

    if (count > 1) {
      playAudio();
    }

    return () => clearTimeout(fadeTimeout);
  }, [count, positions]);

  const playAudio = () => {
    const audio = new Audio("/sheep.mp3");
    audio.play();
  };

  return (
    <>
      <div className="lambs-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className={"lambs-fade-in-box"}>
          {/* {count > 1 ? `There are ${count} lambs` : `There is a lamb`} */}
          <div>{`🐑 x ${count}`}</div>
          <div className="born">{`How many seconds is a sheep born? ${value}s`}</div>
          <input
            className="born-input"
            type="range"
            min={10}
            value={value}
            step={10}
            onChange={e => {
              setValue(parseInt(e.target.value, 10));
            }}
          ></input>
        </div>
        {positions.map((position, index) => (
          <div
            className="lambs"
            key={index}
            style={{
              width: "10vw",
              height: "10vh",
              position: "absolute",
              top: position.y,
              left: position.x,
              transition: "opacity 1s ease-in-out",
              transform: `scaleX(${position.scaleX})`,
              opacity: position.fade ? 1 : 0,
              cursor: "pointer",
            }}
            onClick={() => {
              playAudio();
            }}
          >
            <div>
              <Image
                src={position.image}
                width={1}
                height={1}
                layout="responsive"
                alt="Picture of the lamb"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

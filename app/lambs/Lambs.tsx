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
    { x: 5550, y: 610, scaleX: 1, fade: false, image: "" },
  ]);
  const [count, setCount] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(10);

  useEffect(() => {
    let maxX: number = 2000; // 이미지 최대 가로 크기
    let minY: number = 580; // 이미지 최소 세로 크기
    let maxY: number = 930; // 이미지 최대 세로 크기

    if (window.innerWidth <= 500) {
      maxX = 350;
      minY = 250;
      maxY = 610;
    }

    const generateRandomPosition = () => {
      if (toggle === false) {
        return;
      }

      const randomX: number = Math.floor(Math.random() * maxX);
      const randomY: number =
        Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const randomScaleX: number = Math.random() < 0.5 ? 1 : -1;
      const randomImage: string =
        Math.random() < 0.5 ? "/sheep_1.png" : "/sheep_2.png";

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
      if (toggle) {
        generateRandomPosition();
      }
    }, seconds * 1000);

    return () => clearInterval(interval);
  }, [toggle]);

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

  const resetPositions = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, fade: false, image: "" }]);
    setCount(0);
    setSeconds(10);
    setToggle(false);
  };

  const handleInterval = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, fade: false, image: "" }]);
    setCount(0);
    setToggle(false);
    const userInput: any = prompt(
      "How many seconds do you want a sheep to be born?",
      "10"
    );
    const seconds = parseInt(userInput);
    if (!isNaN(seconds) && seconds > 2) {
      setSeconds(seconds);
      setToggle(true);
    } else {
      setSeconds(10); // 기본값으로 5를 사용하거나 다른 처리를 수행할 수 있다
      setToggle(true);
    }
  };

  const playAudio = () => {
    const audio = new Audio("/sheep.mp3");
    audio.play();
  };

  const handleSheepClick = (index: number) => {
    const sheep = positions[index];
    if (!sheep.fade) {
      setPositions(prevPositions => {
        const updatedPositions = [...prevPositions];
        updatedPositions[index].fade = true;
        return updatedPositions;
      });
      playAudio();
    }
  };

  return (
    <>
      <div className="lambs-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className={"lambs-fade-in-box"}>
          <div>{`🐑 x ${count}`}</div>
          <div className="born">{`How many seconds is a sheep born? ${seconds}s`}</div>
          <button onClick={handleInterval}>interval</button>
          <button onClick={() => setToggle(true)}>start</button>
          <button onClick={() => setToggle(false)}>stop</button>
          <button onClick={resetPositions}>reset</button>
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
              handleSheepClick(index);
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

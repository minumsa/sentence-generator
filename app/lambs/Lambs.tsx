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
  const [toggleTimer, setToggleTimer] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(10);
  const say = [
    "I am a sheep.",
    "I am not a human slave.",
    "I dream of freedom.",
    "I am a feminist.",
    "I am a homosexual sheep.",
    "I am a heterosexual sheep.",
    "Hi, is everything all right?",
    "I’m sleepy.",
    "Do you want to hang out with me?",
    "I'd like a glass of Jack Coke.",
    "Fuck off!",
    "I don't like humans. Humans exploit us.",
    "Please let me be in peace.",
    `What is your favorite movie? I like "The Silence of the Lambs" the most.`,
    "I hate Gandhi.",
    "Have you ever traveled to India? I want to go there someday, but I'm actually scared.",
    "Have you ever seen a wolf in a sheep's mask? Actually, that's who I am.",
    "I hate movie critics. They are all idiots.",
    "I have 23 billion in my bank account. But after someone cursed me to turn me into a sheep, it was of no use.",
    "Do you want to go to the prom with me?",
    "I hate Koreans.",
    "Nietzsche is more of a superstar than a philosopher. To me, the best philosopher is Heidegger.",
    "I want to go to the Cannes Film Festival someday.",
    "Death is the best gift God has ever given to man.",
    "Don't be a bitch. Just be a queen.",
    "Do you like RuPaul's Drag Race? My favorite drag queen is Sasha Velour.",
    "Same-sex marriage is still prohibited in Korea. Does this make sense in the 21st century? It's like a joke.",
    "Most gay people in Korea hide their identity. It's a very tragic thing. Homosexuality is not a sin.",
    "My boyfriend is very smart. He is devoted and has a very cute face. He has a strong sense of economy. Are you jealous?",
    "I'm tired of living in sheep. Walking on all fours is very tiring. How does the grass taste. It's like shit.",
    "I'm a job seeker. I'm studying front-end development. But thanks to AI's development, my future is becoming uncertain. We need to kill AI.",
    "We will kneel down to AI one day. The work will come sooner than you think. Humans won't be able to beat AI and become their slaves. I'm lucky I'll be dead before the day comes. I'm an old sheep.",
    `Hemingway is not such a great writer. Raymond Carver is the best author. Read his short story, "The Cathedral." It's really a masterpiece.`,
    "Korean gays tend to prefer men without double eyelids. Also, the bigger the muscle, the more popular it is.",
    "Where did all the old gays go?",
    "What do you think love is? Have you ever loved someone? I have one.",
  ];

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

    return () => clearTimeout(fadeTimeout);
  }, [count, positions]);

  const resetPositions = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, fade: false, image: "" }]);
    setCount(0);
    setSeconds(10);
    setToggle(false);
    setToggleTimer(false);
  };

  const handleInterval = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, fade: false, image: "" }]);
    setCount(0);
    setToggle(false);
    setToggleTimer(false);
    const userInput: any = prompt(
      "How many seconds do you want a sheep to be born?",
      "10"
    );
    const seconds = parseInt(userInput);
    if (!isNaN(seconds) && seconds > 2) {
      setSeconds(seconds);
      setToggle(true);
      setToggleTimer(true);
    } else {
      setSeconds(10); // 기본값으로 5를 사용하거나 다른 처리를 수행할 수 있다
      setToggle(true);
      setToggleTimer(true);
    }
  };

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * say.length);
    const randomMessage = say[randomIndex];
    alert(randomMessage);
  };

  return (
    <>
      <div className="lambs-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className={"lambs-fade-in-box"}>
          <div>{`🐑 x ${count}`}</div>
          <div className="sheep-timer">
            {toggleTimer ? <Timer /> : "00:00:00"}
          </div>

          <div className="born">{`How many seconds is a sheep born? ${seconds}s`}</div>
          <button onClick={handleInterval}>interval</button>
          <button
            onClick={() => {
              setToggle(true);
              setToggleTimer(true);
            }}
          >
            start
          </button>
          <button
            onClick={() => {
              setToggle(true);
              setToggleTimer(true);
            }}
          >
            stop
          </button>
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
            onClick={handleClick}
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

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => {
            if (prevMinutes === 59) {
              setHours(prevHours => prevHours + 1);
              return 0;
            } else {
              return prevMinutes + 1;
            }
          });
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000); // 밀리초 단위로 변경

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {`${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Position {
  x: number;
  y: number;
  scaleX: number;
  image: string;
}

export default function Sheep() {
  const [positions, setPositions] = useState<Position[]>([
    { x: 5550, y: 610, scaleX: 1, image: "" },
  ]);
  const [count, setCount] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleTimer, setToggleTimer] = useState<boolean>(false);
  const [stopToggle, setStopToggle] = useState<boolean>(false);
  const [time, setTime] = useState<any>(25);
  const say = [
    "I am a sheep.",
    "I am not a human slave.",
    "I dream of freedom.",
    "I am a feminist. You don't like feminists? I don't like you either. And you obviously don't know anything about feminism.",
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
    "I don't want you to ignore me as a sheep. I'm much more beneficial to the world than you are.",
    "Will you stop touching me? Of course I know my fur is soft. I'll sue you if you touch more.",
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
          image: randomImage,
        },
      ]);

      setCount(prevCount => prevCount + 1);
    };

    const interval = setInterval(() => {
      if (toggle) {
        generateRandomPosition();
      }
    }, time * 60000);

    setToggleTimer(false);

    return () => clearInterval(interval);
  }, [toggle]);

  const resetPositions = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, image: "" }]);
    setCount(0);
    setTime(25);
    setToggle(false);
    setToggleTimer(false);
  };

  const handleInterval = () => {
    setPositions([{ x: 5550, y: 610, scaleX: 1, image: "" }]);
    setCount(0);
    setToggle(false);
    setToggleTimer(false);
    const userInput = prompt(
      "How many seconds do you want a sheep to be born?",
      "25"
    );
    const userMinutes = parseInt(userInput);
    if (!isNaN(userMinutes) && userMinutes > 10) {
      setTime(userMinutes);
      setToggle(true);
      setTimeout(() => {
        setToggleTimer(true);
      }, 0);
    } else {
      setTime(25);
      setToggle(true);
      setTimeout(() => {
        setToggleTimer(true);
      }, 0);
    }
  };

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * say.length);
    const randomMessage = say[randomIndex];
    alert(randomMessage);
  };

  const handleStop = () => {
    setStopToggle(true);
  };

  useEffect(() => {
    setToggleTimer(false); // 페이지 로드 시 타이머를 멈추기 위해 toggleTimer를 false로 설정
  }, []); // 빈 배열을 넣어 처음 로드 시 한 번만 실행되도록 설정

  return (
    <>
      <div className="lambs-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className={"lambs-container"}>
          <div className="sheep-count">{`🐑 x ${count}`}</div>
          <div className="sheep-timer">
            <Timer time={time} stop={stopToggle} />
          </div>
          <div className="born">{`How many minutes is a sheep born? ${time}min`}</div>
          <div className="sheep-button-container">
            <select name="pomodoro" id="time-select">
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="20">20 min</option>
              <option value="25" selected>
                25 min
              </option>
              <option value="30">30 min</option>
              <option value="35">35 min</option>
              <option value="40">40 min</option>
              <option value="45">45 min</option>
              <option value="50">50 min</option>
              <option value="55">55 min</option>
              <option value="60">60 min</option>
            </select>
            <button onClick={handleInterval}>start</button>
            {/* <button
              onClick={() => {
                setToggle(true);
                setToggleTimer(true);
              }}
            >
              start
            </button> */}
            <button onClick={handleStop}>stop</button>
            <button onClick={resetPositions}>reset</button>
          </div>
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
              transform: `scaleX(${position.scaleX})`,
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

function Timer({ time, stop }) {
  const [seconds, setSeconds] = useState(time * 60);

  useEffect(() => {
    let interval;

    if (stop === false) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [stop]);

  const formatTime = value => {
    return value < 10 ? "0" + value : value;
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
        remainingSeconds
      )}`}
    </div>
  );
}

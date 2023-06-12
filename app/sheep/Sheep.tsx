"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Sheep() {
  const [time, setTime] = useState<number>(25);
  const [toggle, setToggle] = useState<boolean>(false);
  const [timerStopped, setTimerStopped] = useState<boolean>(false);
  const [plan, setPlan] = useState<number>(8);
  const [rest, setRest] = useState<number>(8);
  const [sheepTimerKey, setSheepTimerKey] = useState<number>(0);
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
    setTimerStopped(false);
  }, []);

  const handleReset = () => {
    setToggle(false);
    setTimerStopped(false);

    if (window.confirm("리셋하시겠습니까? 모든 양이 사라집니다.")) {
      window.alert("리셋되었습니다.");
    }
  };

  const handleStart = () => {
    setTimerStopped(true);
    setToggle(true);
  };

  const handleStop = () => {
    setToggle(false);
  };

  const updateTimeInTimer = (newTime: number) => {
    setTime(newTime);
    setSheepTimerKey(prevKey => prevKey + 1); // 키 값을 증가시켜 Timer 컴포넌트를 리렌더링한다
  };

  useEffect(() => {
    setTimerStopped(false); // 페이지 로드 시 타이머를 멈추기 위해 toggleTimer를 false로 설정
  }, []); // 빈 배열을 넣어 처음 로드 시 한 번만 실행되도록 설정

  return (
    <>
      <div className="sheep-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className={"sheep-container"}>
          <div
            className="sheep-count"
            onClick={() => {
              alert(say[Math.floor(Math.random() * say.length)]);
            }}
            style={{ cursor: "pointer" }}
          >{`🐑`}</div>
          <div className="sheep-timer">
            <Timer time={time} stop={toggle} key={sheepTimerKey} />{" "}
            {/* Timer 컴포넌트에 키 값을 전달한다 */}
          </div>
          <div className="born">
            <span>집중을 통해 오늘의 </span>
            <span
              onClick={() => {
                alert(say[Math.floor(Math.random() * say.length)]);
              }}
              style={{ cursor: "pointer" }}
            >
              🐑{" "}
            </span>
            <span>을 탄생시키세요!</span>
          </div>
          <div className="sheep-button-container">
            <div className="sheep-box">
              <div className="sheep-plan">
                반복 :{" "}
                <select
                  name="plan"
                  id="plan-select"
                  value={plan}
                  onChange={e => {
                    setPlan(Number(e.target.value));
                  }}
                  style={{ fontSize: "14px", width: "60px" }}
                >
                  <option value="1">1회</option>
                  <option value="2">2회</option>
                  <option value="3">3회</option>
                  <option value="4">4회</option>
                  <option value="5">5회</option>
                  <option value="6">6회</option>
                  <option value="7">7회</option>
                  <option value="8">8회</option>
                  <option value="9">9회</option>
                  <option value="10">10회</option>
                  <option value="11">11회</option>
                  <option value="12">12회</option>
                </select>
              </div>
              <div className="sheep-pomodoro">
                집중 :{" "}
                <select
                  name="time"
                  id="time-select"
                  value={time}
                  onChange={e => {
                    setTime(Number(e.target.value));
                  }}
                  style={{ fontSize: "14px", width: "60px" }}
                >
                  <option value="5">5분</option>
                  <option value="10">10분</option>
                  <option value="15">15분</option>
                  <option value="20">20분</option>
                  <option value="25">25분</option>
                  <option value="30">30분</option>
                  <option value="35">35분</option>
                  <option value="40">40분</option>
                  <option value="45">45분</option>
                  <option value="50">50분</option>
                  <option value="55">55분</option>
                  <option value="60">60분</option>
                </select>
              </div>
              <div className="sheep-rest">
                휴식 :{" "}
                <select
                  name="rest"
                  id="rest-select"
                  value={rest}
                  onChange={e => {
                    setRest(Number(e.target.value));
                  }}
                  style={{ fontSize: "14px", width: "60px" }}
                >
                  <option value="5">5분</option>
                  <option value="10">10분</option>
                  <option value="15">15분</option>
                  <option value="20">20분</option>
                  <option value="25">25분</option>
                  <option value="30">30분</option>
                  <option value="35">35분</option>
                  <option value="40">40분</option>
                  <option value="45">45분</option>
                  <option value="50">50분</option>
                  <option value="55">55분</option>
                  <option value="60">60분</option>
                </select>
              </div>
              <div>
                <button onClick={handleStart} style={{ fontSize: "14px" }}>
                  시작
                </button>
                <button
                  onClick={handleStop}
                  style={{ margin: "0 3px", fontSize: "14px" }}
                >
                  중지
                </button>
                <button onClick={handleReset} style={{ fontSize: "14px" }}>
                  리셋
                </button>
              </div>
            </div>
          </div>
          <div className="pomodoro-box-container">
            <div className="pomodoro-box">
              <SheepImage plan={plan} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface SheepProps {
  time: number;
  stop: boolean;
}

function Timer({ time, stop }: SheepProps) {
  // TODO: 집중 interval 끝나면 휴식 interval 자동 시작되게 하기
  // TODO: 리셋 버튼 누르면 리셋되게

  const [seconds, setSeconds] = useState(time * 60);

  useEffect(() => {
    let interval: any;

    if (stop === true) {
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
  }, [stop, time]);

  useEffect(() => {
    setSeconds(time * 60);
  }, [time]);

  const formatTime = (value: number) => {
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

interface SheepImageProps {
  plan: number;
}

function SheepImage({ plan }: SheepImageProps) {
  const images = [];

  for (let i = 0; i < plan; i++) {
    images.push(
      <span className="sheep-image" key={i}>
        <Image
          src="/sheep_3.png"
          alt="Pictures of the sheep"
          width="65"
          height="65"
          style={{ marginBottom: "8px" }}
        />
      </span>
    );
  }

  return <>{images}</>;
}

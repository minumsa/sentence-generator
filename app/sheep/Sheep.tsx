"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Sheep() {
  const [time, setTime] = useState<number>(1);
  const [timeEnd, setTimeEnd] = useState<boolean>(false);
  const [timerStopped, setTimerStopped] = useState<boolean>(false);
  const [plan, setPlan] = useState<number>(8);
  const [restTime, setRestTime] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(time * 60);
  const [restSeconds, setRestSeconds] = useState<number>(restTime * 60);
  const say = [
    "나는 인간의 노예가 아니야.",
    "나는 자유를 꿈꿔.",
    "안녕, 좋은 하루 보내고 있니?",
    "난 졸려.",
    "나랑 칵테일 한잔할래? 난 잭콕을 좋아해.",
    "난 인간이 싫어. 인간은 우리를 존중하지 않아.",
    "제발 조용히 좀 해줘.",
    `내가 가장 좋아하는 영화는 ｢양들의 침묵｣이야. 너는 뭐니?`,
    "나는 간디를 싫어해.",
    "인도에 여행 가본 적 있니? 나도 가보고 싶지만, 사실 겁이 나.",
    "양의 탈을 쓴 늑대를 본 적 있니? 그게 바로 나야.",
    "나는 평론가를 싫어해.",
    "나랑 프롬 파티에 갈래?",
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

  useEffect(() => {
    setSeconds(time * 60);
    setRestSeconds(restTime * 60);
  }, [time, restTime]);

  const handleReset = () => {
    if (window.confirm("리셋하시겠습니까? 모든 양이 사라집니다.")) {
      setComplete(false);
      setTimeEnd(false);
      setTimerStopped(false);
      setPlan(8);
      setTime(1);
      setRestTime(1);
      setSeconds(time * 60);
      setRestSeconds(restTime * 60);
      window.alert("리셋되었습니다.");
    }
  };

  const handleStart = () => {
    setTimerStopped(true);
    setTimeEnd(true);
  };

  const handleStop = () => {
    setTimeEnd(false);
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
            <Timer
              time={time}
              timeEnd={timeEnd}
              restTime={restTime}
              seconds={seconds}
              setSeconds={setSeconds}
              restSeconds={restSeconds}
              setRestSeconds={setRestSeconds}
              complete={complete}
              setComplete={setComplete}
            />{" "}
            {/* Timer 컴포넌트에 키 값을 전달한다 */}
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
                  style={{
                    fontSize: "14px",
                    width: "60px",
                    marginLeft: "12px",
                  }}
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
                  style={{
                    fontSize: "14px",
                    width: "60px",
                    marginLeft: "12px",
                  }}
                >
                  <option value="1">1분</option>
                </select>
              </div>
              <div className="sheep-rest">
                휴식 :{" "}
                <select
                  name="rest"
                  id="rest-select"
                  value={restTime}
                  onChange={e => {
                    setRestTime(Number(e.target.value));
                  }}
                  style={{
                    fontSize: "14px",
                    width: "60px",
                    marginLeft: "12px",
                  }}
                >
                  <option value="1">1분</option>
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
              <SheepImage plan={plan} timeEnd={timeEnd} complete={complete} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface TimerProps {
  time: number;
  restTime: number;
  timeEnd: boolean;
  complete: boolean;
  setComplete: any;
  seconds: number;
  setSeconds: any;
  restSeconds: number;
  setRestSeconds: any;
}

function Timer({
  timeEnd,
  time,
  restTime,
  complete,
  setComplete,
  seconds,
  setSeconds,
  restSeconds,
  setRestSeconds,
}: TimerProps) {
  // TODO: 집중 interval 끝나면 휴식 interval 자동 시작되게 하기
  // TODO: 리셋 버튼 누르면 리셋되게

  console.log("seconds", seconds);

  const [restStart, setRestStart] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;

    if (timeEnd === true) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            setComplete(true);
            alert("잘했습니다! 집중에 성공해 양 한 마리가 생성되었습니다. 🐑");
            setRestStart(true);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeEnd]);

  useEffect(() => {
    let restInterval: any;

    if (restStart === true) {
      setRestSeconds(restTime * 60);
      restInterval = setInterval(() => {
        setRestSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(restInterval);
            setRestStart(false);
            setSeconds(time * 60);
            alert("다시 집중을 시작하세요!");
            return restTime * 60;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(restInterval);
    };
  }, [restStart]);

  const formatTime = (value: number) => {
    return value < 10 ? "0" + value : value;
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const restHours = Math.floor(restSeconds / 3600);
  const restMinutes = Math.floor((restSeconds % 3600) / 60);
  const restRemainingSeconds = restSeconds % 60;

  return (
    <div>
      {complete ? (
        <>
          {`${formatTime(restHours)}:${formatTime(restMinutes)}:${formatTime(
            restRemainingSeconds
          )}`}
          <div className="born">
            이제부터 휴식을 취하세요! {/* 종료되었을 때 표시할 내용 */}
          </div>
        </>
      ) : (
        <>
          {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
            remainingSeconds
          )}`}
          <div className="born">
            <span>집중을 통해 오늘의 </span>
            <span>🐑 </span>
            <span>을 탄생시키세요!</span>
          </div>
        </>
      )}
    </div>
  );
}

interface SheepImageProps {
  plan: number;
  timeEnd: boolean;
  complete: boolean;
}

function SheepImage({ plan, timeEnd, complete }: SheepImageProps) {
  const images = [];

  for (let i = 0; i < plan; i++) {
    images.push(
      <span className="sheep-image">
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

  if (complete === true) {
    images.pop();
    images.unshift(
      <span className="sheep-image">
        <Image
          src="/sheep_4.png"
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

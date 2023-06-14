"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Sheep() {
  const [time, setTime] = useState<number>(1);
  const [timeToggle, setTimeToggle] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(time * 60);
  const [restTime, setRestTime] = useState<number>(1);
  const [restTimeToggle, setRestTimeToggle] = useState<boolean>(false);
  const [restSeconds, setRestSeconds] = useState<number>(restTime * 60);
  const [plan, setPlan] = useState<number>(12);
  const [complete, setComplete] = useState<number>(0);

  // 타이머 전체를 관리하기 위해 useRef 생성
  const intervalRef = useRef<any>(null);

  // 페이지가 처음 로드되었을 때 집중 타이머 멈춰 있음
  useEffect(() => {
    setTimeToggle(false);
  }, []);

  // time, restTime에 따라 setSeconds, setRestSeconds도 함께 변경
  useEffect(() => {
    setSeconds(time * 60);
    setRestSeconds(restTime * 60);
  }, [time, restTime]);

  // 시작 버튼 누르면 동작하는 함수
  const handleStart = () => {
    setTimeToggle(true);
  };

  // 중지 버튼 누르면 동작하는 함수
  const handleStop = () => {
    setTimeToggle(false);
  };

  // 리셋 버튼 누르면 동작하는 함수
  const handleReset = () => {
    if (window.confirm("리셋하시겠습니까? 모든 양이 사라집니다.")) {
      setTimeToggle(false);
      setPlan(8);
      setTime(1);
      setRestTime(1);
      setSeconds(time * 60);
      setRestSeconds(restTime * 60);
      window.alert("리셋되었습니다.");
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <>
      <div className="sheep-div-1" style={{ width: "100vw", height: "100vh" }}>
        <div className="sheep-top">
          <div className="clone">C:₩WINDOWS₩system32₩복제양_뽀모도로.exe</div>
          <div className="clone-box">?</div>
          <div className="clone-box2">x</div>
          <div className="sheep-top-border"></div>
        </div>
        <div className="sheep-container">
          <div className="sheep-count">{`🐑`}</div>
          <div className="sheep-timer">
            <Timer
              time={time}
              timeToggle={timeToggle}
              setTimeToggle={setTimeToggle}
              restTime={restTime}
              restTimeToggle={restTimeToggle}
              setRestTimeToggle={setRestTimeToggle}
              seconds={seconds}
              setSeconds={setSeconds}
              restSeconds={restSeconds}
              setRestSeconds={setRestSeconds}
              complete={complete}
              setComplete={setComplete}
              handleReset={handleReset}
            />{" "}
            {/* Timer 컴포넌트에 키 값을 전달한다 */}
          </div>
          <div className="sheep-button-container">
            <div className="sheep-box">
              <div className="sheep-plan">
                반복(plan) :{" "}
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
                집중(pomodoro) :
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
                휴식(rest) :{" "}
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
              {/* <div>
                <button onClick={handleStart} style={{ fontSize: "14px" }}>
                  시작
                </button>
                <button
                  onClick={handleStop}
                  style={{ margin: "0 3px", fontSize: "14px" }}
                >
                  중단
                </button>
                <button onClick={handleReset} style={{ fontSize: "14px" }}>
                  리셋
                </button>
              </div> */}
            </div>
          </div>
          <div className="pomodoro-box-container">
            <div className="pomodoro-box">
              <SheepImage
                plan={plan}
                restTimeToggle={restTimeToggle}
                complete={complete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface TimerProps {
  time: number;
  timeToggle: boolean;
  setTimeToggle: React.Dispatch<React.SetStateAction<boolean>>;
  restTime: number;
  restTimeToggle: boolean;
  setRestTimeToggle: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  restSeconds: number;
  setRestSeconds: React.Dispatch<React.SetStateAction<number>>;
  complete: number;
  setComplete: React.Dispatch<React.SetStateAction<number>>;
  handleReset: any;
}

function Timer({
  time,
  timeToggle,
  setTimeToggle,
  restTime,
  restTimeToggle,
  setRestTimeToggle,
  seconds,
  setSeconds,
  restSeconds,
  setRestSeconds,
  setComplete,
  handleReset,
}: TimerProps) {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timeToggle === true) {
      interval = setInterval(() => {
        setSeconds(x => {
          if (x > 0) {
            return x - 15;
          } else {
            clearInterval(interval);
            setTimeToggle(false);
            setComplete(x => x + 1);
            setRestTimeToggle(true);
            setSeconds(time * 60);
            alert("집중에 성공해서 양 한 마리가 생성되었습니다!");
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeToggle]);

  useEffect(() => {
    let restInterval: ReturnType<typeof setInterval>;

    if (restTimeToggle === true) {
      setRestSeconds(restTime * 60);
      restInterval = setInterval(() => {
        setRestSeconds(x => {
          if (x > 0) {
            return x - 15;
          } else {
            clearInterval(restInterval);
            setRestTimeToggle(false);
            setRestSeconds(restTime * 60);
            alert("다시 집중을 시작하세요!");
            return restTime * 60;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(restInterval);
    };
  }, [restTimeToggle]);

  // 집중 타이머의 시, 분, 초
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // 휴식 타이머의 시, 분, 초
  const restHours = Math.floor(restSeconds / 3600);
  const restMinutes = Math.floor((restSeconds % 3600) / 60);
  const restRemainingSeconds = restSeconds % 60;

  // 시, 분, 초가 10보다 작을 때 숫자 앞에 문자열 "0"을 추가
  const formatTime = (x: number) => {
    return x < 10 ? "0" + x : x;
  };

  return (
    <div>
      {(() => {
        if (timeToggle === false && restTimeToggle === false) {
          // timeToggle이 true일 때 집중 타이머 인터페이스 출력
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className="sheep-time-div"
                  style={{ width: "90px", marginLeft: "5px" }}
                >
                  {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                    remainingSeconds
                  )}`}{" "}
                </div>
              </div>
              <div className="born">
                <span>집중을 통해 </span>
                <span className="sheep-point">양</span>
                <span>을 탄생시키세요!</span>
              </div>
              <div className="born-button">
                <span
                  className="sheep-all-button"
                  onClick={() => {
                    setTimeToggle(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  시작
                </span>
                <span
                  className="sheep-all-button"
                  onClick={() => {
                    setTimeToggle(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  중단
                </span>
                <span
                  className="sheep-all-button"
                  onClick={handleReset}
                  style={{ cursor: "pointer" }}
                >
                  리셋
                </span>
              </div>
            </div>
          );
        } else if (timeToggle === true && restTimeToggle === false) {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="sheep-time-div" style={{ width: "90px" }}>
                  {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                    remainingSeconds
                  )}`}{" "}
                </div>
              </div>
              <div className="born">이제부터 집중하세요!...</div>
              <div className="born-button">
                <span
                  className="sheep-all-button"
                  onClick={() => {
                    setTimeToggle(true);
                  }}
                >
                  시작
                </span>
                <span
                  className="sheep-all-button"
                  onClick={() => {
                    setTimeToggle(false);
                  }}
                >
                  중단
                </span>
                <span className="sheep-all-button">설정</span>
              </div>
            </div>
          );
        } else if (timeToggle === false && restTimeToggle === true) {
          // timeToggle이 false일 때 휴식 타이머 인터페이스 출력
          return (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="sheep-time-div" style={{ width: "90px" }}>
                  {`${formatTime(restHours)}:${formatTime(
                    restMinutes
                  )}:${formatTime(restRemainingSeconds)}`}
                </div>
              </div>
              <div className="born">이제부터 휴식을 취하세요!...</div>
            </>
          );
        }
      })()}
    </div>
  );
}

interface SheepImageProps {
  plan: number;
  restTimeToggle: boolean;
  complete: number;
}

function SheepImage({ plan, restTimeToggle, complete }: SheepImageProps) {
  console.log(complete);

  useEffect(() => {
    // plan이 변경되면 렌더링 ===> 전체 양 이미지 개수 변경
  }, [plan]);

  useEffect(() => {
    // restTimeToggle이 변경되면 렌더링 ===> 컬러 양 이미지 추가
  }, [restTimeToggle]);

  const generateImages = () => {
    const images = [];

    for (let i = 0; i < complete; i++) {
      images.push(
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

    for (let i = 0; i < plan - complete; i++) {
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

    // if (restTimeToggle === true) {
    //   images.pop();
    //   images.unshift(
    //     <span className="sheep-image" key={`sheep-${Date.now()}`}>
    //       <Image
    //         src="/sheep_4.png"
    //         alt="Pictures of the sheep"
    //         width="65"
    //         height="65"
    //         style={{ marginBottom: "8px" }}
    //       />
    //     </span>
    //   );
    // }

    return images;
  };

  return (
    <>
      {/* 양 이미지를 생성하는 함수 호출 */}
      {generateImages()}
    </>
  );
}

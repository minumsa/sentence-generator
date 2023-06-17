import Image from "next/image";
import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Test5({ score, setScore }: TestProps) {
  const [mark1, setMark1] = useState<string>("");
  const [mark2, setMark2] = useState<string>("");
  const [mark3, setMark3] = useState<string>("");
  const [mark4, setMark4] = useState<string>("");
  const [copiedScore, setCopiedScore] = useState<number>(0);

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function toggleMarkStates(answer: number) {
    // 정답이 클릭되면 mark의 스타일을 바꿈
    // 클릭되지 않은 정답은 스타일을 초기화
    setMark1(answer === 1 ? "2px dashed black" : "");
    setMark2(answer === 2 ? "2px dashed black" : "");
    setMark3(answer === 3 ? "2px dashed black" : "");
    setMark4(answer === 4 ? "2px dashed black" : "");
  }

  function clickAnswer(answer: number) {
    // 정답이 클릭되었는지 확인
    if (
      (answer === 1 && mark1 === "2px dashed black") ||
      (answer === 2 && mark2 === "2px dashed black") ||
      (answer === 3 && mark3 === "2px dashed black") ||
      (answer === 4 && mark4 === "2px dashed black")
    ) {
      // 클릭된 정답이 또 클릭되면 초기화
      toggleMarkStates(0);
      setScore(copiedScore);
    } else {
      // 정답이 클릭되지 않았으면 toggleMarkStates 함수에 파라미터로 answer를 호출
      // 정답이 3이면 score를 copiedScore에 4를 더한 값으로 업데이트
      toggleMarkStates(answer);
      setScore(answer === 3 ? copiedScore + 4 : copiedScore);
    }
  }

  return (
    <>
      <div className="cine-test-format">
        <div>
          <span> 5. 다음 중 세계 3대 국제 영화제에 포함되지 </span>
          <span style={{ textDecoration: "underline" }}>않는</span>
          <span> 것은?</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(1) </div>
          <div onClick={() => clickAnswer(1)}>
            <div>
              {" "}
              <Image
                src="/cine-cannes.png"
                alt="Cannes"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "75" : "50"}
                style={{
                  marginBottom: "8px",
                  marginTop: "10px",
                  border: mark1,
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "60px" }}>(2) </div>
          <div onClick={() => clickAnswer(2)}>
            <div>
              {" "}
              <Image
                src="/cine-venice.png"
                alt="Venice"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "80" : "53"}
                style={{
                  marginLeft: "22px",
                  marginBottom: "8px",
                  marginTop: "10px",
                  border: mark2,
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>(3) </div>
          <div onClick={() => clickAnswer(3)}>
            <div
              style={{
                width: window.innerWidth > 450 ? "150" : "100",
                marginTop: "10px",
                marginBottom: "8px",
              }}
            >
              {" "}
              <Image
                className="rotterdam"
                src="/cine-rotterdam.png"
                alt="Rotterdam"
                width={window.innerWidth > 450 ? "125" : "83"}
                height={window.innerWidth > 450 ? "110" : "70"}
                style={{
                  marginLeft: "10px",
                  marginRight: window.innerWidth > 450 ? "15px" : "15px",
                  border: mark3,
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "50px" }}>(4) </div>
          <div onClick={() => clickAnswer(4)}>
            <div>
              {" "}
              <Image
                src="/cine-berlin.png"
                alt="Berlin"
                width={window.innerWidth > 450 ? "150" : "100"}
                height={window.innerWidth > 450 ? "88" : "60"}
                style={{
                  marginLeft: "22px",
                  marginBottom: "8px",
                  marginTop: "10px",
                  border: mark4,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test25({ score, setScore }: TestProps) {
  const [answers, setAnswers] = useState<React.CSSProperties[]>([
    {},
    {},
    {},
    {},
  ]);
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const answerStyle: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  useEffect(() => {
    setCopiedScore(score);
  }, []);

  function clickAnswer(answerIndex: number) {
    if (answers[answerIndex].backgroundColor === answerStyle.backgroundColor) {
      // 클릭한 답변을 다시 클릭하면 초기화
      setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[answerIndex] = {};
        return updatedAnswers;
      });
      setScore(copiedScore);
    } else {
      const updatedAnswers = Array.from({ length: 4 }, (_, index) =>
        index === answerIndex ? answerStyle : {}
      );
      setAnswers(updatedAnswers);
      setScore(score => (answerIndex === 3 ? score + 4 : copiedScore));
    }
  }

  return (
    <>
      <div
        className="cine-test-format"
        style={
          {
            // marginTop: window.innerWidth > 450 ? "15px" : "0",
            // marginBottom: window.innerWidth > 450 ? "15px" : "0",
          }
        }
      >
        <div className="cine-quiz">
          <span>{`25. 다음은 <마블 시네마틱 유니버스 페이즈 4> 시리즈를 무작위로 나열한 것이다. 해당 영화들을 `}</span>
          <span style={{ textDecoration: "underline" }}>개봉 순</span>
          <span>으로 올바르게 정렬한 것은?</span>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            border: "1px solid #0e1111",
            padding: "15px 25px",
          }}
        >
          {/* <div style={mark1} onClick={clickAnswer1}></div> */}
          <div>{`ㄱ. 블랙 위도우`}</div>
          <div>{`ㄴ. 블랙 팬서: 와칸다 포에버`}</div>
          <div>{`ㄷ. 이터널스`}</div>
          <div>{`ㄹ. 닥터 스트레인지: 대혼돈의 멀티버스`}</div>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className="cine-answer"
            style={answers[answerIndex - 1]}
            onClick={() => clickAnswer(answerIndex - 1)}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `ㄱ → ㄹ → ㄴ → ㄷ`
              : answerIndex === 2
              ? `ㄱ → ㄹ → ㄷ → ㄴ`
              : answerIndex === 3
              ? `ㄱ → ㄷ → ㄴ → ㄹ`
              : answerIndex === 4
              ? `ㄱ → ㄷ → ㄹ → ㄴ`
              : ``}
          </div>
        ))}
      </div>
    </>
  );
}

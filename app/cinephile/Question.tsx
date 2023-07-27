import { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { data } from "./data";
import React from "react";

interface QuestionProps {
  page: number;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export function Question({ page, score, setScore }: QuestionProps) {
  // TODO: useEffect 안 쓰고 useState(score)하면 될듯!
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const negative: string[] = ["아닌", "않은", "않는"];

  useEffect(() => {
    setTotalScore(prevScore => prevScore + score);
  }, [page]);

  function handleClick(answer: number) {
    setSelectedAnswer(answer);

    if (data[page].answer === answer && answer !== selectedAnswer) {
      setScore(4);
    } else if (data[page].answer !== answer) {
      setScore(0);
    }
  }

  return (
    <div className={styles["question-container"]}>
      <div className={styles["question"]}>
        {`${[page + 1]}. `}
        {negative.map((word, index) => {
          if (data[page].question.includes(word)) {
            const text = data[page].question.split(word);
            return (
              <React.Fragment key={index}>
                <span>{text[0]}</span>
                <span style={{ textDecoration: "underline" }}>{word}</span>
                <span>{text[1]}</span>
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
      {data[page].type === "multiple-choice" ? (
        data[page].options?.map((option, index) => {
          return (
            <div
              className={styles["options"]}
              style={{
                backgroundColor: index === selectedAnswer ? "#000000" : undefined,
                color: index === selectedAnswer ? "#ffffff" : undefined,
              }}
              key={index}
              onClick={() => handleClick(index)}
            >
              {`${index + 1}) ${option}`}
            </div>
          );
        })
      ) : data[page].type === "short-answer" ? (
        <div className={styles["short-answer-container"]}>
          <input className={styles["short-answer-input"]} onChange={e => setMark(e.target.value)} />
          {` ${data[page].paragraph}`}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

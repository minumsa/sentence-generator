import { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { data } from "./data";
import React from "react";
import Image from "next/image";

interface QuestionProps {
  page: number;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
}

export function Question({ page, score, setScore, setTotalScore }: QuestionProps) {
  // TODO: useEffect 안 쓰고 useState(score)하면 될듯!

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const negativeWord: string[] = ["아닌", "않은", "않는"];
  const [isNagative, setIsNagative] = useState<boolean>(false);

  useEffect(() => {
    setTotalScore(prevScore => prevScore + score);

    setSelectedAnswer(null);
    setIsNagative(false);

    negativeWord.map(word => {
      if (data[page - 1].question.includes(word)) setIsNagative(true);
    });
  }, [page]);

  function handleClick(answer: number) {
    setSelectedAnswer(answer);

    if (data[page - 1].answer === answer && answer !== selectedAnswer) {
      setScore(4);
    } else if (data[page - 1].answer !== answer) {
      setScore(0);
    }
  }

  const Options = () => {
    return data[page - 1].options?.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <div
            className={styles["options"]}
            style={{
              backgroundColor: index === selectedAnswer ? "#000000" : undefined,
              color: index === selectedAnswer ? "#ffffff" : undefined,
            }}
            onClick={() => handleClick(index)}
          >
            {`${index + 1}) ${option}`}
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles["question-container"]}>
      <div className={styles["question"]}>
        {`${[page]}. `}
        {isNagative
          ? negativeWord.map((word, index) => {
              if (data[page - 1].question.includes(word)) {
                const text = data[page - 1].question.split(word);
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
            })
          : data[page - 1].question}
      </div>
      {data[page - 1].type === "multiple-choice" ? (
        data[page - 1].type2 === "image" ? (
          <React.Fragment>
            <div className={styles["image-container"]}>
              <Image
                className={styles["image"]}
                src={`/cinephile/${data[page - 1].title}.webp`}
                alt={`${data[page - 1].title}`}
                width={window.innerWidth > 450 ? "280" : "180"}
                height={window.innerWidth > 450 ? "190" : "120"}
              />
            </div>
            <Options />
          </React.Fragment>
        ) : data[page - 1].movie === "chungking-express" ? (
          <React.Fragment>
            <div className={styles["chungking-express"]}>📞 🍍 🕒 😎</div>
            <div className={styles["chungking-express"]}>👮‍♂️ 💌 🔑 🛫</div>
            <Options />
          </React.Fragment>
        ) : (
          <Options />
        )
      ) : data[page - 1].type === "short-answer" ? (
        <div className={styles["short-answer-container"]}>
          {data[page - 1].paragraph
            ?.split(String(data[page - 1].answer))
            // .splice(0, 0, String(data[page - 1].answer))
            .map((text, index) => {
              return <React.Fragment key={index}>yes</React.Fragment>;
              // return text === String(data[page - 1].answer) ? (
              //   <input
              //     className={styles["short-answer-input"]}
              //     onChange={e => setMark(e.target.value)}
              //   ></input>
              // ) : (
              //   <React.Fragment key={index}>
              //     <span>{text}</span>
              //   </React.Fragment>
              // );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { data, negativeWord } from "./data";
import React from "react";
import Image from "next/image";

interface QuestionProps {
  page: number;
  userAnswer: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export function Question({ page, userAnswer, setUserAnswer }: QuestionProps) {
  const [hasNegativeWord, setHasNegativeWord] = useState<boolean>(false);

  useEffect(() => {
    data[page - 1].question.split(" ").some(element => negativeWord.includes(element))
      ? setHasNegativeWord(true)
      : setHasNegativeWord(false);
  }, [page]);

  const Options = () => {
    return data[page - 1].options?.map((option, index) => {
      return (
        <React.Fragment key={index}>
          <div
            className={styles["options"]}
            style={{
              backgroundColor: index === userAnswer ? "#000000" : undefined,
              color: index === userAnswer ? "#ffffff" : undefined,
            }}
            onClick={() => {
              setUserAnswer(index);
            }}
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
        {hasNegativeWord
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
                width={window.innerWidth > 450 ? "420" : "240"}
                height={window.innerWidth > 450 ? "290" : "160"}
              />
            </div>
            <Options />
          </React.Fragment>
        ) : data[page - 1].title === "chungking-express" ? (
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
          {data[page - 1].paragraph?.split(String(data[page - 1].answer)).map((text, index) => {
            return index === 0 ? (
              <React.Fragment key={index}>
                {text}
                <input
                  className={styles["short-answer-input"]}
                  onChange={e => {
                    setUserAnswer(e.target.value);
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{text}</React.Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

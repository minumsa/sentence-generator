import React, { useState } from "react";
import styles from "./cine.module.css";
import { data, negativeWord } from "./data";
import Image from "next/image";

export default function Answer() {
  // const isNegative = data.some(item => negativeWord.some(word => item.question.includes(word)));

  return (
    <div>
      <div className={styles["question"]}>
        {data.map((item, dataIndex) => {
          const hasNegativeWord = item.question
            .split(" ")
            .some(element => negativeWord.includes(element));

          return (
            <div
              className={`${styles["question-container"]} ${styles["commentary-container"]}`}
              key={dataIndex}
            >
              <div className={styles["question"]}>
                {`${[dataIndex + 1]}. `}
                {hasNegativeWord
                  ? negativeWord.map((word, index) => {
                      if (item.question.includes(word)) {
                        const text = item.question.split(word);
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
                  : item.question}
              </div>
              {item.type === "multiple-choice" ? (
                <React.Fragment>
                  {item.type2 === "image" ? (
                    <React.Fragment>
                      <div className={styles["image-container"]}>
                        <Image
                          className={styles["image"]}
                          src={`/cinephile/${item.title}.webp`}
                          alt={`${item.title}`}
                          width={window.innerWidth > 450 ? "300" : "240"}
                          height={window.innerWidth > 450 ? "220" : "175"}
                        />
                      </div>
                    </React.Fragment>
                  ) : item.title === "chungking-express" ? (
                    <React.Fragment>
                      <div className={styles["chungking-express"]}>📞 🍍 🕒 😎</div>
                      <div className={styles["chungking-express"]}>👮‍♂️ 💌 🔑 🛫</div>
                    </React.Fragment>
                  ) : null}
                  {item.options?.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles["options"]} ${styles["options-commentary"]}`}
                        style={{
                          cursor: "default",
                          backgroundColor: index === data[dataIndex].answer ? "#000000" : undefined,
                          color: index === data[dataIndex].answer ? "#ffffff" : undefined,
                        }}
                      >
                        {`${index + 1}) ${option}`}
                        {index === data[dataIndex].answer && data[dataIndex].caption ? (
                          <span
                            className={styles["caption"]}
                          >{`// ${data[dataIndex].caption}`}</span>
                        ) : null}
                        {index === data[dataIndex].answer && data[dataIndex].reference ? (
                          <a href={data[dataIndex].reference} target="_blank">
                            <div className={styles["reference"]}>
                              <span className={styles["reference-text"]}>관련 자료</span>
                            </div>
                          </a>
                        ) : null}
                      </div>
                    );
                  })}
                </React.Fragment>
              ) : item.type === "short-answer" ? (
                <div className={styles["short-answer-container"]}>
                  {item.paragraph?.split(String(item.answer)).map((text, index) => {
                    return index === 0 ? (
                      <React.Fragment key={index}>{text}</React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <span className={styles["options-selected"]}>{item.answer}</span>
                        {text}
                      </React.Fragment>
                    );
                  })}
                  {item.reference ? (
                    <a href={data[dataIndex].reference} target="_blank">
                      <div className={styles["reference"]}>
                        <span className={styles["options-selected"]}>관련 자료</span>
                      </div>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

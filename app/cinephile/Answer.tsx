import React from "react";
import styles from "./cine.module.css";
import { data } from "./data";
import Image from "next/image";

export default function Answer() {
  return (
    <div>
      <div className={styles["question"]}>
        {data.map((x, dataIndex) => {
          return (
            <div
              className={`${styles["question-container"]} ${styles["commentary-container"]}`}
              key={dataIndex}
            >
              <div className={styles["question"]}>{`${dataIndex + 1}. ${x.question}`}</div>
              {x.type === "multiple-choice" ? (
                <React.Fragment>
                  {x.type2 === "image" ? (
                    <React.Fragment>
                      <div className={styles["image-container"]}>
                        <Image
                          className={styles["image"]}
                          src={`/cinephile/${x.title}.webp`}
                          alt={`${x.title}`}
                          width={window.innerWidth > 450 ? "280" : "180"}
                          height={window.innerWidth > 450 ? "190" : "120"}
                        />
                      </div>
                    </React.Fragment>
                  ) : x.title === "chungking-express" ? (
                    <React.Fragment>
                      <div className={styles["chungking-express"]}>📞 🍍 🕒 😎</div>
                      <div className={styles["chungking-express"]}>👮‍♂️ 💌 🔑 🛫</div>
                    </React.Fragment>
                  ) : null}
                  {x.options?.map((option, index) => {
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
              ) : x.type === "short-answer" ? (
                <div className={styles["short-answer-container"]}>
                  {x.paragraph?.split(String(x.answer)).map((text, index) => {
                    return index === 0 ? (
                      <React.Fragment key={index}>{text}</React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <span className={styles["options-selected"]}>{x.answer}</span>
                        {text}
                      </React.Fragment>
                    );
                  })}
                  {x.reference ? (
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

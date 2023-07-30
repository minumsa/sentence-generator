import React from "react";
import styles from "./cine.module.css";
import { data } from "./data";

export default function David() {
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
                      <span className={styles["caption"]}>{`// ${data[dataIndex].caption}`}</span>
                    ) : null}
                    {index === data[dataIndex].answer && data[dataIndex].reference ? (
                      <a href={data[dataIndex].reference}>
                        <div className={styles["reference"]}>
                          <span className={styles["reference-text"]}>관련 자료</span>
                        </div>
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

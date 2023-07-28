import React from "react";
import styles from "./cine.module.css";
import { data } from "./data";

export default function David() {
  //     <a
  //     href="https://youtu.be/WjJ6pdVeOAg?t=88"
  //     target="_blank"
  //     style={{ color: "white", textDecoration: "none" }}
  //   >

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
                      backgroundColor: index === data[dataIndex].answer ? "#000000" : undefined,
                      color: index === data[dataIndex].answer ? "#ffffff" : undefined,
                    }}
                  >
                    {`${index + 1}) ${option}`}
                    {index === data[dataIndex].answer ? (
                      <a href={data[dataIndex].reference}>
                        <span className={styles["reference"]}>관련 자료</span>
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

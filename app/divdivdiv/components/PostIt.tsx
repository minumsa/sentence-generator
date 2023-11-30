import { useState } from "react";
import { Language, postit } from "../data";
import styles from "../divdivdiv.module.css";

interface PostItProps {
  language: Language;
}

export const PostIt = ({ language }: PostItProps) => {
  const [closePostIt, setClosePostIt] = useState<boolean>(false);

  return (
    <div
      className={styles["postit-container"]}
      style={closePostIt ? { display: "none" } : undefined}
    >
      <div
        className={styles["postit-close-button"]}
        onClick={() => {
          setClosePostIt(true);
        }}
      >
        ×
      </div>
      <div className={styles["postit-top"]}></div>
      <div className={styles["postit"]}>
        <div className={styles["postit-text"]}>
          {postit[language].map((text, index) => {
            return (
              <li key={index} style={{ listStyle: "number" }}>
                {text}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import styles from "./cine.module.css";
import { data } from "./data";

interface QuizProps {
  page: number;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export function Quiz({ page, score, setScore }: QuizProps) {
  const [prevScore, setPrevScore] = useState<number>(0);

  useEffect(() => {
    setPrevScore(score);
  }, []);

  function handleClick(answer: number) {
    console.log("answer", answer);

    if (data[page].answer === answer) {
      setScore(prevScore + 4);
    } else {
      setScore(prevScore);
    }
  }

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["quiz"]}>{`${[page + 1]}. ${data[page].quiz}`}</div>
      {data[page].options?.map((option, index) => {
        return (
          <div className={styles["options"]} key={index} onClick={() => handleClick(index)}>{`${
            index + 1
          }) ${option}`}</div>
        );
      })}
    </div>
  );
}

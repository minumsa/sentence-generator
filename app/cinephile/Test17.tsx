"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./cine.module.css";

interface TestProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface AnswerStyle {
  color: string;
  backgroundColor: string;
}

export default function Test17({ score, setScore }: TestProps) {
  const [lastDay, setLastDay] = useState<string | undefined>();
  const [lastDaysBoxOfficeList, setLastDaysBoxOfficeList] = useState<any[]>();
  const [movie1, setMovie1] = useState<string>("");
  const [movie2, setMovie2] = useState<string>("");
  const [movie3, setMovie3] = useState<string>("");
  const [movie4, setMovie4] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 월은 0부터 시작
    const day = today.getDate() - 1;

    if (day < 0) {
      const prevMonth = month - 1 === 0 ? 12 : month - 1;
      const prevYear = month - 1 === 0 ? year - 1 : year;
      const prevMonthLastDate = new Date(prevYear, prevMonth, 0).getDate();
      setLastDay(
        prevYear +
          (prevMonth < 10 ? "0" + String(prevMonth) : String(prevMonth)) +
          (prevMonthLastDate < 10 ? "0" + prevMonthLastDate : prevMonthLastDate)
      );
    } else {
      setLastDay(
        year + (month < 10 ? "0" + String(month) : String(month)) + (day < 10 ? "0" + day : day)
      );
    }
  }, []);

  useEffect(() => {
    if (lastDay && !lastDaysBoxOfficeList) {
      const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${lastDay}`;

      axios
        .get(url)
        .then(res => {
          const data = res.data;
          setLastDaysBoxOfficeList(data.boxOfficeResult.dailyBoxOfficeList);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [lastDay, lastDaysBoxOfficeList]);

  useEffect(() => {
    if (lastDaysBoxOfficeList && lastDaysBoxOfficeList.length > 0) {
      setMovie1(lastDaysBoxOfficeList[0].movieNm);
      setMovie2(lastDaysBoxOfficeList[1].movieNm);
      setMovie3(lastDaysBoxOfficeList[2].movieNm);
      setMovie4(lastDaysBoxOfficeList[3].movieNm);
    }
  }, [lastDaysBoxOfficeList]);

  const [answers, setAnswers] = useState<React.CSSProperties[]>([{}, {}, {}, {}]);
  const [copiedScore, setCopiedScore] = useState<number>(0);
  const answerStyle: AnswerStyle = {
    color: "white",
    backgroundColor: "#0e1111",
  };

  useEffect(() => {
    setCopiedScore(score);
  }, [score]);

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
      setScore(score => (answerIndex === 2 ? score + 4 : copiedScore));
    }
  }

  return (
    <div className={styles["question-container"]}>
      <div className={styles["question"]}>
        <span>
          {`17. 다음 중 어제(${lastDay?.split("").slice(0, 4).join("")}.${lastDay
            ?.split("")
            .slice(4, 6)
            .join("")}.${lastDay
            ?.split("")
            .slice(6, 8)
            .join("")}.) 박스오피스 1위를 기록한 영화는?`}{" "}
        </span>
        <span style={{ color: "gray" }}>
          (* 10초 이상 기다려도 보기가 뜨지 않는다면 다음 문제로 넘어가주세요.)
        </span>
      </div>
      {[1, 2, 3, 4].map(answerIndex => (
        <div
          key={answerIndex}
          className={styles["options"]}
          style={answers[answerIndex - 1]}
          onClick={() => clickAnswer(answerIndex - 1)}
        >
          ({answerIndex}){" "}
          {answerIndex === 1
            ? movie2
            : answerIndex === 2
            ? movie3
            : answerIndex === 3
            ? movie1
            : answerIndex === 4
            ? movie4
            : ``}
        </div>
      ))}
    </div>
  );
}

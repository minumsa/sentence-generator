import { useEffect, useState } from "react";
import styles from "../music.module.css";

export const Loading = () => {
  // const [dots, setDots] = useState(".");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDots(prevDots => {
  //       if (prevDots === ".") return "..";
  //       else if (prevDots === "..") return "...";
  //       else return ".";
  //     });
  //   }, 500); // 0.5초(500ms)마다 업데이트

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={styles["loading"]}>
      <div>데이터를 불러오는 중입니다...</div>
    </div>
  );
};

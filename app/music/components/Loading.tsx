import { useEffect, useState } from "react";
import styles from "../music.module.css";

export const Loading = () => {
  const [daysLeft, setDaysLeft] = useState<number>();

  useEffect(() => {
    const today = new Date();

    const christmasDate = new Date(today.getFullYear(), 11, 25);

    const timeDiff = christmasDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    setDaysLeft(days);
  }, []);

  return (
    <div className={styles["loading"]}>
      {daysLeft ? (
        <div>크리스마스까지 {daysLeft}일 남았습니다...</div>
      ) : daysLeft === 0 ? (
        <div>오늘은 크리스마스입니다! 🎅🏻</div>
      ) : undefined}
    </div>
  );
};

import { useEffect, useState } from "react";
import styles from "../music.module.css";

interface LoadingProps {
  dataLength: number | undefined;
}

export const Loading = ({ dataLength }: LoadingProps) => {
  const [daysLeft, setDaysLeft] = useState<number>();

  useEffect(() => {
    const today = new Date();

    const christmasDate = new Date(today.getFullYear(), 11, 25);

    const timeDiff = christmasDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    setDaysLeft(days);
  }, []);

  const christmasText = daysLeft ? (
    <div>크리스마스까지 {daysLeft}일 남았습니다...</div>
  ) : daysLeft === 0 ? (
    <div>오늘은 크리스마스입니다! 🎅🏻</div>
  ) : undefined;

  const noDataText = "일치하는 데이터가 없습니다...";

  return (
    <div className={styles["loading"]}>{dataLength === undefined ? christmasText : noDataText}</div>
  );
};

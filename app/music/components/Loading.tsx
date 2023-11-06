import styles from "../music.module.css";

export const Loading = () => {
  return (
    <div className={styles["loading"]}>
      <div>데이터를 불러오는 중입니다...</div>
    </div>
  );
};

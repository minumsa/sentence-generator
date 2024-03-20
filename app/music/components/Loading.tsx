import styles from "../music.module.css";

export const Loading = () => {
  const loadingText = "데이터 로딩 중입니다...";

  return (
    <>
      <div className={styles["loading-background"]}></div>
      <div className={styles["loading-text"]}>{loadingText}</div>
    </>
  );
};

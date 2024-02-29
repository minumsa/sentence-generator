import styles from "../music.module.css";

interface LoadingProps {
  isEmpty: boolean;
}

export const Loading = ({ isEmpty }: LoadingProps) => {
  const loadingText = "데이터 로딩 중입니다...";

  return (
    <>
      <div className={styles["loading-background"]} style={{ opacity: isEmpty ? 0 : "80%" }}></div>
      <div className={styles["loading-text"]}>{loadingText}</div>
    </>
  );
};

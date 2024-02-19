import styles from "../music.module.css";

interface LoadingProps {
  // dataLength: number | undefined;
  isScrolling: boolean;
}

export const Loading = ({ isScrolling }: LoadingProps) => {
  const loadingText = "데이터 로딩 중입니다...";
  const noDataText = "일치하는 데이터가 없습니다...";
  // const hasNoData = dataLength === 0;

  // return(
  //   <div className={styles["loading-container"]}>
  //     <div className={styles["loading-circle"]}></div>
  //   </div>
  // );
  return (
    <>
      <div
        className={styles["loading-background"]}
        style={{ opacity: isScrolling ? "80%" : undefined }}
      >
        {loadingText}
      </div>
      <div className={styles["loading-text"]}>{loadingText}</div>
    </>
  );
};

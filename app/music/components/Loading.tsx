import styles from "../music.module.css";

interface LoadingProps {
  // dataLength: number | undefined;
  isEmpty: boolean;
  hasNoResult?: boolean;
  isGridPage?: boolean;
}

export const Loading = ({ isEmpty, hasNoResult, isGridPage }: LoadingProps) => {
  const loadingText = "데이터 로딩 중입니다...";
  const noDataText = "일치하는 데이터가 없습니다...";

  return (
    <>
      {isGridPage ? (
        <>
          <div
            className={styles["loading-background"]}
            style={{ opacity: isEmpty ? undefined : "80%" }}
          ></div>
          <div className={styles["loading-text"]}>{hasNoResult ? noDataText : loadingText}</div>
        </>
      ) : (
        // <div className={styles["loading-container"]}>
        <div className={styles["loading-circle"]}></div>
        // </div>
      )}
    </>
  );
};

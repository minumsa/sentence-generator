import styles from "../music.module.css";

interface LoadingProps {
  dataLength: number | undefined;
}

export const Loading = ({ dataLength }: LoadingProps) => {
  const loadingText = "데이터 로딩 중입니다...";
  const noDataText = "일치하는 데이터가 없습니다...";
  const hasNoData = dataLength === 0;

  return hasNoData ? (
    <div className={styles["loading"]}>{noDataText}</div>
  ) : (
    <div className={styles["loading"]}>{loadingText}</div>
  );
};

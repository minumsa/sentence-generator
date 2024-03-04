import styles from "../music.module.css";

interface LoadingProps {
  isEmpty: boolean;
  hasNoResult?: boolean;
  keyword?: string;
}

export const Loading = ({ isEmpty, hasNoResult, keyword }: LoadingProps) => {
  const loadingText = "데이터 로딩 중입니다...";
  const noDataText = `"${keyword}"에 대한 검색 결과가 없습니다.`;

  return (
    <>
      <div
        className={styles["loading-background"]}
        style={{ opacity: isEmpty ? 0 : "80%", zIndex: keyword ? 3 : undefined }}
      ></div>
      <div
        className={styles["loading-text"]}
        style={{
          fontStyle: keyword ? "italic" : undefined,
          zIndex: keyword ? 3 : undefined,
        }}
      >
        {hasNoResult ? noDataText : loadingText}
      </div>
    </>
  );
};

import { useRouter } from "next/navigation";
import styles from "../music.module.css";

interface PageNumbersProps {
  pathName: string;
  currentPage: number;
  totalPage: number;
  maxPageNumber: number;
  perPageCount: number;
}

export const PageNumbers = ({
  pathName,
  currentPage,
  totalPage,
  maxPageNumber,
  perPageCount,
}: PageNumbersProps) => {
  const router = useRouter();
  const pageArray = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className={styles["page-container"]}>
      {currentPage > 5 && (
        <div
          className={styles["page"]}
          onClick={() => {
            if (maxPageNumber > 5) {
              const prevPageBlock = maxPageNumber - 5;
              router.push(`/music/${pathName}/${prevPageBlock}`);
            }
          }}
        >
          〈
        </div>
      )}
      {pageArray.map((page, index) => {
        const minPageNumber = maxPageNumber - perPageCount + 1;
        const pageButtonNumber = index + 1;
        if (pageButtonNumber >= minPageNumber && pageButtonNumber <= maxPageNumber)
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                router.push(`/music/${pathName}/${pageButtonNumber}`);
              }}
              style={
                currentPage === pageButtonNumber ? { fontWeight: 500, opacity: "70%" } : undefined
              }
            >
              {page}
            </div>
          );
      })}
      {totalPage - maxPageNumber > 0 && (
        <div
          className={styles["page"]}
          onClick={() => {
            const nextPageBlock = maxPageNumber + 1;
            router.push(`/music/${pathName}/${nextPageBlock}`);
          }}
        >
          〉
        </div>
      )}
    </div>
  );
};

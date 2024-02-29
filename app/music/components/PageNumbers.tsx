import { usePathname, useRouter } from "next/navigation";
import styles from "./PageNumbers.module.css";
import { useEffect, useState } from "react";

interface PageNumbersProps {
  currentPage: number;
  perPageCount: number;
  totalDataLength: number;
}

export const PageNumbers = ({ currentPage, perPageCount, totalDataLength }: PageNumbersProps) => {
  const router = useRouter();
  const [totalPage, setTotalPage] = useState(1);
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  const fullPathName = usePathname();
  const pathNameWithoutPageNumber = fullPathName.replace(/\/\d+$/, "");
  const [maxPageNumber, setMaxPageNumber] = useState<number>(5);

  useEffect(() => {
    setMaxPageNumber(Math.ceil(currentPage / perPageCount) * perPageCount);
  }, [currentPage, perPageCount]);

  useEffect(() => {
    if (totalDataLength) setTotalPage(Math.max(1, Math.ceil(totalDataLength / 5)));
  }, [totalDataLength]);

  const handlePageClick = (pageNumber: number) => {
    router.push(`${pathNameWithoutPageNumber}/${pageNumber}`);
  };

  const goToPreviousPage = () => {
    if (maxPageNumber > 5) {
      const prevPageBlock = maxPageNumber - 5;
      handlePageClick(prevPageBlock);
    }
  };

  const goToNextPage = () => {
    const nextPageBlock = maxPageNumber + 1;
    handlePageClick(nextPageBlock);
  };

  return (
    <footer className={styles["page-container"]}>
      {currentPage > 5 && (
        <div className={styles["page"]} onClick={goToPreviousPage}>
          〈
        </div>
      )}
      {pageNumbers.map((page, index) => {
        const minPageNumber = maxPageNumber - perPageCount + 1;
        const pageButtonNumber = index + 1;
        const isPageInRange =
          pageButtonNumber >= minPageNumber && pageButtonNumber <= maxPageNumber;

        if (isPageInRange)
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                handlePageClick(pageButtonNumber);
              }}
              style={currentPage === pageButtonNumber ? { color: "#cfcfcf" } : undefined}
            >
              {page}
            </div>
          );
      })}
      {totalPage - maxPageNumber > 0 && (
        <div className={styles["page"]} onClick={goToNextPage}>
          〉
        </div>
      )}
    </footer>
  );
};

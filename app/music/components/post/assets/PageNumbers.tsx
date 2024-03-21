import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SUB_PER_PAGE_COUNT } from "../../../modules/constants";
import styles from "./Test.module.css";

interface PageNumbersProps {
  currentPage: number;
  totalDataLength: number;
}

export const PageNumbers = ({ currentPage, totalDataLength }: PageNumbersProps) => {
  const router = useRouter();
  const [totalPageCount, setTotalPageCount] = useState(1);
  const pageArray = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  const pathName = usePathname();
  const pathNameWithoutPageNumber = pathName.replace(/\/\d+$/, "");
  const [maxPage, setMaxPage] = useState<number>(5);

  useEffect(() => {
    setMaxPage(Math.ceil(currentPage / SUB_PER_PAGE_COUNT) * SUB_PER_PAGE_COUNT);
  }, [currentPage]);

  useEffect(() => {
    if (totalDataLength) setTotalPageCount(Math.max(1, Math.ceil(totalDataLength / 5)));
  }, [totalDataLength]);

  const handlePageClick = (pageNumber: number) => {
    router.push(`${pathNameWithoutPageNumber}/${pageNumber}`);
  };

  const goToPrevPage = () => {
    if (maxPage > 5) {
      const prevPageBlock = maxPage - 5;
      handlePageClick(prevPageBlock);
    }
  };

  const goToNextPage = () => {
    const nextPageBlock = maxPage + 1;
    handlePageClick(nextPageBlock);
  };

  return (
    <footer className={styles["page-container"]}>
      {currentPage > 5 && (
        <div className={styles["page"]} onClick={goToPrevPage}>
          〈
        </div>
      )}
      {pageArray.map((page, index) => {
        const minPage = maxPage - SUB_PER_PAGE_COUNT + 1;
        const pageNumber = index + 1;
        const isPageNumberInRange = pageNumber >= minPage && pageNumber <= maxPage;
        const isCurrentPageEqualPageNumber = currentPage == pageNumber;
        if (isPageNumberInRange) {
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
                router.push(`${pathNameWithoutPageNumber}/${pageNumber}`);
              }}
              style={isCurrentPageEqualPageNumber ? { color: "#cfcfcf" } : undefined}
            >
              {page}
            </div>
          );
        } else {
          return null;
        }
      })}
      {totalPageCount - maxPage > 0 && (
        <div className={styles["page"]} onClick={goToNextPage}>
          〉
        </div>
      )}
    </footer>
  );
};

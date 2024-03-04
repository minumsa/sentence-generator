import { usePathname, useRouter } from "next/navigation";
import styles from "./pagenumbers.module.css";
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
<<<<<<< HEAD
        const currentPageNumber = index + 1;
        const isPageNumberInRange =
          currentPageNumber >= minPageNumber && currentPageNumber <= maxPageNumber;

        if (isPageNumberInRange) {
=======
        const pageButtonNumber = index + 1;
        const isPageInRange =
          pageButtonNumber >= minPageNumber && pageButtonNumber <= maxPageNumber;

        if (isPageInRange)
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
          return (
            <div
              key={index}
              className={styles["page"]}
              onClick={() => {
<<<<<<< HEAD
                router.push(`${pathNameWithoutPageNumber}/${currentPageNumber}`);
              }}
              style={currentPage === currentPageNumber ? { color: "#cfcfcf" } : undefined}
=======
                handlePageClick(pageButtonNumber);
              }}
              style={currentPage === pageButtonNumber ? { color: "#cfcfcf" } : undefined}
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
            >
              {page}
            </div>
          );
        } else {
          return null; // 페이지 버튼을 렌더링하지 않음
        }
      })}
      {totalPage - maxPageNumber > 0 && (
        <div className={styles["page"]} onClick={goToNextPage}>
          〉
        </div>
      )}
    </footer>
  );
};

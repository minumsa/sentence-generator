import { PageNumbers } from "./PageNumbers";
import { TopNav } from "./TopNav";
import { CriteriaType, MethodType } from "../modules/data";

interface ContentLayoutProps {
  children: React.ReactNode;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  currentMethod: MethodType;
  setCurrentMethod: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
  currentCriteria: CriteriaType;
  setCurrentCriteria: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number | undefined;
}

export const ContentLayout = ({
  children,
  keyword,
  setKeyword,
  currentMethod,
  setCurrentMethod,
  currentCriteria,
  setCurrentCriteria,
  currentPage,
  perPageCount,
  totalDataLength,
}: ContentLayoutProps) => {
  return (
    <>
      <TopNav
        keyword={keyword}
        setKeyword={setKeyword}
        currentMethod={currentMethod}
        setCurrentMethod={setCurrentMethod}
        currentCriteria={currentCriteria}
        setCurrentCriteria={setCurrentCriteria}
      />
      {children}
      <PageNumbers
        currentPage={currentPage}
        perPageCount={perPageCount}
        totalDataLength={totalDataLength}
      />
    </>
  );
};

import { PageNumbers } from "./PageNumbers";
import { TopNav } from "./TopNav";
import { AlbumInfo, CriteriaType, MethodType } from "../modules/data";
import { Loading } from "./Loading";

interface ContentLayoutProps {
  data: AlbumInfo[];
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
  data,
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
  const isLoading = data.length === 0;

  return (
    <>
      {isLoading ? (
        <Loading dataLength={totalDataLength} />
      ) : (
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
      )}
    </>
  );
};

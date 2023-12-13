import { useEffect, useState } from "react";
import { AlbumContents } from "./AlbumContents";
import { Loading } from "./Loading";
import { PageNumbers } from "./PageNumbers";
import { TopNav } from "./TopNav";
import { AlbumInfo, CriteriaType, MethodType } from "../modules/data";

interface ContentLayoutProps {
  children: React.ReactNode;
  data: AlbumInfo[];
  pathName: string;
  isAdminPage: boolean;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  dataLength: number | undefined;
  currentMethod: MethodType;
  setCurrentMethod: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
  currentCriteria: CriteriaType;
  setCurrentCriteria: React.Dispatch<React.SetStateAction<MethodType | CriteriaType>>;
  currentPage: number;
  totalPage: number;
  maxPageNumber: number;
  perPageCount: number;
}

export const ContentLayout = ({
  children,
  data,
  pathName,
  isAdminPage,
  keyword,
  setKeyword,
  dataLength,
  currentMethod,
  setCurrentMethod,
  currentCriteria,
  setCurrentCriteria,
  currentPage,
  totalPage,
  maxPageNumber,
  perPageCount,
}: ContentLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return (
    <>
      {isLoading && <Loading dataLength={dataLength} />}
      {!isLoading && (
        <>
          <TopNav
            pathName={pathName}
            keyword={keyword}
            currentKeyword={undefined}
            setKeyword={setKeyword}
            currentMethod={currentMethod}
            setCurrentMethod={setCurrentMethod}
            currentCriteria={currentCriteria}
            setCurrentCriteria={setCurrentCriteria}
          />
          {children}
          <PageNumbers
            pathName={isAdminPage ? `admin/${pathName}` : pathName}
            currentPage={currentPage}
            totalPage={totalPage}
            maxPageNumber={maxPageNumber}
            perPageCount={perPageCount}
          />
        </>
      )}
    </>
  );
};

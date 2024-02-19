import { PageNumbers } from "./PageNumbers";
import { Loading } from "./Loading";
import { TopNav } from "./TopNav";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number | undefined;
  isLoading?: boolean;
  isScrolling?: boolean;
}

export const ContentLayout = ({
  children,
  currentPage,
  perPageCount,
  totalDataLength,
  isLoading,
  isScrolling,
}: ContentLayoutProps) => {
  return (
    <>
      {isLoading && <Loading isEmpty={isScrolling ? false : true} />}
      <TopNav isVisible={true} />
      {
        <>
          {children}
          {totalDataLength && (
            <PageNumbers
              currentPage={currentPage}
              perPageCount={perPageCount}
              totalDataLength={totalDataLength}
            />
          )}
        </>
      }
    </>
  );
};

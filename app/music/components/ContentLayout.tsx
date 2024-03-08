import { PageNumbers } from "./PageNumbers";
import { Loading } from "./Loading";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number;
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
      {children}
      {totalDataLength > 0 && (
        <PageNumbers
          currentPage={currentPage}
          perPageCount={perPageCount}
          totalDataLength={totalDataLength}
        />
      )}
    </>
  );
};

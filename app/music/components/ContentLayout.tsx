import { PageNumbers } from "./PageNumbers";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number;
}

export const ContentLayout = ({
  children,
  currentPage,
  perPageCount,
  totalDataLength,
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

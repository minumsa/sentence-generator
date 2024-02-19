import { PageNumbers } from "./PageNumbers";
import { Loading } from "./Loading";
import { TopNav } from "./TopNav";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number | undefined;
  isLoading?: boolean;
}

export const ContentLayout = ({
  children,
  currentPage,
  perPageCount,
  totalDataLength,
  isLoading,
}: ContentLayoutProps) => {
  return (
    <>
      {isLoading && <Loading isLoading={false} />}
      <TopNav isVisible={isLoading} />
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

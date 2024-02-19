import { PageNumbers } from "./PageNumbers";
import { TopNav } from "./TopNav";
import { AlbumInfo } from "../modules/data";
import { Loading } from "./Loading";

interface ContentLayoutProps {
  data: AlbumInfo[];
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number | undefined;
  isEmptyGrid?: boolean;
}

export const ContentLayout = ({
  data,
  children,
  currentPage,
  perPageCount,
  totalDataLength,
  isEmptyGrid,
}: ContentLayoutProps) => {
  const isLoading = data?.length === 0;

  return (
    <>
      {isLoading && <Loading isScrolling={false} />}
      {
        <>
          {/* <TopNav isEmptyGrid={isEmptyGrid} /> */}
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

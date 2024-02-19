import { PageNumbers } from "./PageNumbers";
import { AlbumInfo } from "../modules/data";
import { Loading } from "./Loading";
import { TopNav } from "./TopNav";
import { useEffect, useState } from "react";

interface ContentLayoutProps {
  data: AlbumInfo[];
  children: React.ReactNode;
  currentPage: number;
  perPageCount: number;
  totalDataLength: number | undefined;
  isEmptyGrid?: boolean;
  isLoading?: boolean;
}

export const ContentLayout = ({
  data,
  children,
  currentPage,
  perPageCount,
  totalDataLength,
  isEmptyGrid,
  isLoading,
}: ContentLayoutProps) => {
  console.log();

  return (
    <>
      {isLoading && <Loading isScrolling={false} />}
      <TopNav isEmptyGrid={isLoading} />
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

import { PageNumbers } from "./PageNumbers";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: number;
  totalDataLength: number;
}

export const ContentLayout = ({ children, currentPage, totalDataLength }: ContentLayoutProps) => {
  return (
    <>
      {children}
      {totalDataLength > 0 && (
        <PageNumbers currentPage={currentPage} totalDataLength={totalDataLength} />
      )}
    </>
  );
};

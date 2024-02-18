"use client";

import { usePathname } from "next/navigation";
import { Category } from "./Category";
import { Hamburger } from "./Hamburger";
import { MobileTitle } from "./MobileTitle";
import { Snow } from "./Snow";
import styles from "../music.module.css";
import { Loading } from "./Loading";

export const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      {/* TODO: TopNav도 MusicLayout에 추가 */}
      {/* <TopNav
            pathName={pathName}
            isAdminPage={isAdminPage}
            currentKeyword={undefined}
            currentMethod={currentMethod}
            setCurrentMethod={setCurrentMethod}
            currentCriteria={currentCriteria}
            setCurrentCriteria={setCurrentCriteria}
          /> */}
      {/* <Snow /> */}
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger pathName={pathName} />
        <Category pathName={pathName} fullPathName={fullPathName} />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

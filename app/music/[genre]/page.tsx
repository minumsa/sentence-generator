"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, activeStyle, contents, initialCurrentPage } from "../lib/data";
import Content from "../lib/Content";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Hamburger } from "../lib/Hamburger";
import { MobileTitle } from "../lib/MobileTitle";

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const pathName = params.genre;
  const isMainPage = Number(pathName) > 0;
  const fullPathName = usePathname();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useAtom(initialCurrentPage);

  useEffect(() => {
    setShowCategory(false);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <MobileTitle />
        <Hamburger
          pathName={pathName}
          showCategory={showCategory}
          setShowCategory={setShowCategory}
        />
        <div className={styles["desktop-category"]}>
          {Object.keys(contents).map(category => {
            const isActiveCategory = pathName === category || (isMainPage && category === "");
            return (
              <div
                key={category}
                className={styles["category"]}
                onClick={() => {
                  setCurrentPage(1);
                  router.push(`/music/${category}/1`);
                }}
                style={isActiveCategory ? activeStyle : {}}
              >
                {contents[category]}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={isMainPage ? "" : pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

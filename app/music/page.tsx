"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents, initialCurrentPage } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";
import { useState } from "react";
import { useAtom } from "jotai";
import { MobileTitle } from "./lib/MobileTitle";
import { Hamburger } from "./lib/Hamburger";

export default function Page() {
  const router = useRouter();
  const pathName = "";
  const fullPathName = usePathname();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useAtom(initialCurrentPage);

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
          {Object.keys(contents).map((category, index) => {
            return (
              <div
                key={category}
                className={styles["category"]}
                onClick={() => {
                  setCurrentPage(1);
                  router.push(`/music/${category}/1`);
                }}
                style={pathName === category ? activeStyle : {}}
              >
                {contents[category]}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

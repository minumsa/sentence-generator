"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, activeStyle, contents, initialCurrentPage } from "../lib/data";
import Content from "../lib/Content";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

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
        <div
          className={styles["mobile-title"]}
          onClick={() => {
            router.push("/music");
          }}
        >
          <div>divdivdiv</div>
        </div>
        <div
          className={styles["hamburger-container"]}
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          <div
            className={styles["hamburger-icon"]}
            style={{ display: showCategory ? "none" : "flex" }}
          ></div>
          <div className={styles["close-icon"]} style={{ display: showCategory ? "flex" : "none" }}>
            <div>×</div>
          </div>
          {showCategory ? (
            <div className={styles["hamburger-category"]}>
              {Object.keys(contents).map((category, index) => {
                const isActiveCategory = pathName === category || (isMainPage && category === "");
                if (index > 0)
                  return (
                    <div
                      key={category}
                      className={styles["hamburger-content"]}
                      onClick={() => {
                        router.push(`/music/${category}/1`);
                      }}
                      style={isActiveCategory ? activeStyle : {}}
                    >
                      {contents[category]}
                    </div>
                  );
              })}
            </div>
          ) : null}
        </div>
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

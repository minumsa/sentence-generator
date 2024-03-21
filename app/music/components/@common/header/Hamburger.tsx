import { usePathname, useRouter } from "next/navigation";
import styles from "./Hamburger.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { CurrentTagKeyAtom } from "../../../modules/atoms";
import { toGenrePage } from "../../../modules/paths";
import { isAdminPage } from "../../../modules/utils";
import { CATEGORY } from "../../../modules/constants";

export const Hamburger = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [currentTagKey, setCurrentTagKey] = useAtom(CurrentTagKeyAtom);

  return (
    <nav
      className={styles["hamburger-container"]}
      onClick={() => {
        setShowCategory(!showCategory);
      }}
    >
      <button
        className={styles["hamburger-icon"]}
        style={{ display: showCategory ? "none" : "flex" }}
      ></button>
      <button
        className={styles["close-container"]}
        style={{ display: showCategory ? "flex" : "none" }}
      >
        <div className={styles["close"]}>×</div>
      </button>
      {showCategory ? (
        <ul className={styles["category"]}>
          {Object.keys(CATEGORY).map(category => {
            return (
              <React.Fragment key={category}>
                <Link
                  href={toGenrePage(pathName, category)}
                  onClick={() => {
                    setCurrentTagKey("");
                  }}
                >
                  <li className={styles["category-item"]}>{CATEGORY[category]}</li>
                </Link>
              </React.Fragment>
            );
          })}
        </ul>
      ) : null}
      {showCategory && isAdminPage(pathName) && (
        <div className={styles["admin-category"]}>
          <div className={styles["category-item-title"]}>관리자 메뉴</div>
          <div
            className={styles["category-item"]}
            onClick={() => {
              router.push("/music/admin/upload");
            }}
          >
            글쓰기
          </div>
        </div>
      )}
    </nav>
  );
};

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { categoryPath, contents, isAdminPage } from "../modules/data";
import React, { useState } from "react";
import Link from "next/link";

export const Hamburger = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [showCategory, setShowCategory] = useState<boolean>(false);

  return (
    <nav
      className={styles["desktop-hamburger-container"]}
      onClick={() => {
        setShowCategory(!showCategory);
      }}
    >
      <button
        className={styles["hamburger-icon"]}
        style={{ display: showCategory ? "none" : "flex" }}
      ></button>
      <button className={styles["close-icon"]} style={{ display: showCategory ? "flex" : "none" }}>
        <div style={{ fontWeight: 100, marginTop: "1px" }}>×</div>
      </button>
      {showCategory ? (
        <ul className={`${styles["desktop-genre-category"]} ${styles["backdrop-filtered"]}`}>
          {Object.keys(contents).map(category => {
            return (
              <React.Fragment key={category}>
                <Link href={categoryPath(pathName, category)}>
                  <li className={styles["hamburger-item"]}>{contents[category]}</li>
                </Link>
              </React.Fragment>
            );
          })}
        </ul>
      ) : null}
      {showCategory && isAdminPage(pathName) && (
        <div
          className={`${styles["desktop-introduction-category"]} ${styles["backdrop-filtered"]}`}
        >
          <div className={styles["hamburger-item-title"]}>관리자 메뉴</div>
          <div
            className={styles["hamburger-item"]}
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

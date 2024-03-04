import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { contents, isAdminPage } from "../modules/data";
import { useState } from "react";

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
        <div style={{ fontWeight: 100 }}>×</div>
      </button>
      {showCategory ? (
        <ul className={styles["desktop-genre-category"]}>
          {Object.keys(contents).map(category => {
            return (
              <li
                key={category}
                className={styles["hamburger-item"]}
                onClick={() => {
                  isAdminPage(pathName)
                    ? router.push(`/music/admin/${category}/1`)
                    : router.push(`/music/${category}/1`);
                }}
              >
                {contents[category]}
              </li>
            );
          })}
        </ul>
      ) : null}
      {/* TODO: 게시판 더 추가할지 말지 결정 */}
      {/* {showCategory && (
        <div className={styles["desktop-introduction-category"]}>
          <div className={styles["hamburger-item-title"]}>소개</div>
          <div className={styles["hamburger-item"]}>카버</div>
          <div className={styles["hamburger-item"]}>카버차트</div>
          <div className={styles["hamburger-item"]}>연락처</div>
        </div>
      )} */}
    </nav>
  );
};

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { contents, isAdminPage } from "../modules/data";
import { useState } from "react";

export const DesktopHamburgerMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [showCategory, setShowCategory] = useState<boolean>(false);

  return (
    <div
      className={styles["desktop-hamburger-container"]}
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
        <div className={styles["desktop-genre-category"]}>
          <div className={styles["hamburger-item-title"]}>장르</div>
          {Object.keys(contents).map(category => {
            return (
              <div
                key={category}
                className={styles["hamburger-item"]}
                onClick={() => {
                  isAdminPage(pathName)
                    ? router.push(`/music/admin/${category}/1`)
                    : router.push(`/music/${category}/1`);
                }}
              >
                {contents[category]}
              </div>
            );
          })}
        </div>
      ) : null}
      {showCategory && (
        <div className={styles["desktop-introduction-category"]}>
          <div className={styles["hamburger-item-title"]}>소개</div>
          <div className={styles["hamburger-item"]}>카버</div>
          <div className={styles["hamburger-item"]}>카버차트</div>
          <div className={styles["hamburger-item"]}>연락처</div>
        </div>
      )}
    </div>
  );
};

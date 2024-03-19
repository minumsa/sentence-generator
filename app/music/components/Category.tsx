import styles from "../music.module.css";
import { isAdminPage } from "../modules/data";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { usePathname } from "next/navigation";

export const Category = () => {
  const pathName = usePathname();

  return (
    <div className={styles["header-container"]}>
      {/* 햄버거 메뉴 */}
      <Hamburger />
      <div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}
        className={styles["backdrop-filtered"]}
      >
        <div className={styles["desktop-category"]}>
          <div style={{ width: "20px" }}></div>
          {/* 사이트 제목 */}
          <Link
            className={`${styles["category"]} ${styles["site-title"]}`}
            href={isAdminPage(pathName) ? "/music/admin" : "/music"}
          >
            <nav>카버차트</nav>
          </Link>
          {/* 검색 아이콘 */}
          <Link href={isAdminPage(pathName) ? "/music/admin/search" : "/music/search"}>
            <nav className={styles["top-magnifying-glass"]}></nav>
          </Link>
        </div>
      </div>
    </div>
  );
};

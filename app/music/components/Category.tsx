import styles from "../music.module.css";
import { isAdminPage } from "../modules/data";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { usePathname } from "next/navigation";

export const Category = () => {
  const pathName = usePathname();

  return (
    <div style={{ position: "relative", width: "1280px", height: "100%" }}>
      <Hamburger />
      <div
        className={styles["backdrop-filtered"]}
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}
      >
        <div className={styles["desktop-category"]}>
          {/* 햄버거 메뉴 */}
          <div style={{ width: "20px" }}></div>
          {/* 사이트 제목 */}
          <Link
            className={`${styles["category"]} ${styles["site-title"]}`}
            href={isAdminPage(pathName) ? "/music/admin" : "/music"}
          >
            카버차트
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

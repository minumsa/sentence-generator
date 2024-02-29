import styles from "../music.module.css";
import { isAdminPage } from "../modules/data";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { usePathname } from "next/navigation";

export const Category = () => {
  const pathName = usePathname();

  return (
    <header className={styles["desktop-category"]}>
      {/* 햄버거 메뉴 */}
      <Hamburger />
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
    </header>
  );
};

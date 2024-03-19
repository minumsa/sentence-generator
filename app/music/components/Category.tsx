import styles from "../music.module.css";
import { CurrentTagKeyAtom, isAdminPage } from "../modules/data";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";

export const Category = () => {
  const pathName = usePathname();
  const [currentTagKey, setCurrentTagKey] = useAtom(CurrentTagKeyAtom);

  // 메인 페이지일 때 사이트 로고를 누르면 최상단으로 이동
  const scrollToTop = () => {
    if (pathName === "/music") {
      window.scrollTo(0, 0);
      setCurrentTagKey("");
    }
  };

  return (
    <div className={styles["header-container"]}>
      {/* 햄버거 메뉴 */}
      <Hamburger />
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
        <div className={styles["desktop-category"]}>
          <div style={{ width: "20px" }}></div>
          {/* 사이트 제목 */}
          <Link
            className={`${styles["category"]} ${styles["site-title"]}`}
            href={isAdminPage(pathName) ? "/music/admin" : "/music"}
            onClick={() => {
              scrollToTop();
            }}
          >
            <nav>카버차트</nav>
          </Link>
          {/* 검색 아이콘 */}
          <Link
            href={isAdminPage(pathName) ? "/music/admin/search" : "/music/search"}
            onClick={() => {
              setCurrentTagKey("");
            }}
          >
            <nav className={styles["top-magnifying-glass"]}></nav>
          </Link>
        </div>
      </div>
    </div>
  );
};

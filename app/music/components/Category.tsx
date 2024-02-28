import styles from "../music.module.css";
import { isAdminPage } from "../modules/data";
import Link from "next/link";
import { DesktopHamburgerMenu } from "./DesktopHamburgerMenu";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Category = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");
  async function handleSearch() {
    isAdminPage(pathName)
      ? router.push(`/music/admin/search/${keyword}/1`)
      : router.push(`/music/search/${keyword}/1`);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header
      className={styles["desktop-category"]}
      style={{ fontSize: "1.15rem", alignItems: "center" }}
    >
      <DesktopHamburgerMenu />
      <Link
        className={`${styles["category"]} ${styles["site-title"]}`}
        href={isAdminPage(pathName) ? "/music/admin" : "/music"}
      >
        카버차트
      </Link>
      <Link href={isAdminPage(pathName) ? "/music/admin/search" : "/music/search"}>
        <nav
          className={styles["top-magnifying-glass"]}
          // FIXME: input 클릭하면 사라지는 이슈 해결
        >
          {/* {isSearching && (
          <div className={styles["top-search-container"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="search"
                className={styles["top-search-input"]}
                placeholder="검색"
                onChange={e => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
        )} */}
        </nav>
      </Link>
    </header>
  );
};

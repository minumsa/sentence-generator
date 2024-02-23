import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage } from "../modules/data";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { HamburgerDesktop } from "./HamburgerDesktop";

interface CategoryProps {
  pathName: string;
  fullPathName: string;
}

export const Category = ({ pathName, fullPathName }: CategoryProps) => {
  return (
    <div
      className={styles["desktop-category"]}
      style={{ fontSize: "1.1rem", alignItems: "center" }}
    >
      <HamburgerDesktop pathName={pathName} />
      <Link
        className={`${styles["category"]} ${styles["site-title"]}`}
        href={isAdminPage(fullPathName) ? "/music/admin" : "/music"}

        // onClick={() => {
        //   router.push(isAdminPage(fullPathName) ? `/music/admin` : `/music`);
        // }}
        // style={pathName === "/music/admin" || pathName === "/music" ? activeStyle : {}}
      >
        {/* divdivdiv */}
        카버차트
      </Link>
      {/* <div className={styles["category"]} style={{ margin: "0 50px" }}>
        GENRE
      </div>
      <div className={styles["category"]}>BOARD</div> */}
      {/* <div style={{ flexGrow: 1 }}></div> */}
      <div
        className={styles["top-magnifying-glass"]}
        // onClick={() => {
        //   setIsSearching(!isSearching);
        // }}
      ></div>
      {/* {Object.keys(contents).map(category => {
        const isActiveCategory = pathNameToArray.includes(category);

        return (
          <Link
            key={category}
            className={styles["category"]}
            href={isAdminPage(fullPathName) ? `/music/admin/${category}` : `/music/${category}`}
            // onClick={() => {
            //   router.push(
            //     isAdminPage(fullPathName) ? `/music/admin/${category}` : `/music/${category}`
            //   );
            // }}
            style={isActiveCategory ? activeStyle : {}}
          >
            {category.toUpperCase()}
          </Link>
        );
      })} */}
    </div>
  );
};

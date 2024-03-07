import styles from "../music.module.css";
import Link from "next/link";

export const Footer = () => {
  return (
    <header className={styles["footer-container"]}>
      <div className={styles["desktop-category"]}>
        {/* 공백 */}
        <div></div>
        {/* 저작권 정보 */}
        <div style={{ fontSize: "1rem" }}>ⓒ 카버</div>
        {/* 깃허브 아이콘 */}
        <Link href={"https://github.com/minumsa/divdivdiv/tree/main/app/music"} target="_blank">
          <nav className={styles["footer-github-icon"]}></nav>
        </Link>
      </div>
    </header>
  );
};

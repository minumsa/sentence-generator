import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents } from "./data";

interface HamburgerProps {
  pathName: string;
  showCategory: boolean;
  setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hamburger = ({ pathName, showCategory, setShowCategory }: HamburgerProps) => {
  const router = useRouter();
  const isMainPage = Number(pathName) > 0;

  return (
    <div
      className={styles["hamburger-container"]}
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
        <div className={styles["hamburger-category"]}>
          {Object.keys(contents).map((category, index) => {
            const isActiveCategory = pathName === category || (isMainPage && category === "");
            if (index > 0)
              return (
                <div
                  key={category}
                  className={styles["hamburger-content"]}
                  onClick={() => {
                    router.push(`/music/${category}/1`);
                  }}
                  style={isActiveCategory ? activeStyle : {}}
                >
                  {contents[category]}
                </div>
              );
          })}
        </div>
      ) : null}
    </div>
  );
};

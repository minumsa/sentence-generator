import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents } from "../modules/data";
import { useEffect, useState } from "react";

interface HamburgerProps {
  pathName: string;
}

// FIXME: 컴포넌트화 시킬 수 있는 부분 전부 작업
// FIXME: 컴포넌트화 시키면서 안 쓰게 된 코드들 모두 삭제
export const Hamburger = ({ pathName }: HamburgerProps) => {
  const router = useRouter();
  const isMainPage = Number(pathName) > 0;
  const [showCategory, setShowCategory] = useState<boolean>(false);

  useEffect(() => {
    setShowCategory(false);
  }, []);

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

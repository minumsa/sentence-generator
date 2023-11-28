import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage, isMainPage } from "../modules/data";
import { useEffect, useState } from "react";
import Aos from "aos";

interface CategoryProps {
  pathName: string;
  fullPathName: string;
}

export const Category = ({ pathName, fullPathName }: CategoryProps) => {
  const router = useRouter();
  const [boardIsVisible, setBoardIsVisible] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className={styles["desktop-category"]}>
      <div
        className={styles["category"]}
        onClick={() => {
          setBoardIsVisible(!boardIsVisible);
          router.push(isAdminPage(fullPathName) ? `/music/admin` : `/music`);
        }}
        style={pathName === "" ? activeStyle : {}}
      >
        divdivdiv
      </div>
      {Object.keys(contents).map(category => {
        const isActiveCategory = pathName === category || (isMainPage(pathName) && category === "");
        return (
          <div
            key={category}
            className={styles["category"]}
            onClick={() => {
              router.push(
                isAdminPage(fullPathName) ? `/music/admin/${category}` : `/music/${category}`
              );
            }}
            style={isActiveCategory ? activeStyle : {}}
          >
            {contents[category]}
          </div>
        );
      })}
    </div>
  );
};

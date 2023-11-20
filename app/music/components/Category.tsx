import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage, isMainPage } from "../modules/data";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
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
      {/* <div
        className={styles["category"]}
        onClick={() => {
          setBoardIsVisible(!boardIsVisible);
        }}
      >
        게시판
      </div>
      <div
        className={styles["category"]}
        style={{ display: boardIsVisible ? undefined : "none" }}
        data-aos="fade-up"
        data-aos-duration="2500"
        data-aos-offset={isMobile ? "50" : "100"}
        data-aos-once="false"
      >
        소개
      </div>
      <div
        className={styles["category"]}
        style={{ display: boardIsVisible ? undefined : "none" }}
        data-aos="fade-up"
        data-aos-duration="2500"
        data-aos-offset={isMobile ? "50" : "100"}
        data-aos-once="false"
      >
        연결
      </div> */}
    </div>
  );
};

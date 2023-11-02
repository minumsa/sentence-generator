import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage, isMainPage } from "../modules/data";
import { useAtom } from "jotai";

interface CategoryProps {
  pathName: string;
  fullPathName: string;
}

export const Category = ({ pathName, fullPathName }: CategoryProps) => {
  const router = useRouter();

  return (
    <div className={styles["desktop-category"]}>
      {Object.keys(contents).map(category => {
        const isActiveCategory = pathName === category || (isMainPage(pathName) && category === "");
        return (
          <div
            key={category}
            className={styles["category"]}
            onClick={() => {
              router.push(
                isAdminPage(fullPathName) ? `/music/admin/${category}/1` : `/music/${category}/1`
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

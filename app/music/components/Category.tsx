import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage } from "../modules/data";

interface CategoryProps {
  pathName: string;
  fullPathName: string;
}

export const Category = ({ pathName, fullPathName }: CategoryProps) => {
  const router = useRouter();
  const pathNameToArray = pathName.split("/");

  return (
    <div className={styles["desktop-category"]}>
      <div
        className={styles["category"]}
        onClick={() => {
          router.push(isAdminPage(fullPathName) ? `/music/admin` : `/music`);
        }}
        style={pathName === "/music/admin" || pathName === "/music" ? activeStyle : {}}
      >
        divdivdiv
      </div>
      {Object.keys(contents).map(category => {
        const isActiveCategory = pathNameToArray.includes(category);

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

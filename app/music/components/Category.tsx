import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, isAdminPage } from "../modules/data";
import Link from "next/link";

interface CategoryProps {
  pathName: string;
  fullPathName: string;
}

export const Category = ({ pathName, fullPathName }: CategoryProps) => {
  const router = useRouter();
  const pathNameToArray = pathName.split("/");

  return (
    <div className={styles["desktop-category"]}>
      <Link
        className={styles["category"]}
        href={isAdminPage(fullPathName) ? "/music/admin" : "/music"}
        // onClick={() => {
        //   router.push(isAdminPage(fullPathName) ? `/music/admin` : `/music`);
        // }}
        style={pathName === "/music/admin" || pathName === "/music" ? activeStyle : {}}
      >
        divdivdiv
      </Link>
      {Object.keys(contents).map(category => {
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
            {contents[category]}
          </Link>
        );
      })}
    </div>
  );
};

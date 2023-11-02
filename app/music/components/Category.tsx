import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, initialCurrentPage } from "../modules/data";
import { useAtom } from "jotai";

interface CategoryProps {
  pathName: string;
}

export const Category = ({ pathName }: CategoryProps) => {
  const router = useRouter();
  const isMainPage = Number(pathName) > 0;
  const [currentPage, setCurrentPage] = useAtom(initialCurrentPage);

  return (
    <div className={styles["desktop-category"]}>
      {Object.keys(contents).map(category => {
        const isActiveCategory = pathName === category || (isMainPage && category === "");
        return (
          <div
            key={category}
            className={styles["category"]}
            onClick={() => {
              setCurrentPage(1);
              router.push(`/music/${category}/1`);
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

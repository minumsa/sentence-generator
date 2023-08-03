"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, filteredPathName } from "../lib/data";
import Content from "../lib/Content";

export default function Page() {
  const router = useRouter();
  let pathName = usePathname();

  switch (pathName) {
    case "/music/admin":
      pathName = "admin";
      break;
    default:
      pathName = pathName.split("/music/").join("");
      break;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {contents.map(category => {
          const categoryName = filteredPathName(category);
          let newPathName = "";

          if (pathName.split("admin").join("") !== "") {
            newPathName = pathName.split("admin/").join("");
          }

          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/admin/${categoryName}`);
              }}
              style={newPathName === categoryName ? activeStyle : {}}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} />
      </div>
    </div>
  );
}

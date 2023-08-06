"use client";

import { useRouter } from "next/navigation";
import { activeStyle, contents, filteredPathName } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";

export default function Page() {
  const router = useRouter();
  let pathName = "";

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {contents.map(category => {
          const categoryName = filteredPathName(category);

          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/${categoryName}`);
              }}
              style={pathName === categoryName ? activeStyle : {}}
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

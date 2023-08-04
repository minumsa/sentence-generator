"use client";

import { usePathname, useRouter } from "next/navigation";

import styles from "../music.module.css";
import { activeStyle, contents, filteredPathName } from "../lib/data";
import Content from "../lib/Content";
import Upload from "../Upload";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  let pathName = usePathname();

  switch (pathName) {
    case "/music":
      pathName = "";
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

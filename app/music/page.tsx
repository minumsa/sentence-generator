"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents, filteredPathName } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";

export default function Page() {
  const pathName = usePathname();
  console.log(pathName);

  const router = useRouter();

  // TODO: 버튼 컴포넌트 만들기

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {contents.map(category => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/${filteredPathName(category)}`);
              }}
              style={
                (pathName === "/music" && category === "ALL") ||
                (pathName === "r&b_soul" && category === "R&B/SOUL") ||
                pathName.includes(category.toLowerCase())
                  ? activeStyle
                  : {}
              }
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <Content />
      </div>
    </div>
  );
}

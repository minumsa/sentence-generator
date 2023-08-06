"use client";

import { usePathname, useRouter } from "next/navigation";

import styles from "../music.module.css";
import { activeStyle, contents, filteredPathName } from "../lib/data";
import Content from "../lib/Content";

interface PageProps {
  params: {
    genre: string;
  };
}

export default function Page({ params }: PageProps) {
  // FIXME: Dynamic Routes params 방식으로 바꾸기
  const router = useRouter();
  const pathName = params.genre;

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

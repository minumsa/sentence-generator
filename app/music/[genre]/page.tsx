"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, activeStyle, contents } from "../lib/data";
import Content from "../lib/Content";

export default function Page({ params }: PageProps) {
  // FIXME: Dynamic Routes params 방식으로 바꾸기
  const router = useRouter();
  const pathName = params.genre;
  const fullPathName = usePathname();

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map(category => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/${category}`);
              }}
              style={pathName === category ? activeStyle : {}}
            >
              {contents[category]}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

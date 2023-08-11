"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const pathName = "";
  const fullPathName = usePathname();
  const [showCategory, setShowCategory] = useState<boolean>(false);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <div
          className={styles["mobile-title"]}
          onClick={() => {
            router.push("/music");
          }}
        >
          <div>divdivdiv</div>
        </div>
        <div
          className={styles["hamburger-container"]}
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          <div
            className={styles["hamburger-icon"]}
            style={{ display: showCategory ? "none" : "flex" }}
          ></div>
          <div className={styles["close-icon"]} style={{ display: showCategory ? "flex" : "none" }}>
            <div>×</div>
          </div>
          {showCategory ? (
            <div className={styles["hamburger-category"]}>
              {Object.keys(contents).map((category, index) => {
                if (index > 0)
                  return (
                    <div
                      key={category}
                      className={styles["hamburger-content"]}
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
          ) : null}
        </div>
        <div className={styles["desktop-category"]}>
          {Object.keys(contents).map((category, index) => {
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
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

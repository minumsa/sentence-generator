"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const pathName = "";
  const fullPathName = usePathname();
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobile: boolean = windowWidth < 500;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map((category, index) => {
          return isMobile ? (
            index > 0 ? (
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
            ) : null
          ) : (
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

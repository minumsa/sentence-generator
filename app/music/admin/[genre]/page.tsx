"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../../music.module.css";
import { PageProps, activeStyle, contents } from "../../lib/data";
import Content from "../../lib/Content";
import Upload from "../../Upload";

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const pathName = params.genre;
  const currentPage = Number(pathName);
  const isMainPage = Number(pathName) > 0;
  const fullPathName = usePathname();
  const isUploadPage = pathName === "upload" || pathName.length > 20;

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map(category => {
          const isActiveCategory = pathName === category || (isMainPage && category === "");
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/admin/${category}/1`);
              }}
              style={isActiveCategory ? activeStyle : {}}
            >
              {contents[category]}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        {isUploadPage ? (
          <Upload variablePathName={pathName} />
        ) : (
          <Content
            pathName={isMainPage ? "" : pathName}
            fullPathName={fullPathName}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

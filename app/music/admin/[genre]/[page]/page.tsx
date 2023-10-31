"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../../../music.module.css";
import { PageProps, activeStyle, contents } from "@/app/music/lib/data";
import Upload from "@/app/music/Upload";
import Content from "@/app/music/lib/Content";

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const pathName = params.genre;
  const fullPathName = usePathname();
  const isUploadPage = pathName === "upload" || pathName.length > 20;
  const currentPage = Number(params.page);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map(category => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/admin/${category}/1`);
              }}
              style={pathName === category ? activeStyle : {}}
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
          <Content pathName={pathName} fullPathName={fullPathName} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}

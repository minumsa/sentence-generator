"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../../../music.module.css";
import { PageProps, activeStyle, contents, initialCurrentPage } from "@/app/music/lib/data";
import Upload from "@/app/music/Upload";
import Content from "@/app/music/lib/Content";
import { useAtom } from "jotai";

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const pathName = params.genre;
  const fullPathName = usePathname();
  const isUploadPage = pathName === "upload" || pathName.length > 20;
  const [currentPage, setCurrentPage] = useAtom(initialCurrentPage);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map(category => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                setCurrentPage(1);
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
          <Upload idByPathName={pathName} />
        ) : (
          <Content pathName={pathName} fullPathName={fullPathName} />
        )}
      </div>
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../../music.module.css";
import { activeStyle, contents, filteredPathName } from "../../lib/data";
import Content from "../../lib/Content";
import Upload from "../../Upload";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  let pathName = usePathname();
  const [variablePathName, setVariablePathName] = useState<string>("");

  switch (pathName) {
    case "/music/admin":
      pathName = "admin";
      break;
    default:
      pathName = pathName.split("/music/").join("");
      break;
  }

  useEffect(() => {
    switch (pathName) {
      case "admin":
        setVariablePathName("");
        break;
      default:
        setVariablePathName(pathName.split("admin/").join(""));
        break;
    }
  }, [pathName]);

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
                router.push(`/music/admin/${categoryName}`);
              }}
              style={variablePathName === categoryName ? activeStyle : {}}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        {variablePathName === "upload" || variablePathName.length > 20 ? (
          <Upload variablePathName={variablePathName} />
        ) : (
          <Content pathName={pathName} />
        )}
      </div>
    </div>
  );
}

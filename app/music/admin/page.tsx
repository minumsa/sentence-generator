"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, filteredPathName } from "../lib/data";
import Content from "../lib/Content";

export default function Page() {
  // TODO: [slug]와 all 페이지 파일을 컴포넌트화시켜서 더 코드를 깔끔하게 만들 수 있다.
  const router = useRouter();
  let pathName = usePathname();
  // TODO: 마지막 슬래시 뒤에 있는 단어 가져와서 해당 카테고리의 콘텐츠 보여주는 공통 함수 만들기
  // const genreFromPath = useGenreFromPath();

  switch (pathName) {
    case "/music/admin":
      pathName = "admin";
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
          let newPathName = "";

          if (pathName.split("admin").join("") !== "") {
            newPathName = pathName.split("admin/").join("");
          }

          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/admin/${categoryName}`);
              }}
              style={newPathName === categoryName ? activeStyle : {}}
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

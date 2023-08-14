"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents } from "../lib/data";
import Content from "../lib/Content";

export default function Page() {
  // TODO: [slug]와 all 페이지 파일을 컴포넌트화시켜서 더 코드를 깔끔하게 만들 수 있다.
  // TODO: 마지막 슬래시 뒤에 있는 단어 가져와서 해당 카테고리의 콘텐츠 보여주는 공통 함수 만들기

  const router = useRouter();
  const pathName = "";
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
                router.push(`/music/admin/${category}`);
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

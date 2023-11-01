"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { activeStyle, contents, initialCurrentPage } from "../lib/data";
import Content from "../lib/Content";
import { useAtom } from "jotai";

export default function Page() {
  // TODO: [slug]와 all 페이지 파일을 컴포넌트화시켜서 더 코드를 깔끔하게 만들 수 있다.
  // TODO: 마지막 슬래시 뒤에 있는 단어 가져와서 해당 카테고리의 콘텐츠 보여주는 공통 함수 만들기

  const router = useRouter();
  const pathName = "";
  const fullPathName = usePathname();
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
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

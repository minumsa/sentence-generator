import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { fetchData } from "../modules/api";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { isMobile } from "react-device-detect";

export const Grid = () => {
  const router = useRouter();
  const pathName = "";
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [perPageCount, setDataPerPage] = useState(40);
  const [currentPage, setcurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({
        pathName,
        perPageCount,
        currentPage,
        currentMethod,
        currentCriteria,
      });
      setData(result?.slicedData);
      const dataLength = result?.genreDataLength;
      setTotalPage(Math.max(1, Math.ceil(dataLength / 5)));
    }

    loadData();
  }, [pathName, currentPage, currentMethod, currentCriteria]);

  console.log(data);

  return (
    <>
      <div className={styles["grid-div"]}>
        {data.map((data, index) => {
          // const lastItemInRow = (index + 1) % 7 === 0;
          const firstLineMobile = isMobile && index < 2;
          const evenIndexMobile = isMobile && (index + 1) % 2 == 0;

          return (
            <div
              key={index}
              className={styles["grid-item-container"]}
              style={
                evenIndexMobile && firstLineMobile
                  ? { borderTop: "none", borderRight: "none" }
                  : firstLineMobile
                  ? { borderTop: "none" }
                  : evenIndexMobile
                  ? { borderRight: "none" }
                  : undefined
              }
            >
              <div
                className={styles["grid-album-container"]}
                onClick={() => {
                  router.push(`/music/${data.id}`);
                }}
              >
                <img
                  className={styles["grid-album-image"]}
                  src={data.imgUrl}
                  alt={data.album}
                  loading="lazy"
                />
              </div>
              <div
                className={styles["grid-album-title"]}
                onClick={() => {
                  router.push(`/music/${data.id}`);
                }}
              >{`${data.artist} [${data.album}]`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

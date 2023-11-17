import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { fetchData } from "../modules/api";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import React from "react";
import {
  AlbumInfo,
  CriteriaType,
  MethodType,
  initialCriteria,
  initialMethod,
} from "../modules/data";
import { isMobile } from "react-device-detect";
import { useInView } from "react-intersection-observer";
import { Loading } from "./Loading";

export const Grid = () => {
  const router = useRouter();
  const pathName = "";
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState(isMobile ? 8 : 42);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState<boolean>(false);
  const [currentMethod, setCurrentMethod] = useAtom<MethodType>(initialMethod);
  const [currentCriteria, setCurrentCriteria] = useAtom<CriteriaType>(initialCriteria);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const isLoading = data.length === 0;

  useEffect(() => {
    if (inView) setCurrentPage(prevPage => prevPage + 1);
  }, [inView]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({
        pathName,
        perPageCount,
        currentPage,
        currentMethod,
        currentCriteria,
      });

      if (data.length > 1) {
        setData(prevData => [...prevData, ...result?.slicedData]);
      } else {
        setData(result?.slicedData);
      }

      const dataLength = result?.genreDataLength;
      setTotalPage(Math.max(1, Math.ceil(dataLength / 5)));
    }

    loadData();
  }, [pathName, currentMethod, currentCriteria, currentPage]);

  return (
    <div className={styles["grid-div"]}>
      {isLoading ? (
        <Loading />
      ) : (
        data.map((item, index) => {
          // const lastItemInRow = (index + 1) % 7 === 0;
          const firstLineMobile = isMobile && index < 2;
          const evenIndexMobile = isMobile && (index + 1) % 2 == 0;
          const isLastItem = index + 1 === data.length;

          const mobileStyle = {
            borderTop: firstLineMobile ? "none" : undefined,
            borderRight: evenIndexMobile ? "none" : undefined,
          };
          return (
            <div key={index} className={`${styles["grid-item-container"]}`} style={mobileStyle}>
              <div
                className={`${styles["grid-album-container"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}`}
                ref={isLastItem ? ref : undefined}
                style={{ position: "relative", width: "100%" }}
              >
                <img
                  className={styles["grid-album-image"]}
                  src={item.imgUrl}
                  alt={item.album}
                  loading="lazy"
                  onClick={() => {
                    router.push(`/music/${item.id}`);
                  }}
                />
              </div>
              <div
                className={`${styles["grid-album-title"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}`}
              >
                <span
                  className={styles["black-masking"]}
                  onClick={() => {
                    router.push(`/music/${item.id}`);
                  }}
                >{`${item.artist} [${item.album}]`}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

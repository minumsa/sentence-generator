import { useEffect, useRef, useState } from "react";
import styles from "../music.module.css";
import { fetchData } from "../modules/api";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import React from "react";
import { AlbumInfo, criteriaAtom, defaultTags, methodAtom } from "../modules/data";
import { isMobile } from "react-device-detect";
import { useInView } from "react-intersection-observer";
import "aos/dist/aos.css";
import Aos from "aos";
import { ContentLayout } from "./ContentLayout";
import Link from "next/link";

export const Grid = () => {
  const router = useRouter();
  const fullPathName = usePathname();
  const isAdminPage = fullPathName.includes("admin");
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [totalScrollCount, setTotalScrollCount] = useState<number>(10000);
  const [perPageCount, setPerPageCount] = useState(isMobile ? 40 : 60);
  const [scrollCount, setScrollCount] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showAllTagItems, setShowAllTagItems] = useState<boolean>(false);
  const [currentTagKey, setCurrentTagKey] = useState<string>("");

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (inView) setScrollCount(prevCount => prevCount + 1);
  }, [inView]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({
        pathName: "",
        perPageCount,
        currentPage: scrollCount,
        currentMethod: "별점",
        currentCriteria: criteria,
        currentTagKey: currentTagKey,
      });

      if (scrollCount === 1) {
        setData(result?.slicedData);
        data && setIsLoading(false);
      } else {
        // 페이지가 2 이상이면 기존 데이터 배열에 새로운 데이터 추가
        setData(prevData => [...prevData, ...result?.slicedData]);
        setIsLoading(false);
        setIsScrolling(false);
      }

      const dataLength = result?.genreDataLength;
      setTotalScrollCount(Math.max(1, Math.ceil(dataLength / perPageCount)) + 1);
    }

    if (scrollCount < totalScrollCount) {
      loadData();
      setIsLoading(true);

      if (scrollCount > 1) {
        setIsScrolling(true);
      }
    }
  }, [method, criteria, scrollCount, perPageCount, currentTagKey]);

  const [divWidth, setDivWidth] = useState(0);
  const myDivRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (myDivRef.current) {
        const width = myDivRef.current.offsetWidth;
        setDivWidth(width);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ContentLayout
        currentPage={scrollCount}
        perPageCount={perPageCount}
        totalDataLength={undefined}
        isLoading={isLoading}
        isScrolling={isScrolling}
      >
        {/* <TagDisplay /> */}
        <div
          className={styles["tag-display-container"]}
          style={
            showAllTagItems ? { flexWrap: "wrap", paddingRight: "31px" } : { flexWrap: "nowrap" }
          }
        >
          {Object.keys(defaultTags).map((key, index) => (
            <div
              key={index}
              className={styles["tag-display-item"]}
              onClick={() => {
                setCurrentTagKey(key);
                setScrollCount(1);
              }}
              style={
                currentTagKey === key || (currentTagKey === "" && key === "all")
                  ? { border: "1px solid var(--text-color)" }
                  : undefined
              }
            >
              {defaultTags[key]}
            </div>
          ))}
          <div
            className={styles["arrow-down-container"]}
            onClick={() => {
              setShowAllTagItems(!showAllTagItems);
            }}
          >
            <img
              className={styles["arrow-down"]}
              src={showAllTagItems ? "/music/arrow-up.svg" : "/music/arrow-down.svg"}
              alt="arrow-down"
            />
          </div>
        </div>
        <div className={styles["grid-div"]}>
          {data.map((item, index) => {
            // FIXME: 코드 전체적으로 이런 식으로 정리하기
            const isFirstLine = index < 2;
            const isEvenIndex = (index + 1) % 2 == 0;
            const isLastItem = index + 1 === data.length;
            const postPath = isAdminPage ? `/music/admin/post` : `/music/post`;
            const postHref = `${postPath}/${item.id}`;
            const artistPath = isAdminPage ? "/music/admin/artist" : "/music/artist";
            const artistHref = `${artistPath}/${item.artistId}/1`;

            const mobileStyle = {
              borderTop: isFirstLine ? "none" : undefined,
              borderRight: isEvenIndex ? "none" : undefined,
            };
            return (
              <div
                data-aos="fade-up"
                data-aos-duration={800}
                data-aos-offset={isMobile ? 40 : 90}
                data-aos-once="true"
                key={index}
                className={`${styles["grid-item-container"]}`}
                style={isMobile ? mobileStyle : undefined}
                ref={isLastItem ? ref : undefined}
              >
                <Link
                  href={postHref}
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  <img className={styles["grid-album-image"]} src={item.imgUrl} alt={item.album} />
                </Link>
                <div className={styles["grid-album-title"]}>
                  <Link
                    href={postHref}
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    <button
                      className={`${styles["black-masking"]}  ${styles["grid-album-title-masking"]}`}
                    >
                      {`${item.album}`}
                    </button>
                  </Link>
                  <br />
                  <Link
                    href={artistHref}
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    <button
                      className={`${styles["black-masking"]}  ${styles["grid-album-title-masking"]}`}
                    >
                      {`${item.artist}`}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </ContentLayout>
    </>
  );
};

import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { AlbumFilters, fetchAlbumData } from "../modules/api";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import React from "react";
import {
  AlbumInfo,
  artistPath,
  criteriaAtom,
  defaultTags,
  methodAtom,
  postPath,
} from "../modules/data";
import { isMobile } from "react-device-detect";
import { useInView } from "react-intersection-observer";
import "aos/dist/aos.css";
import Aos from "aos";
import { ContentLayout } from "./ContentLayout";
import Link from "next/link";
import { BlurImg } from "./BlurImage";

export const Grid = () => {
  const pathName = usePathname();
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [totalDataLength, setTotalDataLength] = useState(0);
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

  console.log(data);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (inView) setScrollCount(prevCount => prevCount + 1);
  }, [inView]);

  useEffect(() => {
    const albumFilters: AlbumFilters = {
      perPageCount,
      currentPage: scrollCount,
      currentMethod: "별점",
      currentCriteria: criteria,
      currentTagKey: currentTagKey,
    };

    async function loadData() {
      const albumResult = await fetchAlbumData({
        pathName: "",
        albumFilters,
      });

      if (albumResult) {
        if (scrollCount === 1) {
          const calculateScrollCount =
            Math.max(1, Math.ceil(albumResult.genreDataLength / perPageCount)) + 1;
          setIsLoading(false);
          setData(albumResult.slicedData);
          setTotalDataLength(albumResult.genreDataLength);
          setTotalScrollCount(calculateScrollCount);
        } else {
          // 무한 스크롤 횟수가 2번 이상이면 기존 데이터 배열에 새로운 데이터 추가
          setData(prevData => [...prevData, ...albumResult.slicedData]);
          setIsLoading(false);
          setIsScrolling(false);
        }
      }
    }

    if (scrollCount < totalScrollCount) {
      loadData();
      setIsLoading(true);

      if (scrollCount > 1) {
        setIsScrolling(true);
      }
    }
  }, [method, criteria, scrollCount, perPageCount, currentTagKey, totalScrollCount]);

  return (
    <ContentLayout
      currentPage={scrollCount}
      perPageCount={perPageCount}
      totalDataLength={0}
      isLoading={isLoading}
      isScrolling={isScrolling}
    >
      {/* {isLoading && !isScrolling && <Loading isEmpty={false} />} */}
      {totalDataLength > 0 && (
        <>
          {/* Mobile Tag Display */}
          <div
            className={styles["tag-display-container"]}
            style={
              showAllTagItems ? { flexWrap: "wrap", paddingRight: "31px" } : { flexWrap: "nowrap" }
            }
          >
            {Object.keys(defaultTags).map((key, index) => {
              return (
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
              );
            })}
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
          {/* Grid Items */}
          <div className={styles["grid-div"]}>
            {data.map((item, index) => {
              const currentDataLength = data.length;
              const isLastDataAndOddNumber =
                index === currentDataLength - 1 && currentDataLength % 2 === 1;
              const isLastItem = index + 1 === data.length;
              const imgSrc = item.imgUrl;
              const blurhash = item.blurHash ?? "";

              return isLastDataAndOddNumber ? null : (
                <div
                  data-aos="fade-up"
                  data-aos-duration={800}
                  data-aos-offset={isMobile ? 40 : 90}
                  data-aos-once="true"
                  key={index}
                  className={`${styles["grid-item-container"]}`}
                  ref={isLastItem ? ref : undefined}
                >
                  <Link
                    href={postPath(pathName, item.id)}
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    <BlurImg
                      className={styles["grid-album-image"]}
                      blurhash={blurhash}
                      src={imgSrc}
                      punch={1}
                    />
                    {/* <img
                      className={styles["grid-album-image"]}
                      src={item.imgUrl}
                      alt={item.album}
                    /> */}
                  </Link>
                  <div className={styles["grid-album-title"]}>
                    <Link
                      href={postPath(pathName, item.id)}
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
                      href={artistPath(pathName, item.artistId)}
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
        </>
      )}
    </ContentLayout>
  );
};

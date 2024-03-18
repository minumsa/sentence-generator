import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { AlbumFilters, fetchAlbumData } from "../modules/api";
import { usePathname } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import {
  AlbumInfo,
  artistPath,
  criteriaAtom,
  defaultTags,
  methodAtom,
  postPath,
  scrollCountAtom,
} from "../modules/data";
import { useInView } from "react-intersection-observer";
import "aos/dist/aos.css";
import Aos from "aos";
import { ContentLayout } from "./ContentLayout";
import Link from "next/link";
import { BlurImg } from "./BlurImage";
import { isMobile } from "react-device-detect";

interface GridProps {
  data: AlbumInfo[];
}

export const Grid = ({ data }: GridProps) => {
  const pathName = usePathname();
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [totalScrollCount, setTotalScrollCount] = useState<number>(10000);
  const [perPageCount, setPerPageCount] = useState(40);
  const [scrollCount, setScrollCount] = useAtom(scrollCountAtom);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
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

  return (
    <ContentLayout
      currentPage={scrollCount}
      perPageCount={perPageCount}
      totalDataLength={0}
      isLoading={isLoading}
      isScrolling={isScrolling}
    >
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
              // data-aos-offset={90}
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
    </ContentLayout>
  );
};

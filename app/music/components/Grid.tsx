"use client";

import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { AlbumFilters, fetchAlbumData } from "../modules/api";
import { usePathname } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { useInView } from "react-intersection-observer";
import "aos/dist/aos.css";
import Aos from "aos";
import { ContentLayout } from "./ContentLayout";
import Link from "next/link";
import { BlurImg } from "./BlurImage";
import { isMobile } from "react-device-detect";
import { Loading } from "./Loading";
import { SpinningCircles } from "react-loading-icons";
import { AlbumInfo } from "../modules/types";
import {
  CurrentTagKeyAtom,
  albumDataAtom,
  criteriaAtom,
  currentTotalScrollCountAtom,
  methodAtom,
  scrollCountAtom,
  scrollPositionAtom,
} from "../modules/atoms";

import { toArtistPage, toPostPage } from "../modules/paths";
import { MobileTagDisplay } from "./MobileTagDisplay";

interface GridProps {
  initialData: AlbumInfo[];
  totalScrollCount: number;
}

export const Grid = ({ initialData, totalScrollCount }: GridProps) => {
  const pathName = usePathname();
  const [data, setData] = useAtom(albumDataAtom);
  const [perPageCount, setPerPageCount] = useState(50);
  const [scrollCount, setScrollCount] = useAtom(scrollCountAtom);
  const [scrollPosition, setScrollPosition] = useAtom(scrollPositionAtom);
  const [currentTotalScrollCount, setCurrentTotalScrollCount] = useAtom(
    currentTotalScrollCountAtom
  );

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const [currentTagKey, setCurrentTagKey] = useAtom(CurrentTagKeyAtom);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    Aos.init();
    setCurrentTotalScrollCount(totalScrollCount);
  }, []);

  useEffect(() => {
    if (inView) {
      if (scrollCount <= currentTotalScrollCount) {
        setScrollCount(prevCount => prevCount + 1);
        setIsScrolling(true);
      }
    }
  }, [inView]);

  useEffect(() => {
    async function loadData(perPageCount: number, scrollCount: number) {
      const albumFilters: AlbumFilters = {
        perPageCount: perPageCount,
        currentPage: scrollCount,
        currentMethod: "별점",
        currentCriteria: criteria,
        currentTagKey: currentTagKey,
      };

      const albumResult = await fetchAlbumData({
        pathName: "",
        albumFilters,
      });

      if (albumResult) {
        setData(prevData => [...prevData, ...albumResult.slicedData]);
        setIsScrolling(false);
      }

      if (currentTagKey) {
        const tmp = Math.max(1, Math.ceil(albumResult?.genreDataLength / perPageCount));
        setCurrentTotalScrollCount(tmp);
      }
    }

    // 메인화면으로 진입한 경우
    if (currentTagKey === "" && scrollCount === 1) {
      setData(initialData);
      // 뒤로 가기 시
    } else if (data.length >= 2 && scrollCount > 1 && scrollCount <= currentTotalScrollCount) {
      loadData(perPageCount, scrollCount);
    }

    // 모바일 화면에서 태그 버튼을 클릭하는 경우 태그 데이터 api 호출
    if (currentTagKey.length > 0 && scrollCount === 1) {
      loadData(perPageCount, scrollCount);
    }

    // scrollCount가 한계치에 도달하는 경우, 더 이상 스크롤 이벤트가 발생하지 않도록 처리
    if (scrollCount === currentTotalScrollCount) {
      const unreachableScrollLimit = 10000;
      setScrollCount(unreachableScrollLimit);
    }
  }, [method, criteria, scrollCount, perPageCount, currentTagKey, initialData]);

  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(0);
    }
  }, []);

  return (
    <>
      {/* Mobile Tag Items */}
      <MobileTagDisplay />
      <ContentLayout currentPage={scrollCount} perPageCount={perPageCount} totalDataLength={0}>
        {data.length < 1 && <Loading />}
        {isScrolling && <SpinningCircles className={styles["spinning-circles"]} />}
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
                data-aos-duration={500}
                data-aos-offset={isMobile ? 40 : 90}
                data-aos-once="true"
                key={index}
                className={`${styles["grid-item-container"]}`}
                ref={isLastItem ? ref : undefined}
              >
                <Link
                  href={toPostPage(pathName, item.id)}
                  onClick={() => {
                    setScrollPosition(window.scrollY);
                  }}
                >
                  <BlurImg
                    className={styles["grid-album-image"]}
                    blurhash={blurhash}
                    src={imgSrc}
                    punch={1}
                  />
                </Link>
                <div className={styles["grid-album-title"]}>
                  <Link
                    href={toPostPage(pathName, item.id)}
                    onClick={() => {
                      setScrollPosition(window.scrollY);
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
                    href={toArtistPage(pathName, item.artistId)}
                    onClick={() => {
                      setScrollPosition(window.scrollY);
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

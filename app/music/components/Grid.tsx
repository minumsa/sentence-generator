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
import { PER_PAGE_COUNT } from "../modules/constants";

interface GridProps {
  initialData: AlbumInfo[];
  totalScrollCount: number;
}

const UNREACHABLE_SCROLL_LIMIT = 10000;

export const Grid = ({ initialData, totalScrollCount }: GridProps) => {
  const pathName = usePathname();
  const [data, setData] = useAtom(albumDataAtom);
  const [scrollCount, setScrollCount] = useAtom(scrollCountAtom);
  const [scrollPosition, setScrollPosition] = useAtom(scrollPositionAtom);
  const [newTotalScrollCount, setNewTotalScrollCount] = useAtom(currentTotalScrollCountAtom);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const method = useAtomValue(methodAtom);
  const criteria = useAtomValue(criteriaAtom);
  const currentTagKey = useAtomValue(CurrentTagKeyAtom);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    Aos.init();
    setNewTotalScrollCount(totalScrollCount);
  }, []);

  useEffect(() => {
    const isScrollAtOrBelowLimit = scrollCount <= newTotalScrollCount;
    if (inView) {
      if (isScrollAtOrBelowLimit) {
        setScrollCount(prevCount => prevCount + 1);
        setIsScrolling(true);
      }
    }
  }, [inView]);

  useEffect(() => {
    async function loadData(scrollCount: number) {
      const albumFilters: AlbumFilters = {
        currentPage: scrollCount,
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
        const tmp = Math.max(1, Math.ceil(albumResult?.totalDataLength / PER_PAGE_COUNT));
        setNewTotalScrollCount(tmp);
      }
    }

    // 메인화면으로 진입한 경우
    const isInitialScroll = currentTagKey === "" && scrollCount === 1;
    const scrollDetected =
      data.length >= 1 && scrollCount > 1 && scrollCount <= newTotalScrollCount;
    const tagButtonClicked = currentTagKey.length > 0 && scrollCount === 1;

    if (isInitialScroll) {
      setData(initialData);
      // 데이터가 있는 상태에서 뒤로 가기 시 또는 태그 버튼을 클릭한 경우
    } else if (scrollDetected || tagButtonClicked) {
      loadData(scrollCount);
    }

    // scrollCount가 한계치에 도달하는 경우, 더 이상 스크롤 이벤트가 발생하지 않도록 처리

    const hasReachedScrollLimit = scrollCount === newTotalScrollCount;
    if (hasReachedScrollLimit) {
      setScrollCount(UNREACHABLE_SCROLL_LIMIT);
    }
  }, [method, criteria, scrollCount, PER_PAGE_COUNT, currentTagKey, initialData]);

  function updateScrollPosition() {
    setScrollPosition(window.scrollY);
  }

  useEffect(() => {
    const wasScrolled = scrollPosition > 0;
    function scrollAndReset() {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(0);
    }

    if (wasScrolled) {
      scrollAndReset();
    }
  }, []);

  return (
    <>
      {/* Mobile Tag Items */}
      <MobileTagDisplay />
      <ContentLayout currentPage={scrollCount} totalDataLength={0}>
        {data.length < 1 && <Loading />}
        {isScrolling && <SpinningCircles className={styles["spinning-circles"]} />}
        {/* Grid Items */}
        <div className={styles["grid-div"]}>
          {data.map((item, index) => {
            const currentDataLength = data.length;
            const isLastDataAndOddNumber =
              index === currentDataLength - 1 && currentDataLength % 2 === 1;
            const isLastItem = index + 2 === data.length;
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
                <Link href={toPostPage(pathName, item.id)} onClick={updateScrollPosition}>
                  <BlurImg
                    className={styles["grid-album-image"]}
                    blurhash={blurhash}
                    src={imgSrc}
                    punch={1}
                  />
                </Link>
                <div className={styles["grid-album-title"]}>
                  <Link href={toPostPage(pathName, item.id)} onClick={updateScrollPosition}>
                    <button
                      className={`${styles["black-masking"]}  ${styles["grid-album-title-masking"]}`}
                    >
                      {`${item.album}`}
                    </button>
                  </Link>
                  <br />
                  <Link href={toArtistPage(pathName, item.artistId)} onClick={updateScrollPosition}>
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

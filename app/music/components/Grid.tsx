import { useEffect, useRef, useState } from "react";
import styles from "../music.module.css";
import { fetchData } from "../modules/api";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import React from "react";
import { AlbumInfo, criteriaAtom, methodAtom } from "../modules/data";
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
  }, [method, criteria, scrollCount, perPageCount]);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const [divWidth, setDivWidth] = useState(0);
  const myDivRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      // 특정 div의 너비를 가져오기 위한 작업
      if (myDivRef.current) {
        const width = myDivRef.current.offsetWidth;
        setDivWidth(width);
        console.log(divWidth);
      }
    };

    handleResize(); // 초기 렌더링 시 한 번 호출하여 너비를 설정합니다.

    // 컴포넌트가 마운트될 때와 창 크기가 변경될 때마다 resize 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 resize 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // myDivRef.current.offsetWidth
  }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <>
      <ContentLayout
        currentPage={scrollCount}
        perPageCount={perPageCount}
        totalDataLength={undefined}
        isLoading={isLoading}
        isScrolling={isScrolling}
      >
        <div className={styles["grid-div"]}>
          {data.map((item, index) => {
            // FIXME: 코드 전체적으로 이런 식으로 정리하기
            const isFirstLine = index < 2;
            const isEvenIndex = (index + 1) % 2 == 0;
            const isLastItem = index + 1 === data.length;

            const mobileStyle = {
              borderTop: isFirstLine ? "none" : undefined,
              borderRight: isEvenIndex ? "none" : undefined,
            };
            return (
              <div
                data-aos="fade-up"
                data-aos-duration={800}
                // data-aos-easing="linear"
                data-aos-offset={isMobile ? 50 : 90}
                data-aos-once="true"
                key={index}
                className={`${styles["grid-item-container"]}`}
                style={isMobile ? mobileStyle : undefined}
                ref={isLastItem ? ref : undefined}
              >
                <div
                  className={styles["grid-album-container"]}
                  style={{ position: "relative", width: "100%" }}
                  // onClick={() => {
                  //   setIsLoading(true);
                  //   isAdminPage
                  //     ? router.push(`/music/admin/post/${item.id}`)
                  //     : router.push(`/music/post/${item.id}`);
                  // }}
                >
                  <Link
                    href={isAdminPage ? `/music/admin/post/${item.id}` : `/music/post/${item.id}`}
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    <div
                      className={styles["grid-album-image"]}
                      style={
                        imageLoaded
                          ? { backgroundImage: `url(${item.imgUrl})`, backgroundSize: "cover" }
                          : undefined
                      }
                    />
                    <img
                      src={item.imgUrl}
                      alt={item.album}
                      style={{ display: "none" }}
                      onLoad={handleImageLoad}
                    />
                  </Link>
                </div>
                <div
                  className={styles["grid-album-title"]}
                  // onClick={() => {
                  //   setIsLoading(true);
                  //   isAdminPage
                  //     ? router.push(`/music/admin/post/${item.id}`)
                  //     : router.push(`/music/post/${item.id}`);
                  // }}
                >
                  <div>
                    <Link
                      href={isAdminPage ? `/music/admin/post/${item.id}` : `/music/post/${item.id}`}
                      onClick={() => {
                        setIsLoading(true);
                      }}
                      style={{ textDecoration: "none", cursor: "unset" }}
                    >
                      <span
                        className={`${styles["black-masking"]}  ${styles["grid-album-title-masking"]}`}
                        // style={{ fontWeight: "500" }}
                      >
                        {`${item.album}`}
                      </span>
                    </Link>
                    <br />
                    <Link
                      href={
                        isAdminPage
                          ? `/music/admin/artist/${item.artistId}/1`
                          : `/music/artist/${item.artistId}/1`
                      }
                      onClick={() => {
                        setIsLoading(true);
                      }}
                      style={{ textDecoration: "none", cursor: "unset" }}
                    >
                      <span
                        className={`${styles["black-masking"]}  ${styles["grid-album-title-masking"]}`}
                        // style={{ color: "#a7a7a7" }}
                      >
                        {`${item.artist}`}
                        {/* 관리자 페이지일 때만 표시할 부분 */}
                        {isAdminPage && ` … ${item.score}`}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ContentLayout>
    </>
  );
};

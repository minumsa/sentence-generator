import { useRouter } from "next/navigation";
import { formatDate, formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { deleteData } from "../modules/api";
import { Loading } from "./Loading";
import { isMobile } from "react-device-detect";
import { useRef, useState } from "react";

interface AlbumProps {
  data: AlbumInfo;
  dataIndex: number;
  perPageCount: number;
  isAdminMainPage: boolean;
  isPostPage: boolean;
}

export const Album = ({
  data,
  dataIndex,
  perPageCount,
  isAdminMainPage,
  isPostPage,
}: AlbumProps) => {
  const router = useRouter();
  const albumDuration = formatDuration(data.duration);
  const isEmptyData = data.id === "";
  const totalParagraph = data.text.split("\n").length;
  const divRef = useRef<HTMLDivElement>(null);

  // 텍스트 줄 수를 업데이트하는 함수
  // const updateNumberOfLines = () => {
  //   if (divRef.current) {
  //     const lineHeight = parseFloat(window.getComputedStyle(divRef.current).lineHeight);
  //     const height = divRef.current.clientHeight;
  //     const lines = Math.floor(height / lineHeight);
  //     setNumberOfLines(lines);
  //   }
  // };

  // useEffect(() => {
  //   updateNumberOfLines();
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", updateNumberOfLines);
  //   return () => {
  //     window.removeEventListener("resize", updateNumberOfLines);
  //   };
  // }, []);

  // HTML을 string 형태로 바꾸기 위한 부분
  // const HTMLtest = () => {
  //   return (
  //     <div>
  //       <p className={styles["paragraph"]}>
  //         악뮤 이찬혁의 독창적이고 감각적인 음악 세계를 담은 첫 솔로 앨범. 지금 공간 음향으로
  //         만나세요.
  //       </p>
  //       <div style={{ width: "100%", marginTop: "2rem" }}>
  //         <img
  //           src="https://www.jeonmae.co.kr/news/photo/202210/917522_608251_352.jpg"
  //           alt="akmu"
  //           loading="lazy"
  //           style={{ width: "100%" }}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  // console.log(renderToString(<HTMLtest />));

  return isEmptyData ? (
    <Loading />
  ) : (
    <div className={styles["album-container"]}>
      <div className={styles["album-information-container"]}>
        <div>
          <a className={styles["link"]} href={data.link} target="_blank">
            <img
              className={styles["album-art"]}
              src={data.imgUrl}
              alt={data.album}
              loading="lazy"
            />
          </a>
        </div>
        {isPostPage ? (
          <div className={styles["album-metadata"]}>
            <div className={styles["post-date"]} style={{ marginBottom: 0 }}>
              아티스트
            </div>
            <div
              onClick={() => {
                router.push(`/music/artist/${data.artistId}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <span className={styles["black-masking"]}>{data.artist}</span>
            </div>
            <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
              앨범
            </div>
            <div
              onClick={() => {
                router.push(`/music/${data.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <span className={styles["black-masking"]}>{data.album}</span>
            </div>
            <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
              레이블
            </div>
            <div>
              <span className={styles["black-masking"]}>{data.label}</span>
            </div>
            <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
              러닝타임
            </div>
            <div>
              <span className={styles["black-masking"]}>
                {albumDuration}, {data.tracks}곡
              </span>
            </div>
          </div>
        ) : undefined}
        {/* <div className={`${styles["album-information"]}`}>
          <div>
            <div className={styles["information"]}>
              <div style={{ marginRight: "5px" }}>{data.artist}</div>
            </div>
            <div className={styles["information"]}>
              <a className={styles["link"]} href={data.link} target="_blank">
                <div className={styles["album-title"]}>{data.album}</div>
              </a>
            </div>
          </div>
          <div className={styles["information"]}>
            <span>{`${data.releaseDate.slice(0, 4)}년 ${Number(data.releaseDate.slice(5, 7))}월, ${
              data.label
            }`}</span>
          </div>
          <div className={styles["information"]}>{`${data.tracks}곡, ${albumDuration}`}</div>
          {isAdminMainPage && (
            <div className={styles["admin-button-container"]}>
              <div
                className={styles["admin-button"]}
                onClick={async () => {
                  deleteData(data.id);
                }}
              >
                삭제
              </div>
              <div
                className={styles["admin-button"]}
                onClick={() => {
                  router.push(`/music/admin/${data.id}`);
                }}
              >
                수정
              </div>
            </div>
          )}
        </div> */}
      </div>
      <div
        style={{ display: "flex", width: "100%", alignItems: isPostPage ? undefined : "center" }}
      >
        <div className={styles["text-container"]}>
          {/* FIXME: 안전하게 바꾸기 */}
          {isPostPage && data.text.includes("div") && (
            <div
              style={{ width: "100%" }}
              dangerouslySetInnerHTML={{
                __html: data.text,
              }}
            />
          )}
          {data.text.split("\n").map((text, index) => {
            const hasNoText = text.length < 1;
            const isVeryShortText = text.length < 90;
            const isShortText = text.length < 130;
            const longTextStandard = isMobile ? 130 : 200;
            const isLongText = text.length > longTextStandard;
            const isFirstParagraph = index === 0;
            const isBlankText = text === "";
            const isParagraphTitle = text.length < 40;
            const isHTMLText = text.includes("<div>");
            const findFirstParagraphInHTML = text.match(
              /<p class="music_paragraph__z0WKJ">(.*?)<\/p>/
            );

            // 포스트 페이지일 때 표시할 부분
            if (isPostPage) {
              return isBlankText ? (
                <p></p>
              ) : !isHTMLText ? (
                <p
                  className={styles["paragraph"]}
                  style={isParagraphTitle ? { fontWeight: 600, marginBottom: "10px" } : undefined}
                >
                  {text}
                </p>
              ) : undefined;
            } else {
              // 카테고리 페이지일 때 표시할 부분
              // 첫 번째 문단만 표시
              if (isFirstParagraph)
                return (
                  <>
                    <div
                      className={styles["paragraph-container"]}
                      key={index}
                      style={
                        !isPostPage && !isMobile
                          ? isVeryShortText
                            ? { marginBottom: "50px" }
                            : isShortText
                            ? { marginBottom: "25px" }
                            : undefined
                          : undefined
                      }
                    >
                      <div className={styles["category-meta-title"]}>{data.album}</div>
                      <div className={styles["category-meta"]}>
                        <div className={styles["category-meta-image-container"]}>
                          <img
                            src={data.artistImgUrl}
                            alt="test"
                            className={styles["category-meta-image"]}
                            loading="lazy"
                            onClick={() => {
                              router.push(`/music/artist/${data.artistId}`);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <span
                            onClick={() => {
                              router.push(`/music/artist/${data.artistId}`);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {data.artist}
                          </span>
                          {` • ${data.releaseDate.slice(0, 4)} • ${
                            data.tracks
                          }곡, ${albumDuration}`}
                        </div>
                      </div>
                      <p
                        ref={divRef}
                        className={`${styles["paragraph"]} ${styles["paragraph-category"]}
                    ${isLongText ? styles["blur-end"] : undefined} 
                    ${hasNoText ? styles["paragraph-blank"] : undefined}`}
                      >
                        {findFirstParagraphInHTML ? findFirstParagraphInHTML[1] : text}
                      </p>
                      {isLongText && (
                        <span
                          className={styles["more-button"]}
                          onClick={() => {
                            router.push(`/music/${data.id}`);
                          }}
                        >
                          더 보기
                        </span>
                      )}
                    </div>
                    {isAdminMainPage && (
                      <div className={styles["admin-button-container"]}>
                        <div
                          className={styles["admin-button"]}
                          onClick={async () => {
                            deleteData(data.id);
                          }}
                        >
                          삭제
                        </div>
                        <div
                          className={styles["admin-button"]}
                          onClick={() => {
                            router.push(`/music/admin/${data.id}`);
                          }}
                        >
                          수정
                        </div>
                      </div>
                    )}
                  </>
                );
            }
          })}
          {isPostPage && (
            <>
              <div className={styles["paragraph-division-line"]}></div>
              <div className={styles["post-date"]} style={{ marginBottom: "10px" }}>
                작성일
              </div>
              <div>{formatDate(data.uploadDate)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

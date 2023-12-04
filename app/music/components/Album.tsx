import { usePathname, useRouter } from "next/navigation";
import { formatDate, formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo, isAdminPage } from "../modules/data";
import { deleteData } from "../modules/api";
import { Loading } from "./Loading";
import { isMobile } from "react-device-detect";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import DOMPurify from "isomorphic-dompurify";

interface AlbumProps {
  data: AlbumInfo;
  isAdminMainPage: boolean;
  isPostPage: boolean;
}

export const Album = ({ data, isAdminMainPage, isPostPage }: AlbumProps) => {
  const router = useRouter();
  const albumDuration = formatDuration(data.duration);
  const isLoading = data.id === "";
  const divRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const sanitizer = DOMPurify.sanitize;

  // HTML을 string 형태로 바꾸기 위한 부분
  const HTMLToString = (htmlData: any) => {
    return (
      // <div>
      //   <p className={styles["paragraph"]}>
      //     악뮤 이찬혁의 독창적이고 감각적인 음악 세계를 담은 첫 솔로 앨범. 지금 공간 음향으로
      //     만나세요.
      //   </p>
      //   <div style={{ width: "100%", marginTop: "2rem" }}>
      //     <img
      //       src="https://www.jeonmae.co.kr/news/photo/202210/917522_608251_352.jpg"
      //       alt="akmu"
      //       loading="lazy"
      //       style={{ width: "100%" }}
      //     />
      //   </div>
      // </div>
      renderToString(htmlData)
    );
  };

  return isLoading ? (
    <Loading dataLength={undefined} />
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
            <div className={styles["post-date"]}>아티스트</div>
            <div
              onClick={() => {
                router.push(`/music/artist/${data.artistId}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <span className={styles["black-masking"]}>{data.artist}</span>
            </div>
            <div className={styles["post-date"]}>앨범</div>
            <div>
              <span className={styles["black-masking"]}>{data.album}</span>
            </div>
            <div className={styles["post-date"]}>레이블</div>
            <div>
              <span className={styles["black-masking"]}>{data.label}</span>
            </div>
            <div className={styles["post-date"]}>러닝타임</div>
            <div>
              <span className={styles["black-masking"]}>
                {albumDuration}, {data.tracks}곡
              </span>
            </div>
          </div>
        ) : undefined}
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
                __html: sanitizer(data.text),
              }}
            />
          )}
          {data.text.split("\n").map((text, index) => {
            const longTextStandard = isMobile ? 100 : 180;
            const isFirstParagraph = index === 0;
            const isLineBreak = text === "";
            const isParagraphTitle = text.length < 40;
            const isHTMLText = text.includes("<div>");
            const isFirstParagraphInHTML = text.match(
              /<p class="music_paragraph__z0WKJ">(.*?)<\/p>/
            );
            const isLongText = isFirstParagraphInHTML
              ? isFirstParagraphInHTML[1].length > longTextStandard
              : text.length > longTextStandard;

            // 포스트 페이지일 때 표시할 앨범 텍스트
            if (isPostPage) {
              return isLineBreak ? (
                <p></p>
              ) : isHTMLText ? undefined : (
                <p
                  className={styles["paragraph"]}
                  style={isParagraphTitle ? { fontWeight: 600, marginBottom: "10px" } : undefined}
                >
                  {text}
                </p>
              );
            } else {
              // 카테고리 페이지일 때 표시할 앨범 메타데이터
              // 전체 텍스트 첫 번째 문단의 3줄까지만 미리보기로 표시
              if (isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : isFirstParagraph)
                return (
                  <>
                    <div className={styles["paragraph-container"]} key={index}>
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
                          <span>
                            {` • ${data.releaseDate.slice(0, 4)} • ${
                              data.tracks
                            }곡, ${albumDuration}`}
                          </span>
                        </div>
                      </div>
                      <p
                        ref={divRef}
                        className={`${styles["paragraph"]} ${styles["paragraph-category"]} ${
                          isLongText ? styles["blur-end"] : undefined
                        }`}
                      >
                        {isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : text}
                      </p>
                      {isLongText && (
                        <span
                          className={styles["more-button"]}
                          onClick={() => {
                            isAdminPage(pathName)
                              ? router.push(`/music/admin/post/${data.id}`)
                              : router.push(`/music/post/${data.id}`);
                          }}
                        >
                          더 보기
                        </span>
                      )}
                    </div>
                    {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
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
          {/* 포스트 페이지일 때 표시할 앨범 메타데이터 */}
          {isPostPage && (
            <>
              <div className={styles["paragraph-division-line"]}></div>
              <div className={styles["post-date"]} style={{ marginBottom: "10px" }}>
                작성일
              </div>
              <div>{formatDate(data.uploadDate.toString())}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

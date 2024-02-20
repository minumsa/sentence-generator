import { usePathname } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { isMobile } from "react-device-detect";
import { useRef } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import Link from "next/link";

interface AlbumProps {
  data: AlbumInfo;
}

export const Album = ({ data }: AlbumProps) => {
  const albumDuration = formatDuration(data.duration);
  const divRef = useRef<HTMLDivElement>(null);
  const fullPathName = usePathname();
  const isAdminPage = fullPathName.includes("admin");

  return (
    <>
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
        </div>
        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div className={styles["album-metadata-container"]}>
            {/* FIXME: 안전하게 바꾸기 */}
            {data.text.split("\n").map((text, index) => {
              const longTextStandard = isMobile ? 100 : 180;
              const isFirstParagraph = index === 0;
              const isFirstParagraphInHTML = text.match(
                /<p class="music_paragraph__z0WKJ">(.*?)<\/p>/
              );
              const isLongText = isFirstParagraphInHTML
                ? isFirstParagraphInHTML[1].length > longTextStandard
                : data.text.length > longTextStandard;

              // 카테고리 페이지일 때 표시할 앨범 메타데이터
              // 전체 텍스트 첫 번째 문단의 3줄까지만 미리보기로 표시
              if (isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : isFirstParagraph)
                return (
                  <div key={index}>
                    <div className={styles["paragraph-container"]}>
                      <div
                        style={
                          isMobile
                            ? undefined
                            : { display: "flex", alignItems: "center", paddingBottom: "10px" }
                        }
                      >
                        <Link
                          href={
                            isAdminPage ? `/music/admin/post/${data.id}` : `/music/post/${data.id}`
                          }
                          style={{ textDecoration: "none" }}
                          // onClick={() => {
                          //   isAdminPage
                          //     ? router.push(`/music/admin/post/${data.id}`)
                          //     : router.push(`/music/post/${data.id}`);
                          // }}
                        >
                          <div
                            className={styles["category-meta-title"]}
                            style={{ padding: isAdminPage ? 0 : undefined }}
                          >
                            {data.album}
                          </div>
                        </Link>
                        {isAdminPage && (
                          <div className={styles["upload-item-title"]}>
                            <div className={styles["star-container"]}>
                              <img
                                className={styles["star-color"]}
                                src="/cinephile/star-color.webp"
                                alt="star-color"
                                style={
                                  data.score
                                    ? {
                                        clipPath: `inset(0 ${100 - data.score * 20}% 0 0)`,
                                      }
                                    : undefined
                                }
                                loading="lazy"
                              />
                              <img
                                className={styles["star-mono"]}
                                src="/cinephile/star-mono.webp"
                                alt="star-mono"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles["category-meta"]}>
                        <Link
                          className={styles["category-meta-image-container"]}
                          href={
                            isAdminPage
                              ? `/music/admin/artist/${data.artistId}/1`
                              : `/music/artist/${data.artistId}/1`
                          }
                        >
                          <img
                            src={data.artistImgUrl}
                            alt="test"
                            className={styles["category-meta-image"]}
                            loading="lazy"
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/artist/${data.artistId}/1`)
                            //     : router.push(`/music/artist/${data.artistId}/1`);
                            // }}
                          />
                        </Link>
                        <div>
                          <Link
                            style={{ textDecoration: "none", color: "#cfcfcf" }}
                            href={
                              isAdminPage
                                ? `/music/admin/artist/${data.artistId}/1`
                                : `/music/artist/${data.artistId}/1`
                            }
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/artist/${data.artistId}/1`)
                            //     : router.push(`/music/artist/${data.artistId}/1`);
                            // }}
                          >
                            {data.artist}
                          </Link>
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
                        <Link
                          style={{ textDecoration: "none" }}
                          href={
                            isAdminPage ? `/music/admin/post/${data.id}` : `/music/post/${data.id}`
                          }
                        >
                          <div
                            className={styles["more-button"]}
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/post/${data.id}`)
                            //     : router.push(`/music/post/${data.id}`);
                            // }}
                          >
                            더 보기
                          </div>
                        </Link>
                      )}
                    </div>
                    {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
                    {isAdminPage && (
                      <div className={styles["admin-button-container"]}>
                        <DeleteButton data={data} />
                        <EditButton data={data} />
                      </div>
                    )}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

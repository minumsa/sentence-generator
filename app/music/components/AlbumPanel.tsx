import { usePathname } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo, album } from "../modules/data";
import { isMobile } from "react-device-detect";
import { useRef } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import Link from "next/link";

interface AlbumProps {
  albumData: AlbumInfo;
}

export const AlbumPanel = ({ albumData }: AlbumProps) => {
  const albumDuration = formatDuration(albumData.duration);
  const divRef = useRef<HTMLDivElement>(null);
  const fullPathName = usePathname();
  const isAdminPage = fullPathName.includes("admin");

  console.log(albumData);

  return (
    <>
      <Link
        className={styles["album-information-container"]}
        style={{ textDecoration: "none" }}
        href={isAdminPage ? `/music/admin/post/${albumData.id}` : `/music/post/${albumData.id}`}
      >
        <img
          className={styles["album-art"]}
          src={albumData.imgUrl}
          alt={albumData.album}
          loading="lazy"
        />
      </Link>
      <div className={styles["album-panel-metadata-container"]}>
        {/* FIXME: 안전하게 바꾸기 */}
        {albumData.text.split("\n").map((text, index) => {
          const longTextStandard = isMobile ? 100 : 180;
          const isFirstParagraph = index === 0;
          const isFirstParagraphInHTML = text.match(/<p class="music_paragraph__z0WKJ">(.*?)<\/p>/);
          const isLongText = isFirstParagraphInHTML
            ? isFirstParagraphInHTML[1].length > longTextStandard
            : albumData.text.length > longTextStandard;

          if (isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : isFirstParagraph)
            return (
              <div key={index} className={styles["paragraph-container"]}>
                <div className={styles["post-album-title"]}>
                  <Link
                    href={
                      isAdminPage
                        ? `/music/admin/post/${albumData.id}`
                        : `/music/post/${albumData.id}`
                    }
                    style={{ textDecoration: "none", display: "flex" }}
                  >
                    <h2 style={{ padding: isAdminPage ? 0 : undefined }}>{albumData.album}</h2>
                  </Link>
                  <div className={styles["star-container"]}>
                    <img
                      className={styles["star-color"]}
                      src="/cinephile/star-color.webp"
                      alt="star-color"
                      style={
                        albumData.score
                          ? {
                              clipPath: `inset(0 ${100 - albumData.score * 20}% 0 0)`,
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
                <div className={styles["category-meta"]}>
                  <Link
                    className={styles["category-meta-image-container"]}
                    href={
                      isAdminPage
                        ? `/music/admin/artist/${albumData.artistId}/1`
                        : `/music/artist/${albumData.artistId}/1`
                    }
                  >
                    <img
                      src={albumData.artistImgUrl}
                      alt="test"
                      className={styles["category-meta-image"]}
                      loading="lazy"
                    />
                  </Link>
                  <div>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={
                        isAdminPage
                          ? `/music/admin/artist/${albumData.artistId}/1`
                          : `/music/artist/${albumData.artistId}/1`
                      }
                    >
                      {albumData.artist}
                    </Link>
                    <span>
                      {` • ${albumData.releaseDate.slice(0, 4)} • ${
                        albumData.tracks
                      }곡, ${albumDuration}`}
                    </span>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
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
                        isAdminPage
                          ? `/music/admin/post/${albumData.id}`
                          : `/music/post/${albumData.id}`
                      }
                    >
                      <div className={styles["more-button"]}>더 보기</div>
                    </Link>
                  )}
                </div>
                <div className={styles["album-tag-container"]}>
                  {albumData.tagNames.map((tagName: string, index: number) => {
                    return (
                      <div key={index} className={styles["tag-item"]}>
                        {tagName}
                      </div>
                    );
                  })}
                </div>
                {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
                {isAdminPage && (
                  <div className={styles["admin-button-container"]}>
                    <EditButton data={albumData} />
                    <DeleteButton data={albumData} />
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </>
  );
};

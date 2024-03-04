import { usePathname } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo, defaultTags, isAdminPage } from "../modules/data";
import { isMobile } from "react-device-detect";
import { useRef } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import Link from "next/link";

interface AlbumProps {
  albumData: AlbumInfo;
}

export const AlbumPanel = ({ albumData }: AlbumProps) => {
  const pathName = usePathname();
  const albumDuration = formatDuration(albumData.duration);
  const divRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const isAdmin = isAdminPage(pathName);
  const adminPostPath = isAdmin
    ? `/music/admin/post/${albumData.id}`
    : `/music/post/${albumData.id}`;
  const adminArtistPath = isAdmin
    ? `/music/admin/artist/${albumData.artistId}/1`
    : `/music/artist/${albumData.artistId}/1`;
  const adminTagPath = (tagKey: string) =>
    isAdmin ? `/music/admin/search/tag/${tagKey}/1` : `/music/search/tag/${tagKey}/1`;

  return (
    <>
      <Link className={styles["album-information-container"]} href={adminPostPath}>
=======

  return (
    <>
      <Link
        className={styles["album-information-container"]}
        href={
          isAdminPage(pathName)
            ? `/music/admin/post/${albumData.id}`
            : `/music/post/${albumData.id}`
        }
      >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
        <img
          className={styles["album-art"]}
          src={albumData.imgUrl}
          alt={albumData.album}
          loading="lazy"
        />
      </Link>
      <div className={styles["album-panel-metadata-container"]}>
        {albumData.text.split("\n").map((text, index) => {
          const longTextStandard = isMobile ? 100 : 180;
          const isFirstParagraph = index === 0;
          const isLongText = albumData.text.length > longTextStandard;
          if (isFirstParagraph)
            return (
              <div key={index} className={styles["paragraph-container"]}>
                {/* 앨범 타이틀 */}
                <div className={styles["post-album-title"]}>
<<<<<<< HEAD
                  <Link href={adminPostPath} style={{ textDecoration: "none", display: "flex" }}>
=======
                  <Link
                    href={
                      isAdminPage(pathName)
                        ? `/music/admin/post/${albumData.id}`
                        : `/music/post/${albumData.id}`
                    }
                    style={{ textDecoration: "none", display: "flex" }}
                  >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                    <h2 style={{ padding: isAdminPage(pathName) ? 0 : undefined }}>
                      {albumData.album}
                    </h2>
                  </Link>
                  {/* 별점 */}
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
<<<<<<< HEAD
                  {/* 아티스트 이미지 */}
                  <Link className={styles["category-meta-image-container"]} href={adminArtistPath}>
=======
                  <Link
                    className={styles["category-meta-image-container"]}
                    href={
                      isAdminPage(pathName)
                        ? `/music/admin/artist/${albumData.artistId}/1`
                        : `/music/artist/${albumData.artistId}/1`
                    }
                  >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                    <img
                      src={albumData.artistImgUrl}
                      alt="test"
                      className={styles["category-meta-image"]}
                      loading="lazy"
                    />
                  </Link>
                  <div>
<<<<<<< HEAD
                    {/* 아티스트 이름 */}
                    <Link style={{ textDecoration: "none" }} href={adminArtistPath}>
=======
                    <Link
                      style={{ textDecoration: "none" }}
                      href={
                        isAdminPage(pathName)
                          ? `/music/admin/artist/${albumData.artistId}/1`
                          : `/music/artist/${albumData.artistId}/1`
                      }
                    >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                      {albumData.artist}
                    </Link>
                    {/* 발매일, 트랙 개수, 러닝타임 */}
                    <span>
                      {` • ${albumData.releaseDate.slice(0, 4)} • ${
                        albumData.tracks
                      }곡, ${albumDuration}`}
                    </span>
                  </div>
                </div>
                {/* 텍스트 미리보기 및 더 보기 링크 */}
                <div style={{ position: "relative" }}>
                  <p
                    ref={divRef}
                    className={`${styles["paragraph"]} ${styles["paragraph-category"]} ${
                      isLongText ? styles["blur-end"] : undefined
                    }`}
                  >
                    {text}
                  </p>
                  {isLongText && (
<<<<<<< HEAD
                    <Link style={{ textDecoration: "none" }} href={adminPostPath}>
=======
                    <Link
                      style={{ textDecoration: "none" }}
                      href={
                        isAdminPage(pathName)
                          ? `/music/admin/post/${albumData.id}`
                          : `/music/post/${albumData.id}`
                      }
                    >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                      <div className={styles["more-button"]}>더 보기</div>
                    </Link>
                  )}
                </div>
                {/* 앨범 태그 */}
                <div className={styles["album-tag-container"]}>
                  {albumData.tagKeys.map((tagKey: string, index: number) => {
                    return (
<<<<<<< HEAD
                      <Link href={adminTagPath(tagKey)} key={index} className={styles["tag-item"]}>
=======
                      <Link
                        href={
                          isAdminPage(pathName)
                            ? `/music/admin/search/tag/${tagKey}/1`
                            : `/music/search/tag/${tagKey}/1`
                        }
                        key={index}
                        className={styles["tag-item"]}
                      >
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                        {defaultTags[tagKey]}
                      </Link>
                    );
                  })}
                </div>
<<<<<<< HEAD
                {/* 관리자 페이지 - 수정 및 삭제 버튼 */}
=======
                {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
                {isAdminPage(pathName) && (
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

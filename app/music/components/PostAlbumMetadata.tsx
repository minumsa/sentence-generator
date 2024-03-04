import { usePathname } from "next/navigation";
import { AlbumInfo, isAdminPage } from "../modules/data";
import styles from "../music.module.css";
import { formatDuration } from "../modules/utils";
import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { LinkIcon } from "./LinkIcon";
import Link from "next/link";

interface PostAlbumMetadataProps {
  albumData: AlbumInfo;
}

export const PostAlbumMetadata = ({ albumData }: PostAlbumMetadataProps) => {
  const albumDuration = formatDuration(albumData.duration);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathName = usePathname();
  const hasVideo = albumData.videos[0]?.title.length > 0;
  const releaseDate = albumData.releaseDate;
  const dateObj = new Date(releaseDate);
  const formattedDate =
    dateObj.getFullYear() + "년 " + (dateObj.getMonth() + 1) + "월 " + dateObj.getDate() + "일";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <header className={styles["album-information-container"]}>
      {/* 이미지 관련 코드 */}
      <div className={styles["grid-album-image-container"]}>
        <a href={albumData.link} target="_blank">
          <div
            className={`${styles["grid-album-image"]} ${styles["post-album-image"]}`}
            style={
              imageLoaded
                ? {
                    backgroundImage: `url(${albumData.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundColor: "undefined",
                  }
                : undefined
            }
          />
          <img
            src={albumData.imgUrl}
            alt={albumData.album}
            style={{ display: "none" }}
            onLoad={handleImageLoad}
          />
        </a>
      </div>

      <div className={styles["album-metadata"]}>
        {/* 아티스트 정보 */}
        <div className={styles["post-date"]}>아티스트</div>
        <Link
          href={
            isAdminPage(pathName)
              ? `/music/admin/artist/${albumData.artistId}/1`
              : `/music/artist/${albumData.artistId}/1`
          }
          style={{ textDecoration: "none" }}
        >
          <span className={styles["black-masking"]} style={{ cursor: "pointer" }}>
            {albumData.artist}
          </span>
        </Link>
        <LinkIcon />

        {/* 앨범 정보 */}
        <div className={styles["post-date"]}>앨범</div>
        <div>
          <span className={styles["black-masking"]}>{albumData.album}</span>
        </div>

        {/* 레이블 정보 */}
        <div className={styles["post-label"]}>
          <div className={styles["post-date"]}>레이블</div>
          <div>
            <span className={styles["black-masking"]}>{albumData.label}</span>
          </div>
        </div>

        {/* 발매일 정보 */}
        <div className={styles["post-date"]}>발매일</div>
        <div>
          <span className={styles["black-masking"]}>{formattedDate}</span>
        </div>

        {/* 러닝타임 정보 */}
        <div className={styles["post-date"]}>러닝타임</div>
        <div>
          <span className={styles["black-masking"]}>
            {albumDuration}, {albumData.tracks}곡
          </span>
        </div>

        {/* 비디오 정보 */}
        {hasVideo && (
          <>
            <div className={styles["post-date"]}>비디오</div>
            {albumData.videos.map(videoData => {
              return (
                <div key={videoData.title}>
                  <a href={videoData.url} target="_blank" style={{ textDecoration: "none" }}>
                    <span className={styles["black-masking"]} style={{ cursor: "pointer" }}>
                      {videoData.title}
                    </span>
                  </a>
                  <LinkIcon />
                </div>
              );
            })}
          </>
        )}

        {/* 스트리밍 정보 */}
        <div className={styles["post-date"]}>스트리밍</div>
        <div style={{ height: "30px" }}>
          <a href={albumData.link} target="_blank">
            <img src="/music/apple.svg" alt="link-icon" className={styles["apple-icon"]}></img>
          </a>
          <a href={`https://open.spotify.com/album/${albumData.id}`} target="_blank">
            <img src="/music/spotify.svg" alt="link-icon" className={styles["spotify-icon"]}></img>
          </a>
        </div>

        {/* 관리자 페이지 정보 */}
        {isAdminPage(pathName) && (
          <div className={styles["admin-button-container"]} style={{ justifyContent: "center" }}>
            <EditButton data={albumData} />
            <DeleteButton data={albumData} />
          </div>
        )}
      </div>
    </header>
  );
};

import { usePathname } from "next/navigation";
import styles from "./PostAlbumMetadata.module.css";
import { formatDuration, isAdminPage } from "../../modules/utils";
import { DeleteButton } from "./assets/DeleteButton";
import { EditButton } from "./assets/EditButton";
import Link from "next/link";
import { LinkIcon } from "./assets/LinkIcon";
import { BlurImg } from "../@common/BlurImage";
import { AlbumInfo } from "../../modules/types";

interface PostAlbumMetadataProps {
  albumData: AlbumInfo;
}

export const PostAlbumMetadata = ({ albumData }: PostAlbumMetadataProps) => {
  const albumDuration = formatDuration(albumData.duration);
  const pathName = usePathname();
  const hasVideo = albumData.videos[0]?.title.length > 0;
  const releaseDate = albumData.releaseDate;
  const dateObj = new Date(releaseDate);
  const formattedDate =
    dateObj.getFullYear() + "년 " + (dateObj.getMonth() + 1) + "월 " + dateObj.getDate() + "일";

  return (
    <header className={styles["container"]}>
      {/* 이미지 관련 코드 */}
      <div className={styles["album-image-container"]}>
        <a href={albumData.link} target="_blank">
          <BlurImg
            className={styles["album-image"]}
            blurHash={albumData.blurHash}
            src={albumData.imgUrl}
            punch={1}
          />
        </a>
      </div>

      <div className={styles["metadata-container"]}>
        {/* 아티스트 정보 */}
        <div className={styles["metadata-title"]}>아티스트</div>
        <Link
          href={
            isAdminPage(pathName)
              ? `/music/admin/artist/${albumData.artistId}/1`
              : `/music/artist/${albumData.artistId}/1`
          }
        >
          {albumData.artist}
        </Link>
        <LinkIcon />

        {/* 앨범 정보 */}
        <div className={styles["metadata-title"]}>앨범</div>
        <div>{albumData.album}</div>

        {/* 레이블 정보 */}
        <div className={styles["metadata-title"]}>레이블</div>
        <div>{albumData.label}</div>

        {/* 발매일 정보 */}
        <div className={styles["metadata-title"]}>발매일</div>
        <div>{formattedDate}</div>

        {/* 러닝타임 정보 */}
        <div className={styles["metadata-title"]}>러닝타임</div>
        <div>
          {albumDuration}, {albumData.tracks}곡
        </div>

        {/* 비디오 정보 */}
        {hasVideo && (
          <>
            <div className={styles["metadata-title"]}>비디오</div>
            {albumData.videos.map(videoData => {
              return (
                <div key={videoData.title}>
                  <a href={videoData.url} target="_blank">
                    {videoData.title}
                  </a>
                  <LinkIcon />
                </div>
              );
            })}
          </>
        )}

        {/* 스트리밍 정보 */}
        <div className={styles["metadata-title"]}>스트리밍</div>
        <div className={styles["streaming-icon-container"]}>
          <a href={albumData.link} target="_blank">
            <img src="/music/apple.svg" alt="link-icon" className={styles["apple-icon"]}></img>
          </a>
          <a href={`https://open.spotify.com/album/${albumData.id}`} target="_blank">
            <img src="/music/spotify.svg" alt="link-icon" className={styles["spotify-icon"]}></img>
          </a>
        </div>

        {/* 관리자 페이지 정보 */}
        {isAdminPage(pathName) && (
          <div className={styles["admin-button-container"]}>
            <EditButton data={albumData} />
            <DeleteButton data={albumData} />
          </div>
        )}
      </div>
    </header>
  );
};

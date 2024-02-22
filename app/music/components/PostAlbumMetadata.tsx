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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={styles["album-information-container"]}>
      <div className={styles["grid-album-image-container"]}>
        <a href={albumData.link} target="_blank">
          <div
            className={styles["grid-album-image"]}
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
        <div className={styles["post-date"]}>아티스트</div>
        <Link
          href={
            isAdminPage(pathName)
              ? `/music/admin/artist/${albumData.artistId}/1`
              : `/music/artist/${albumData.artistId}/1`
          }
        ></Link>
        <span className={styles["black-masking"]} style={{ cursor: "pointer" }}>
          {albumData.artist}
        </span>
        <LinkIcon />
        <div className={styles["post-date"]}>앨범</div>
        <div>
          <span className={styles["black-masking"]}>{albumData.album}</span>
        </div>
        <div className={styles["post-date"]}>레이블</div>
        <div>
          <span className={styles["black-masking"]}>{albumData.label}</span>
        </div>
        <div className={styles["post-date"]}>발매일</div>
        <div>
          <span className={styles["black-masking"]}>{albumData.releaseDate}</span>
        </div>
        <div className={styles["post-date"]}>러닝타임</div>
        <div>
          <span className={styles["black-masking"]}>
            {albumDuration}, {albumData.tracks}곡
          </span>
        </div>
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
        <div className={styles["post-date"]}>스트리밍</div>
        <div style={{ height: "30px" }}>
          <a href={albumData.link} target="_blank">
            <img
              src="/music/apple.svg"
              alt="link-icon"
              style={{ position: "absolute", marginTop: "6px", height: "20px" }}
            ></img>
          </a>
          <a href={`https://open.spotify.com/album/${albumData.id}`} target="_blank">
            <img
              src="/music/spotify.svg"
              alt="link-icon"
              style={{
                position: "absolute",
                marginLeft: "29px",
                marginTop: "7px",
                height: "20px",
              }}
            ></img>
          </a>
        </div>
        {isAdminPage(pathName) && (
          <div className={styles["admin-button-container"]} style={{ justifyContent: "center" }}>
            <DeleteButton data={albumData} />
            <EditButton data={albumData} />
          </div>
        )}
      </div>
    </div>
  );
};

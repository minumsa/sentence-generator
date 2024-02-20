import { usePathname, useRouter } from "next/navigation";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";
import { formatDuration } from "../modules/utils";
import { useEffect, useState } from "react";
import { deleteData } from "../modules/api";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { LinkIcon } from "./LinkIcon";

interface PostAlbumMetadataProps {
  albumData: AlbumInfo;
}

export const PostAlbumMetadata = ({ albumData }: PostAlbumMetadataProps) => {
  const router = useRouter();
  const albumDuration = albumData && formatDuration(albumData.duration);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathName = usePathname();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    pathName.includes("admin") ? setIsAdminPage(true) : setIsAdminPage(false);
  }, []);

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
        <span
          className={styles["black-masking"]}
          onClick={() => {
            router.push(`/music/artist/${albumData.artistId}/1`);
          }}
          style={{ cursor: "pointer" }}
        >
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
        {/* <div className={styles["post-date"]}>티저</div>
        <span className={styles["black-masking"]} style={{ cursor: "pointer" }}>
          Beyoncé - I’M THAT GIRL (Official Teaser)
        </span>
        <LinkIcon /> */}
        {albumData.musicVideoTitle && (
          <>
            <div className={styles["post-date"]}>뮤직비디오</div>
            <a href={albumData.musicVideoUrl}>
              <span className={styles["black-masking"]} style={{ cursor: "pointer" }}>
                {albumData.musicVideoTitle}
                Beyoncé - CUFF IT (Music Video)
              </span>
            </a>
            <LinkIcon />
          </>
        )}
        {isAdminPage && (
          <div className={styles["admin-button-container"]} style={{ justifyContent: "center" }}>
            <DeleteButton data={albumData} />
            <EditButton data={albumData} />
          </div>
        )}
      </div>
    </div>
  );
};

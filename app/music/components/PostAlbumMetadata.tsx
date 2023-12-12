import { useRouter } from "next/navigation";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";
import { formatDuration } from "../modules/utils";
import { useState } from "react";

interface PostAlbumMetadataProps {
  albumData: AlbumInfo;
}

export const PostAlbumMetadata = ({ albumData }: PostAlbumMetadataProps) => {
  const router = useRouter();
  const albumDuration = formatDuration(albumData.duration);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  console.log(imageLoaded);

  return (
    <div className={styles["album-information-container"]}>
      <div className={styles["grid-album-image-container"]}>
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
      </div>
      <div className={styles["album-metadata"]}>
        <div className={styles["post-date"]}>아티스트</div>
        <div
          onClick={() => {
            router.push(`/music/artist/${albumData.artistId}/1`);
          }}
          style={{ cursor: "pointer" }}
        >
          <span className={styles["black-masking"]}>{albumData.artist}</span>
        </div>
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
      </div>
    </div>
  );
};

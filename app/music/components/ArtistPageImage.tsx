import { AlbumInfo } from "../modules/types";
import styles from "../music.module.css";

interface ArtistPageImageProps {
  artistData: AlbumInfo[];
}

export const ArtistPageImage = ({ artistData }: ArtistPageImageProps) => {
  const firstData = artistData[0];
  return (
    <div className={styles["artist-page-image-container"]}>
      <div className={styles["artist-page-image"]}>
        <img
          className={styles["category-meta-image"]}
          src={firstData.artistImgUrl}
          alt={firstData.artist}
          loading="lazy"
        />
      </div>
      <div className={styles["artist-page-title"]} style={{ marginTop: "10px", cursor: "default" }}>
        {firstData.artist}
      </div>
    </div>
  );
};

import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";

interface ArtistPageImageProps {
  albumData: AlbumInfo[];
}

export const ArtistPageImage = ({ albumData }: ArtistPageImageProps) => {
  return (
    <div className={styles["artist-page-image-container"]}>
      <div className={styles["artist-page-image"]}>
        <img
          className={styles["category-meta-image"]}
          src={albumData[0].artistImgUrl}
          alt={albumData[0].artist}
          loading="lazy"
        />
      </div>
      <div className={styles["artist-page-title"]} style={{ marginTop: "10px", cursor: "default" }}>
        {albumData[0].artist}
      </div>
    </div>
  );
};

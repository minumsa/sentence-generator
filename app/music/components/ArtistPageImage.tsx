import { AlbumInfo } from "../modules/types";
import styles from "../music.module.css";

interface ArtistPageImageProps {
  artistData: AlbumInfo[];
}

export const ArtistPageImage = ({ artistData }: ArtistPageImageProps) => {
  const firstArtistData = artistData[0];
  const { artist, artistImgUrl } = firstArtistData;

  return (
    <div className={styles["artist-page-image-container"]}>
      <div className={styles["artist-page-image"]}>
        <img
          className={styles["category-meta-image"]}
          src={artistImgUrl}
          alt={artist}
          loading="lazy"
        />
      </div>
      <div className={styles["artist-page-title"]} style={{ marginTop: "10px", cursor: "default" }}>
        {artist}
      </div>
    </div>
  );
};

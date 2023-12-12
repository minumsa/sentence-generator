import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { Loading } from "./Loading";
import { PostAlbumMetadata } from "./PostAlbumMetadata";
import { PostAlbumText } from "./PostAlbumText";

interface AlbumProps {
  albumData: AlbumInfo;
}

export const PostAlbum = ({ albumData }: AlbumProps) => {
  const isLoading = albumData.id === "";

  return isLoading ? (
    <Loading dataLength={undefined} />
  ) : (
    <div className={styles["album-container"]}>
      <PostAlbumMetadata albumData={albumData} />
      <PostAlbumText albumData={albumData} />
    </div>
  );
};

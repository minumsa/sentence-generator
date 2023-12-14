import { usePathname, useRouter } from "next/navigation";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";
import { formatDuration } from "../modules/utils";
import { useEffect, useState } from "react";
import { deleteData } from "../modules/api";

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
        {isAdminPage && (
          <div className={styles["admin-button-container"]} style={{ justifyContent: "center" }}>
            <div
              className={styles["admin-button"]}
              onClick={async () => {
                albumData && deleteData(albumData.id);
              }}
            >
              삭제
            </div>
            <div
              className={styles["admin-button"]}
              onClick={() => {
                router.push(`/music/admin/upload/${albumData.id}`);
              }}
            >
              수정
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

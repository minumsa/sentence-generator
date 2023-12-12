import { useRouter } from "next/navigation";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";

interface PostCloseButtonProps {
  data: AlbumInfo;
}

export const PostCloseButton = ({ data }: PostCloseButtonProps) => {
  const router = useRouter();

  return (
    <div className={styles["top-menu-container"]}>
      <div
        className={`${styles["admin-button"]} ${styles["close-button"]}`}
        onClick={() => {
          window.history.length < 2 ? router.push("/music") : router.back();
        }}
      >
        {data.text && "✕"}
      </div>
    </div>
  );
};

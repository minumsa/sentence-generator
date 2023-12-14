import { deleteData } from "../modules/api";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";

interface DataDeleteButtonProps {
  data: AlbumInfo;
}

export const DataDeleteButton = ({ data }: DataDeleteButtonProps) => {
  return (
    <div
      className={styles["admin-button"]}
      onClick={async () => {
        deleteData(data.id);
      }}
    >
      삭제
    </div>
  );
};

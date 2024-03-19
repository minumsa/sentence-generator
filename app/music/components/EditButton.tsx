import { AlbumInfo } from "../modules/types";
import styles from "../music.module.css";
import Link from "next/link";

interface EditButtonProps {
  data: AlbumInfo;
}

export const EditButton = ({ data }: EditButtonProps) => {
  return (
    <Link
      href={`/music/admin/upload/${data.id}`}
      className={styles["admin-button"]}
      style={{ marginRight: "-1px" }}
    >
      수정
    </Link>
  );
};

import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";
import Link from "next/link";

interface EditButtonProps {
  data: AlbumInfo;
}

export const EditButton = ({ data }: EditButtonProps) => {
  return (
    <Link href={`/music/admin/upload/${data.id}`} className={styles["admin-button"]}>
      수정
    </Link>
  );
};

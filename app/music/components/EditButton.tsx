import { useRouter } from "next/navigation";
import { AlbumInfo, isAdminPage } from "../modules/data";
import styles from "../music.module.css";
import Link from "next/link";

interface EditButtonProps {
  data: AlbumInfo;
}

export const EditButton = ({ data }: EditButtonProps) => {
  const router = useRouter();

  return (
    <Link href={`/music/admin/upload/${data.id}`} className={styles["admin-button"]}>
      수정
    </Link>
  );
};

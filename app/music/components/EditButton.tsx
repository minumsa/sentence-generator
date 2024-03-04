<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
>>>>>>> c1dec4e915c170bee55af068b2c2484c0e76621d
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

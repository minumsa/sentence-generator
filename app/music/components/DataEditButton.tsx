import { useRouter } from "next/navigation";
import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";

interface DataEditButtonProps {
  data: AlbumInfo;
}

export const DataEditButton = ({ data }: DataEditButtonProps) => {
  const router = useRouter();

  return (
    <div
      className={styles["admin-button"]}
      onClick={() => {
        router.push(`/music/admin/upload/${data.id}`);
      }}
    >
      수정
    </div>
  );
};

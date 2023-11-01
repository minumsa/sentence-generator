import { useRouter } from "next/navigation";
import styles from "../music.module.css";

export const MobileTitle = () => {
  const router = useRouter();

  return (
    <div
      className={styles["mobile-title"]}
      onClick={() => {
        router.push("/music");
      }}
    >
      <div>divdivdiv</div>
    </div>
  );
};

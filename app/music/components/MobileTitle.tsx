import { useRouter } from "next/navigation";
import styles from "../music.module.css";

export const MobileTitle = () => {
  const router = useRouter();

  return (
    <nav
      className={styles["mobile-title"]}
      onClick={() => {
        router.push("/music");
      }}
    >
      <div>카버차트</div>
    </nav>
  );
};

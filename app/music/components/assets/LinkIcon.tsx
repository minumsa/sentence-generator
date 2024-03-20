import styles from "../../music.module.css";

export const LinkIcon = () => {
  return (
    <span>
      <img className={styles["link-icon"]} src="/music/link.svg" alt="link-icon" />
    </span>
  );
};

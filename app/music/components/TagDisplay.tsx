import { useRouter } from "next/navigation";
import styles from "./tagdisplay.module.css";
import { useState } from "react";
import { DEFAULT_TAGS } from "../modules/constants";

export const TagDisplay = () => {
  const router = useRouter();
  const [showAllTagItems, setShowAllTagItems] = useState<boolean>(false);

  return (
    <div
      className={styles["tag-display-container"]}
      style={showAllTagItems ? { flexWrap: "wrap", paddingRight: "31px" } : { flexWrap: "nowrap" }}
    >
      {Object.values(DEFAULT_TAGS).map((tag, index) => (
        <div
          key={index}
          className={styles["tag-display-item"]}
          onClick={() => {
            router.push("/music/pop");
          }}
        >
          {tag}
        </div>
      ))}
      <div
        className={styles["arrow-down-container"]}
        onClick={() => {
          setShowAllTagItems(!showAllTagItems);
        }}
      >
        <img
          className={styles["arrow-down"]}
          src={showAllTagItems ? "/music/arrow-up.svg" : "/music/arrow-down.svg"}
          alt="arrow-down"
        />
      </div>
    </div>
  );
};

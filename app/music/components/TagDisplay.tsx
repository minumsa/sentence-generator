import styles from "./TagDisplay.module.css";

export const TagDisplay = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#5F388B" }}>
        #청소하면서 듣는 음악 🧹
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#4A57BA" }}>
        #운동하면서 듣는 음악 🏋🏻‍♂️
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#48864D" }}>
        #글 쓰면서 듣는 음악 ✍🏻
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#A7A15A" }}>
        #자기 전에 듣는 음악 😴
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#AD7E48" }}>
        #산책하면서 듣는 음악 🚶
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#A5494F" }}>
        #춤추면서 듣는 음악 🕺
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#5F388B" }}>
        #가사 없는 음악 🎻
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#4A57BA" }}>
        #코딩하면서 듣는 음악 👨‍💻
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#48864D" }}>
        #샤워하면서 듣는 음악 🛀
      </div>
      <div className={styles["tag-item"]} style={{ backgroundColor: "#A7A15A" }}>
        #여행 갈 때 듣는 음악 ✈️
      </div>
    </div>
  );
};

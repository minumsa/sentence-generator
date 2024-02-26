import { useRouter } from "next/navigation";
import styles from "./TagDisplay.module.css";

export const TagDisplay = () => {
  const router = useRouter();
  const tags = [
    "#청소하면서 듣는 음악 🧹",
    "#운동하면서 듣는 음악 🏋🏻‍♂️",
    "#글 쓰면서 듣는 음악 ✍🏻",
    "#자기 전에 듣는 음악 😴",
    "#산책하면서 듣는 음악 🚶",
    "#춤추면서 듣는 음악 🕺",
    "#가사 없는 음악 🎻",
    "#코딩하면서 듣는 음악 👨‍💻",
    "#샤워하면서 듣는 음악 🛀",
    "#여행 갈 때 듣는 음악 ✈️",
  ];
  const colors = ["#A5494F", "#AD7E48", "#A7A15A", "#48864D", "#4A57BA", "#5F388B"];

  return (
    <div className={styles["container"]}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={styles["tag-item"]}
          // style={{ backgroundColor: colors[index % colors.length] }}
          onClick={() => {
            router.push("/music/pop");
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

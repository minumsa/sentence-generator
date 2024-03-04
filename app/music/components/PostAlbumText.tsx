import { AlbumInfo } from "../modules/data";
import { formatDate } from "../modules/utils";
import styles from "../music.module.css";

interface PostTextProps {
  albumData: AlbumInfo;
}

export const PostText = ({ albumData }: PostTextProps) => {
  return (
    <article className={styles["post-content-container"]}>
      {albumData.text.split("\n").map((text, index) => {
        const isLineBreak = text === "";
        const isParagraphTitle =
          (text.length < 50 && !text.includes(".") && !text.includes("[")) ||
          text.includes("feat.");

        return isLineBreak ? (
          <p key={index}></p>
        ) : (
          <p
            key={index}
            className={styles["paragraph"]}
            style={isParagraphTitle ? { fontWeight: 600, marginTop: "40px" } : undefined}
          >
            {text}
          </p>
        );
      })}
      <div className={styles["post-divider"]}></div>
      <div className={styles["post-date-container"]}>
        <div className={styles["post-date"]} style={{ margin: "0 0 -4px 0" }}>
          작성일
        </div>
        <div>{formatDate(albumData.uploadDate.toString())}</div>
      </div>
    </article>
  );
};

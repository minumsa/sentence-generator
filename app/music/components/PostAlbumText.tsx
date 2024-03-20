import { formatDate, isAdminPage } from "../modules/utils";
import styles from "../music.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlbumInfo } from "../modules/types";
import { DEFAULT_TAGS } from "../modules/constants";

interface PostTextProps {
  albumData: AlbumInfo;
}

export const PostText = ({ albumData }: PostTextProps) => {
  const pathName = usePathname();
  const paragraphArray = albumData.text.split("\n");

  return (
    <article className={styles["post-content-container"]}>
      {paragraphArray.map((paragraph, index) => {
        const isLineBreak = paragraph === "";
        const isParagraphTitle =
          (paragraph.length < 50 && !paragraph.includes(".") && !paragraph.includes("[")) ||
          paragraph.includes("feat.");
        return isLineBreak ? (
          <p key={index}></p>
        ) : (
          <p
            key={index}
            className={styles["paragraph"]}
            style={isParagraphTitle ? { fontWeight: 600 } : undefined}
          >
            {paragraph}
          </p>
        );
      })}
      <div
        className={styles["album-tag-container"]}
        style={{ margin: "20px 0 0 0", justifyContent: "flex-end" }}
      >
        {albumData.tagKeys.map((tagKey: string, index: number) => {
          return (
            <Link
              href={
                isAdminPage(pathName)
                  ? `/music/admin/search/tag/${tagKey}/1`
                  : `/music/search/tag/${tagKey}/1`
              }
              key={index}
              className={styles["tag-item"]}
            >
              {DEFAULT_TAGS[tagKey]}
            </Link>
          );
        })}
      </div>
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

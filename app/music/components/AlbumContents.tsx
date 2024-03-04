import { AlbumInfo } from "../modules/data";
import { AlbumPanel } from "./AlbumPanel";
import styles from "../music.module.css";

interface AlbumContentsProps {
  artistData: AlbumInfo[];
  perPageCount: number;
}

export const AlbumContents = ({ artistData, perPageCount }: AlbumContentsProps) => {
  return artistData.map((item, index) => {
    const itemIndex = index + 1;
    const isLastData = index === artistData.length - 1;
    const isLastDataPerPage = itemIndex % perPageCount === 0;

    return (
      <article
        key={index}
        className={styles["album-container"]}
        style={
          isLastDataPerPage || isLastData
            ? undefined
            : { borderBottom: "1px solid var(--border-color)" }
        }
      >
        <AlbumPanel albumData={item} />
      </article>
    );
  });
};

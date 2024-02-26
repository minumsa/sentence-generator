import { AlbumInfo } from "../modules/data";
import { AlbumPanel } from "./AlbumPanel";
import styles from "../music.module.css";

interface AlbumContentsProps {
  albumData: AlbumInfo[];
  perPageCount: number;
}

export const AlbumContents = ({ albumData, perPageCount }: AlbumContentsProps) => {
  return albumData?.map((item, index) => {
    const itemIndex = index + 1;
    const isLastData = index === albumData.length - 1;
    const isLastDataPerPage = itemIndex % perPageCount === 0;

    return (
      <article
        key={index}
        className={styles["album-container"]}
        style={
          isLastDataPerPage || isLastData
            ? undefined
            : { borderBottom: "1px solid var(--border-light-color)" }
        }
      >
        <AlbumPanel albumData={item} />
      </article>
    );
  });
};

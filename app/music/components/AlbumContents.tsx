import { AlbumInfo } from "../modules/data";
import { AlbumPanel } from "./Album";
import styles from "../music.module.css";

interface AlbumContentsProps {
  data: AlbumInfo[];
  perPageCount: number;
}

export const AlbumContents = ({ data, perPageCount }: AlbumContentsProps) => {
  return data?.map((item, index) => {
    const dataIndex = index + 1;
    const isLastData = index === data.length - 1;
    const isLastDataPerPage = dataIndex % perPageCount === 0;

    return (
      <div key={index}>
        <AlbumPanel albumData={item} />
        {isLastDataPerPage || isLastData ? undefined : <div className={styles["divider"]} />}
      </div>
    );
  });
};

import { AlbumInfo } from "../modules/data";
import { Album } from "./Album";
import styles from "../music.module.css";

interface AlbumContentsProps {
  data: AlbumInfo[];
  isAdminPage: boolean;
  perPageCount: number;
}

export const AlbumContents = ({ data, isAdminPage, perPageCount }: AlbumContentsProps) => {
  return data.map((item, index) => {
    const dataIndex = index + 1;
    const isLastData = index === data.length - 1;
    const isLastDataPerPage = dataIndex % perPageCount === 0;

    return (
      <div key={index}>
        <Album data={item} isAdminPage={isAdminPage} />
        {isLastDataPerPage || isLastData ? undefined : <div className={styles["divider"]} />}
      </div>
    );
  });
};

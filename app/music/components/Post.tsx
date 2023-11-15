import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, initialAlbumInfo } from "../modules/data";
import { Album } from "./Album";
import styles from "../music.module.css";
import { useRouter } from "next/navigation";

interface PostProps {
  pathName: string;
  isPostPage: boolean;
}

export const Post = ({ pathName, isPostPage }: PostProps) => {
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy to clipboard: ", err);
    }
  };

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(pathName);
      setData(result);
    }
    getData();
  }, []);

  return (
    <>
      <div className={styles["top-menu-container"]}>
        <div
          className={`${styles["admin-button"]} ${styles["post-button"]}`}
          onClick={() => {
            router.back();
          }}
        >
          ✕
        </div>
      </div>
      <Album
        data={data}
        dataIndex={1}
        perPageCount={5}
        isAdminMainPage={false}
        isPostPage={isPostPage}
      />
    </>
  );
};

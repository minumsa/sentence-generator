import { useEffect, useState } from "react";
import { fetchDataById } from "../modules/api";
import { AlbumInfo, initialAlbumInfo } from "../modules/data";
import { Album } from "./Album";

interface PostProps {
  pathName: string;
  isPostPage: boolean;
}

export const Post = ({ pathName, isPostPage }: PostProps) => {
  const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  useEffect(() => {
    async function getData() {
      const result = await fetchDataById(pathName);
      setData(result);
    }
    getData();
  }, []);

  console.log(pathName);

  console.log(data);

  return (
    <>
      <Album
        data={data}
        dataIndex={0}
        perPageCount={5}
        isAdminMainPage={false}
        isPostPage={isPostPage}
      />
    </>
  );
};

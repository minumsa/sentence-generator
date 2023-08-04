import { useEffect, useState } from "react";
import styles from "./music.module.css";
import { fetchData, fetchSpotify, updateData, uploadData } from "./lib/data";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface UploadProps {
  variablePathName: string;
}

export default function Upload({ variablePathName }: UploadProps) {
  const [albumId, setAlbumId] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>();
  const pathName = usePathname();
  const title: string = pathName.includes("upload") ? "업로드" : "수정";
  const router = useRouter();

  const handleUpload = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      genre,
      link,
      text,
    });

    if (newAlbumData) uploadData(newAlbumData, password);
  };

  const handleEdit = () => {
    updateData(albumId, data, password);
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      title === "업로드" ? handleUpload() : handleEdit();
    }
  };

  useEffect(() => {
    async function handleData() {
      const editData = await fetchData(setData, variablePathName);
      setAlbumId(editData.id);
      setGenre(editData.genre);
      setLink(editData.link);
      setText(editData.text);
    }

    if (title === "수정") handleData();
  }, []);

  useEffect(() => {
    title === "수정" && setData({ ...data, id: albumId, genre: genre, link: link, text: text });
  }, [albumId, genre, link, text]);

  return (
    <div className={styles["album-container"]}>
      <div className={styles["title"]}>{`｟${title} 페이지 ｠`}</div>
      <div>앨범 ID(Spotify)</div>
      <input
        className={styles["input"]}
        value={albumId}
        onChange={e => {
          setAlbumId(e.target.value);
        }}
      />
      <div>장르</div>
      <input
        className={styles["input"]}
        value={genre}
        onChange={e => {
          setGenre(e.target.value);
        }}
      />
      <div>링크(Apple Music)</div>
      <input
        className={styles["input"]}
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      />
      <div>글</div>
      <textarea
        className={`${styles["input"]} ${styles["input-text"]}`}
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <div>관리자 비밀번호</div>
      <input
        className={styles["input"]}
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
        onKeyDown={handlePasswordEnter}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className={`${styles["button"]} ${styles["submit"]}`}
          onClick={() => {
            title === "업로드" ? handleUpload() : handleEdit();
          }}
        >
          제출하기
        </div>
      </div>
      <div className={styles["divider"]} style={{ marginBottom: "50px" }}></div>
    </div>
  );
}

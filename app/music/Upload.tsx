import { useEffect, useState } from "react";
import styles from "./music.module.css";
import { AlbumInfo, album, fetchSpotify, uploadData } from "./lib/data";

export default function Upload() {
  const [albumId, setAlbumId] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUpload = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      genre,
      link,
      text,
    });

    if (newAlbumData) uploadData(newAlbumData, password);
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpload();
    }
  };

  return (
    <div className={styles["album-container"]}>
      <div className={styles["title"]}>｟ 업로드 페이지 ｠</div>
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
        value={"*".repeat(password.length)}
        onChange={e => {
          setPassword(e.target.value);
        }}
        onKeyDown={handlePasswordEnter}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className={`${styles["button"]} ${styles["submit"]}`}
          onClick={() => {
            handleUpload();
          }}
        >
          제출하기
        </div>
      </div>
      <div className={styles["divider"]} style={{ marginBottom: "50px" }}></div>
    </div>
  );
}

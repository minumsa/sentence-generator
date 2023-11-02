import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { fetchDataForUpdate, fetchSpotify, updateData, uploadData } from "../modules/api";

interface UploadProps {
  idByPathName: string;
}

export default function Upload({ idByPathName }: UploadProps) {
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

    if (newAlbumData) {
      await uploadData(newAlbumData, password);
      // router.push("/music/admin");
    }
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
      const dataForUpdate = await fetchDataForUpdate(idByPathName);
      setData(dataForUpdate);
      setAlbumId(dataForUpdate.id);
      setGenre(dataForUpdate.genre);
      setLink(dataForUpdate.link);
      setText(dataForUpdate.text);
    }

    if (title === "수정") handleData();
  }, []);

  useEffect(() => {
    title === "수정" && setData({ ...data, id: albumId, genre: genre, link: link, text: text });
  }, [albumId, genre, link, text]);

  return (
    <>
      <div className={styles["album-container"]}>
        <div className={styles["title"]}>{`${title} 페이지`}</div>
        <a
          href="https://open.spotify.com/search"
          target="_blank"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <div className={styles["upload-item-title"]}>앨범 ID(Spotify)</div>
        </a>
        <textarea
          className={styles["input"]}
          value={albumId}
          onChange={e => {
            setAlbumId(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>장르</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["select"]}
            value={genre}
            onChange={e => {
              setGenre(e.target.value);
            }}
          >
            <option value="">--장르를 선택해주세요--</option>
            <option value="pop">팝</option>
            <option value="k-pop">케이팝</option>
            <option value="j-pop">제이팝</option>
            <option value="rock">락</option>
            <option value="alternative">얼터너티브</option>
            <option value="disco">디스코</option>
            <option value="electronic">일렉트로닉</option>
            <option value="jazz">재즈</option>
            <option value="soul">알앤비/소울</option>
            <option value="folk">포크</option>
            <option value="country">컨트리</option>
            <option value="classic">클래식</option>
            <option value="soundtrack">사운드트랙</option>
          </select>
        </div>
        <div className={styles["upload-item-title"]}>링크(Apple Music)</div>
        <textarea
          className={styles["input"]}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>글</div>
        <textarea
          className={`${styles["input"]} ${styles["input-text"]}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>관리자 비밀번호</div>
        <input
          className={styles["input"]}
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
      </div>
    </>
  );
}

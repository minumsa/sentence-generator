import { useEffect, useState } from "react";
import styles from "../music.module.css";
import { usePathname } from "next/navigation";
import React from "react";
import { fetchDataById, fetchSpotify, updateData, uploadData } from "../modules/api";
import { contents } from "../modules/data";

interface UploadProps {
  idByPathName: string;
}

export default function Upload({ idByPathName }: UploadProps) {
  const pathName = usePathname();
  const isUploadPage: boolean = pathName.includes("upload");
  const isUpdatePage: boolean = !isUploadPage;
  const variableTitle: string = isUploadPage ? "업로드" : "수정";
  const [data, setData] = useState<any>();
  const [albumId, setAlbumId] = useState("");
  const [artistId, setArtistId] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [uploadDate, setUploadDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const spotifyLink = `https://open.spotify.com/search/${link.length > 1 && link.split("/")[5]}`;

  // 업로드 API
  const handleUpload = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      artistId,
      genre,
      link,
      text,
    });

    if (newAlbumData) {
      await uploadData(newAlbumData, password);
    }
  };

  // 수정 API
  const handleUpdate = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      artistId,
      genre,
      link,
      text,
    });

    if (newAlbumData) {
      updateData(albumId, artistId, newAlbumData, password);
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      isUploadPage ? handleUpload() : handleUpdate();
    }
  };

  // 수정 페이지일 때 데이터 가져오기
  useEffect(() => {
    async function getData() {
      const fetchData = await fetchDataById(idByPathName);
      setData(fetchData);
      const { id, artistId, genre, link, text } = fetchData;
      // const { id, artistId, genre, link, text, uploadDate } = fetchData;

      setAlbumId(id);
      setArtistId(artistId);
      setGenre(genre);
      setLink(link);
      setText(text);
      // setUploadDate(uploadDate);
    }

    if (isUpdatePage) getData();
  }, []);

  console.log(data);

  useEffect(() => {
    isUpdatePage && setData({ ...data, id: albumId, genre: genre, link: link, text: text });
  }, [albumId, genre, link, text]);

  return (
    <>
      <div
        className={`${styles["album-container"]} ${styles["upload-container"]}`}
        style={{ flexDirection: "column", paddingTop: "50px" }}
      >
        <div className={styles["title"]}>{`${variableTitle} 페이지`}</div>
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
            {Object.entries(contents).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
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
        <a href={spotifyLink} target="_blank" style={{ textDecoration: "none", color: "#cfcfcf" }}>
          <div className={styles["upload-item-title"]}>앨범 ID(Spotify)</div>
        </a>
        <textarea
          className={styles["input"]}
          value={albumId}
          onChange={e => {
            setAlbumId(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>아티스트 ID(Spotify)</div>
        <textarea
          className={styles["input"]}
          value={artistId}
          onChange={e => {
            setArtistId(e.target.value);
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
        <div className={styles["upload-item-title"]}>작성일</div>
        {/* <textarea
          className={styles["input"]}
          value={uploadDate}
          onChange={e => {
            setUploadDate(e.target.value);
          }}
        /> */}
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
              isUploadPage ? handleUpload() : handleUpdate();
            }}
            style={{ boxShadow: "0 0 0 1px #242424 inset" }}
          >
            제출하기
          </div>
        </div>
      </div>
    </>
  );
}

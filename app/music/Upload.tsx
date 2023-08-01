"use client";

import { useEffect, useState } from "react";
import styles from "./music.module.css";

interface UploadItem {
  albumId: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
}

interface MusicData {
  id: string;
  imgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
  duration: number;
  tracks: number;
}

interface UploadProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  albumId: string;
  setAlbumId: React.Dispatch<React.SetStateAction<string>>;
  musicData: MusicData | null;
  setMusicData: React.Dispatch<React.SetStateAction<MusicData | null>>;
  // uploadItem: UploadItem;
  // setUploadItem: React.Dispatch<React.SetStateAction<UploadItem>>;
  // uploadItems: UploadItem[];
  // setUploadItems: React.Dispatch<React.SetStateAction<UploadItem[]>>;
}

export default function Upload({
  text,
  setText,
  link,
  setLink,
  genre,
  setGenre,
  albumId,
  setAlbumId,
  musicData,
  setMusicData,
}: // uploadItem,
// setUploadItem,
// uploadItems,
// setUploadItems,
UploadProps) {
  const [password, setPassword] = useState<string | null>("");

  const handleSubmit = async () => {
    const userPassword = prompt("관리자 비밀번호를 입력해주세요.");
    setPassword(userPassword);

    if (!albumId || !genre || !link || !text) {
      alert("모든 항목을 채워주세요.");
      return;
    }

    const newItem: UploadItem = {
      albumId: albumId,
      genre: genre,
      link: link,
      text: text,
      uploadDate: Date(),
    };

    const fetchAccessToken = async () => {
      try {
        const url = "https://accounts.spotify.com/api/token";
        const clientId = "9ba8de463724427689b855dfcabca1b1";
        const clientSecret = "7cfb4b90f97a4b1a8f02f2fe6d2d42bc";
        const basicToken = btoa(`${clientId}:${clientSecret}`);
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicToken}`,
        };
        const data = "grant_type=client_credentials";

        const accessTokenResponse = await fetch(url, {
          method: "POST",
          headers,
          body: data,
        });

        setPassword(userPassword);

        if (!accessTokenResponse.ok) {
          console.error("Error: Access token fetch failed");
        }

        const accessTokenData = await accessTokenResponse.json();
        return accessTokenData.access_token;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    try {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        // throw new Error("Access token is not available");
        console.error("Error: Access token is not available");
      }

      const url = `https://api.spotify.com/v1/albums/${newItem.albumId}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const musicDataResponse = await fetch(url, { headers });

      if (!musicDataResponse.ok) {
        // throw new Error("music fetch failed");
        console.error("Error: music fetch failed");
      }

      const fetchedMusicData = await musicDataResponse.json();

      const musicDataArray: MusicData = {
        id: fetchedMusicData.id,
        imgUrl: fetchedMusicData.images[0].url,
        artist: fetchedMusicData.artists[0].name,
        album: fetchedMusicData.name,
        label: fetchedMusicData.label,
        releaseDate: fetchedMusicData.release_date,
        text: newItem.text,
        genre: newItem.genre,
        link: newItem.link,
        uploadDate: newItem.uploadDate,
        tracks: fetchedMusicData.tracks.items.length,
        duration: Math.floor(
          fetchedMusicData.tracks.items
            .map((data: any) => data.duration_ms)
            .reduce((a: number, b: number) => a + b) / 1000
        ),
      };

      setMusicData(musicDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchMongoDB() {
      if (musicData !== null) {
        try {
          const response = await fetch("/api/music", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: musicData,
              password: password,
            }),
          });

          if (response.status === 401) {
            alert("관리자 비밀번호가 틀렸습니다.");
          } else if (response.status === 409) {
            alert("이미 존재하는 앨범입니다.");
          } else if (!response.ok) {
            throw new Error("Failed to upload music data");
          } else {
            alert("데이터가 성공적으로 저장되었습니다.");
          }

          const data = await response.json();
          console.log(data.message);

          // setUploadItems(prevUploadItems => [newItem, ...prevUploadItems]);
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    }

    fetchMongoDB();

    // setMusicData(null);
    setAlbumId("");
    setGenre("");
    setText("");
    setLink("");
  }, [musicData]);

  // console.log(musicData);

  return (
    <div className={styles["album-container"]}>
      <div style={{ textAlign: "center", fontWeight: "normal" }}>｟ 업로드 페이지 ｠</div>
      <div style={{ marginTop: "100px" }}>앨범 ID(Spotify)</div>
      <input
        className={styles["music-post-input"]}
        value={albumId}
        onChange={e => {
          setAlbumId(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>장르</div>
      <input
        className={styles["music-post-input"]}
        value={genre}
        onChange={e => {
          setGenre(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>링크(Apple Music)</div>
      <input
        className={styles["music-post-input"]}
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>글</div>
      <textarea
        className={`${styles["music-post-input"]} ${styles["music-post-input-text"]}`}
        // type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      ></textarea>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles["music-post-submit"]} onClick={handleSubmit}>
          제출하기
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid #ffccff",
          padding: "20px",
          marginBottom: "100px",
        }}
      ></div>
    </div>
  );
}
